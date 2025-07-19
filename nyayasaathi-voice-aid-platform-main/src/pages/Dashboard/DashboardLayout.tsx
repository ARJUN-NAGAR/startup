// DashboardLayout.tsx
/*const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};
export default DashboardLayout;
*/
// src/pages/Dashboard/DashboardLayout.tsx

import {Header} from "../../components/Header";
import {Footer} from "../../components/Footer";
import { SheetHeader } from "@/components/ui/sheet";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <SheetHeader />
      <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
