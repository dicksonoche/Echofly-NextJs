"use client";

import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

const SearchField = () => {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); //To prevent automatic re-rendering of the page
    const form = e.currentTarget;
    const ph = (form.ph as HTMLInputElement).value.trim(); //ph as the query; Trim to avoid empty spaces
    if (!ph) return; //Empty queries don't pass into the submit
    router.push(`/search?ph=${encodeURIComponent(ph)}`); //encodeURIComponent to escape some special characters not allowed in a search component
  }
  //Progressive enhancement feature where in a case of disabled javascript in browser, the action="/search" handles the submit
  return (
    <form onSubmit={handleSubmit} method="GET" action="/search">
      <div className="relative">
        <Input
          name="ph"
          placeholder="Search"
          className="h-fit flex-none rounded-full pe-10"
        />
        <SearchIcon className="text-muted-foreground absolute right-3 top-1/2 size-5 -translate-y-1/2 transform" />
      </div>
    </form>
  );
};

export default SearchField;
