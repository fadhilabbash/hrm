import { DataTable } from "../../components/DataTable";
import { getEmployees } from "@/services/actions/employees.actions";
import { Employee } from "@/lib/types";
import { Columns } from "@/components/employee/Columns";
import { PaginationWithLinks } from "@/components/common/PaginationWithLinks";
import AddEmployee from "@/components/employee/AddEmployee";
import { Suspense } from "react";
interface SearchParamsProps {
  searchParams?: {
    page?: string;
    query?: string;
  };
}
const Employees = async ({ searchParams }: SearchParamsProps) => {
  const search = await searchParams;
  const query = search?.query ?? "";
  const currentPage = Number(search?.page) || 1;
  const res = await getEmployees(currentPage, query);
  if (res.type === "error") return <p className="text-red-500">Failed to load employees.</p>;

  return (
    <div className="container grid grid-cols-1 gap-4 p-4 mx-auto py-8">
      <div>
      <AddEmployee />
      <Suspense fallback={<p>Loading feed...</p>}>
      <DataTable columns={Columns} data={res.data as Employee[]} />
      </Suspense>
       
      </div>
      <div>
        <PaginationWithLinks
          page={currentPage}
          pageSize={res.pagination ? res.pagination.per_page : 0}
          totalCount={res.pagination ? res.pagination.total : 0}
          pageSizeSelectOptions={{
            pageSizeOptions: [5, 10, 25, 50],
          }}
        />
      </div>
    </div>
  );
};

export default Employees;