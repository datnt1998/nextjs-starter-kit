"use client";

import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Container } from "@/components/ui/container";
import { DataTableDemo } from "@/components/ui/table/data-table-demo";

export default function TableDemoPage() {
  return (
    <DashboardLayout>
      <Container size="2xl">
        <DataTableDemo />
      </Container>
    </DashboardLayout>
  );
}
