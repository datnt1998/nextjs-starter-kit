"use client";

import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { DataTableDemo } from "@/components/ui/table/data-table-demo";

export default function TableDemoPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <DataTableDemo />
      </div>
    </DashboardLayout>
  );
}
