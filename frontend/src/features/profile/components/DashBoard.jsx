import { useState } from "react";
import ViewOrders from "../../admin/components/ViewOrders";
import ViewUsers from "../../admin/components/ViewUsers";
import ViewProducts from "../../admin/components/ViewProducts";
import AddProduct from "../../admin/components/AddProduct";
import { LuUsers, LuPackage, LuReceipt, LuPlus, LuArrowLeft } from "react-icons/lu";

const DashBoard = () => {
  const [section, setSection] = useState("dashboard");

  const cards = [
    { id: "viewUsers", label: "Manage Users", desc: "View, update, and manage registered users", icon: LuUsers, color: "bg-blue-50 text-blue-600 border-blue-100 hover:border-blue-200" },
    { id: "viewProducts", label: "Manage Products", desc: "Inspect and update product inventory", icon: LuPackage, color: "bg-emerald-50 text-emerald-600 border-emerald-100 hover:border-emerald-200" },
    { id: "viewOrders", label: "Manage Orders", desc: "Track customer orders and shipments", icon: LuReceipt, color: "bg-purple-50 text-purple-600 border-purple-100 hover:border-purple-200" },
    { id: "addProduct", label: "Add New Product", desc: "List a new merchandise item to the store", icon: LuPlus, color: "bg-amber-50 text-amber-600 border-amber-100 hover:border-amber-200" },
  ];

  const renderSection = () => {
    switch (section) {
      case "viewUsers":
        return <ViewUsers />;
      case "viewProducts":
        return <ViewProducts />;
      case "viewOrders":
        return <ViewOrders />;
      case "addProduct":
        return <AddProduct />;
      case "dashboard":
      default:
        return (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mt-4">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={() => setSection(card.id)}
                  className="group cursor-pointer p-6 bg-white border border-gray-150 rounded-2xl hover:shadow-md hover:border-gray-300 transition-all duration-300 flex items-start gap-4"
                >
                  <div className={`p-3.5 rounded-xl shrink-0 ${card.iconColor || card.color.split(" ").slice(0, 2).join(" ")}`}>
                    <Icon className="text-2xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-black transition">{card.label}</h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        );
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header and Back navigation */}
      <div className="flex flex-col gap-2 border-b border-gray-100 pb-4">
        {section !== "dashboard" ? (
          <button
            onClick={() => setSection("dashboard")}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-black font-semibold transition mb-2 hover:cursor-pointer"
          >
            <LuArrowLeft className="text-sm" />
            <span>Back to Dashboard</span>
          </button>
        ) : null}

        <h1 className="text-xl font-bold text-gray-900 capitalize">
          {section === "dashboard" ? "Admin Console" : section.replace(/([A-Z])/g, " $1")}
        </h1>
        <p className="text-xs text-gray-500">
          {section === "dashboard" ? "Overview and store administrative management tools" : `Admin / ${section.replace(/([A-Z])/g, " $1")}`}
        </p>
      </div>

      <div className="w-full">
        {renderSection()}
      </div>
    </div>
  );
};

export default DashBoard;
