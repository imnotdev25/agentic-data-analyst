import AnalysisInput from "@/components/AnalysisInput";
import Sidebar from "@/components/Sidebar";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <AnalysisInput />
        </div>
      </main>
    </div>
  );
};

export default Index;