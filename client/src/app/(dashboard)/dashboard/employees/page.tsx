import { EmployeeList } from "@/components/employees/employee-list";


export default function EmployeesPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Employees</h2>
        <p className="text-muted-foreground">
          View employee records and salary information.
        </p>
      </div>

      {}
      <EmployeeList />
    </div>
  );
}
