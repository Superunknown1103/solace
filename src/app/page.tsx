"use client";

import { useState } from "react";
import { SearchBar, AdvocateTable } from "./components";

export default function Home() {
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (value: string) => { 
    setSearchTerm(value);
  }

  return (
    <main className="px-6 my-6">
      <header className="flex items-center my-6">
        <h1 className="text-primary text-3xl">Solace Advocates</h1>
      </header>
      <SearchBar
        input={input}
        onInputChange={setInput}
        searchAdvocate={handleSearch}
      />
      <AdvocateTable searchQuery={searchTerm} />
    </main>
  );
}
