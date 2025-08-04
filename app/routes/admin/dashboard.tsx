import React from "react";
import Header from "../../../components/Header";

const dashboard = () => {
  const user = { name: "Mateusz" };
  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome ${user?.name ?? "Guest"}`}
        description="lets fucking gooo"
      />
      Dashboard Page Content
    </main>
  );
};

export default dashboard;
