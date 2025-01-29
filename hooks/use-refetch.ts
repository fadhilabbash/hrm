"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export const useRefetch = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const refetch = (page: number = 1) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return { refetch };
};
