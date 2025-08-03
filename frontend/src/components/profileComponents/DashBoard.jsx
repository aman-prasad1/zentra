import { useState } from "react";

import ViewOrders from "../dashboardComp/ViewOrders";
import ViewUsers from "../dashboardComp/ViewUsers";
import ViewProducts from "../dashboardComp/ViewProducts";

const DashBoard = () => {
  const [section, setSection] = useState("dashboard");

  const user = {
    isAdmin: true, // replace with actual user authentication data
    name: "Admin User",
  };

  const renderSection = () => {
    switch (section) {
      case "viewUsers":
        return <ViewUsers />;
      case "viewProducts":
        return <ViewProducts />;
      case "viewOrders":
        return <ViewOrders />;
      case "dashboard":
      default:
        return (
          <div className="grid gap-6 p-4 md:grid-cols-2">
            <div
              className="cursor-pointer p-6 bg-white shadow hover:shadow-lg rounded-xl"
              onClick={() => setSection("viewUsers")}
            >
              👥 View All Users
            </div>
            <div
              className="cursor-pointer p-6 bg-white shadow hover:shadow-lg rounded-xl"
              onClick={() => setSection("viewProducts")}
            >
              📦 View All Products
            </div>
            <div
              className="cursor-pointer p-6 bg-white shadow hover:shadow-lg rounded-xl"
              onClick={() => setSection("viewOrders")}
            >
              🧾 View All Orders
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Main content */}
      <main className="flex-1 p-6">
        {section !== "dashboard" && (
          <button
            onClick={() => setSection("dashboard")}
            className="text-blue-600 underline mb-4 inline-block"
          >
            ← Back to Dashboard
          </button>
        )}
        <h1 className="text-2xl font-semibold mb-4 capitalize">{section.replace(/([A-Z])/g, " $1")}</h1>
        <div className="bg-white p-4 rounded shadow">{renderSection()}</div>
      </main>
    </div>
  );
};

export default DashBoard;
