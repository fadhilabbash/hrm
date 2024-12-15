"use client";

import { useState, useEffect } from "react";
import { DataTable } from "../../components/DataTable";
import AddEmployee from "@/components/employee/AddEmployee";
import { getEmployees } from "@/services/actions/employees.actions";
import { Employee } from "@/lib/types";
import { Columns } from "@/components/employee/Columns";

const Page = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [search, setSearch] = useState("");

  const getData = async (
    page: number = currentPage,
    searchTerm: string = search,
  ) => {
    const response = await getEmployees(page, searchTerm);
    if (response.type === "success") {
      setEmployees(Array.isArray(response.data) ? response.data : []);
      setLastPage(response.pagination?.last_page || 1);
    }
  };

  const refetch = () => {
    getData();
    currentPage > lastPage && setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    getData();
  }, [currentPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      getData();
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="container mx-auto w-full">
      <div className="">
        <AddEmployee onSuccess={refetch} />
      </div>

      <DataTable
        columns={Columns(refetch)}
        data={employees}
        currentPage={currentPage}
        lastPage={lastPage}
        onPageChange={(page) => setCurrentPage(page)}
        onSearch={(searchTerm) => setSearch(searchTerm)}
      />
    </div>
  );
};

export default Page;
