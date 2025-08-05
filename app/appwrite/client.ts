import { Client, Storage, Databases, Account } from "appwrite";

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  apiKey: import.meta.env.VITE_APPWRITE_API_KEY,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_KEY,
  usersCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
  tripsCollectionId: import.meta.env.VITE_APPWRITE_TRIPS_COLLECTION_ID,
  endpoint: import.meta.env.VITE_APPWRITE_API_ENDPOINT,
};

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

const storage = new Storage(client);
const database = new Databases(client);
const account = new Account(client);

export { client, account, database, storage };
