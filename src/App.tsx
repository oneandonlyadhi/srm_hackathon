import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { DashboardOverview } from "./components/DashboardOverview";
import { BuildingsTable } from "./components/BuildingsTable";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="size-full flex bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-6">
            <h1>Parking Management Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor and manage all your parking facilities in one place
            </p>
          </div>

          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <DashboardOverview />
              <BuildingsTable />
            </div>
          )}

          {activeTab === "buildings" && (
            <BuildingsTable />
          )}

          {activeTab !== "dashboard" && activeTab !== "buildings" && (
            <div className="flex items-center justify-center h-96 bg-muted/30 rounded-lg border-2 border-dashed border-border">
              <div className="text-center">
                <p className="text-muted-foreground">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} section coming soon
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
