import { OAuthProvider, Query } from "appwrite";
import { account, appwriteConfig, database } from "./client";
import { redirect } from "react-router";

export const loginWithGoogle = async () => {
  try {
    account.createOAuth2Session(OAuthProvider.Google);
  } catch (error) {
    console.log("loginWithGoogle", error);
  }
};

export const getUser = async () => {
  try {
    const user = await account.get();

    if (!user) return redirect("/sign-in");

    const { documents } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [
        Query.equal("accountId", user.$id),
        Query.select(["name", "email", "imageUrl", "joinedAt", "accountId"]),
      ]
    );

    if (documents.length === 0) {
      return null;
    }

    return documents[0];
  } catch (error) {
    console.log("getUser error:", error);
    return null;
  }
};

export const logoutUser = async () => {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.log("logoutUser error", error);
  }
};

export const getGooglePicture = async () => {
  try {
    const user = await account.get();
    if (!user) throw new Error("User not authenticated");

    const sessions = await account.listSessions();
    const googleSession = sessions.sessions.find(
      (session) => session.provider === "google"
    );

    if (!googleSession) throw new Error("No Google session found");

    const response = await fetch(
      `https://people.googleapis.com/v1/people/me?personFields=photos&access_token=${googleSession.providerAccessToken}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Google People API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.photos && data.photos.length > 0) {
      return data.photos[0].url;
    }

    return null;
  } catch (error) {
    console.log("getGooglePicture error:", error);
    return null;
  }
};

export const storeUserData = async () => {
  try {
    const user = await account.get();
    if (!user) throw new Error("User not authenticated");

    const existingUser = await getExistingUser(user.$id);
    if (existingUser) {
      return existingUser;
    }

    const profilePicture = await getGooglePicture();

    const userData = {
      accountId: user.$id,
      name: user.name,
      email: user.email,
      imageUrl: profilePicture || "",
      joinedAt: new Date().toISOString(),
    };

    const newUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      user.$id,
      userData
    );

    return newUser;
  } catch (error) {
    console.log("storeUserData error:", error);
    return null;
  }
};

export const getExistingUser = async (accountId?: string) => {
  try {
    const userId = accountId || (await account.get()).$id;
    if (!userId) throw new Error("No user ID provided");

    const { documents } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", userId)]
    );

    return documents.length > 0 ? documents[0] : null;
  } catch (error) {
    console.log("getExistingUser error:", error);
    return null;
  }
};
