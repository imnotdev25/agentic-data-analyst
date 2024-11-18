import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { DatasetTable } from "@/components/dataset/DatasetTable";
import { DatasetControls } from "@/components/dataset/DatasetControls";

const Dataset = () => {
  const [sortBy, setSortBy] = useState<string>("default");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-3xl font-bold mb-8">Flight Dataset</h1>
          
          <DatasetControls
            sortBy={sortBy}
            setSortBy={setSortBy}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <div className="bg-white rounded-lg shadow-card overflow-hidden">
            <DatasetTable data={[]} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dataset;