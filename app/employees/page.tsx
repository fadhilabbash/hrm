import { Employee } from "@/lib/types";
import { PaginationWithLinks } from "@/components/common/pagination-with-links";
import { tableColumns } from "@/components/employee/table-columns";
import AddEmployee from "@/components/employee/add-employee";
import { DataTable } from "@/components/common/data-table";
import { getEmployees } from "@/services/actions/employees-actions";

interface SearchParamsProps {
  searchParams?: {
    page?: string;
    query?: string;
  };
}
const EmployeesPage = async ({ searchParams }: SearchParamsProps) => {
  const search = await searchParams;
  const query = search?.query ?? "";
  const currentPage = Number(search?.page) || 1;
  const res = await getEmployees(currentPage, query);
  if (res.type === "error")
    return <p className="text-red-500">فشل في تحميل البيانات</p>;

  return (
    <div className="container mx-auto grid grid-cols-1 gap-4 p-4 py-8">
      <div>
        <DataTable columns={tableColumns} data={res.data as Employee[]}>
          <AddEmployee />
        </DataTable>
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

export default EmployeesPage;
