"use client";

import { useRef, useState, useEffect } from "react";
import { DataTable } from "../../components/DataTable";
import AddEmployee from "@/components/employee/AddEmployee";
import { getEmployees } from "@/services/actions/employees.actions";
import { Employee } from "@/lib/types";
import { Columns } from "@/components/employee/Columns";

const Employees = () => {
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


  useEffect(() => {
    if (currentPage > lastPage) {
      setCurrentPage((prevPage) => prevPage - 1);
    } else {
      getData();
    }
  }, [currentPage, lastPage]);
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
        <AddEmployee onSuccess={getData} />
      </div>

      <DataTable
        columns={Columns(getData)}
        data={employees}
        currentPage={currentPage}
        lastPage={lastPage}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
        onSearch={(searchTerm) => setSearch(searchTerm)}
      />
    </div>
  );
};

export default Employees;
