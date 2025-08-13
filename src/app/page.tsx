"use client";

import { useEffect, useState } from "react";
import { SearchBar, AdvocateTable } from "./components"
import Advocate from "./classes/Advocate";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [input, setInput] = useState("");
  const [isFiltered, setFiltered] = useState(false)

  const searchAdvocate = (text: string) => {
    if (text && text.length > 0) { 
      const filteredAdvocates = advocates.filter((advocate) =>
        Object.values(advocate).some((value) =>
          value != null && value.toString().toLowerCase().includes(text.toLowerCase())
        )
      );

      setFiltered(true)
      setFilteredAdvocates(filteredAdvocates);
    } else { 
      setFiltered(false)
    }
  };

  useEffect(() => {
    async function fetchAdvocates() {
      try {
        const response = await fetch("/api/advocates");
        const jsonResponse = await response.json();
        const advocateData = jsonResponse.data.map((adv: any) => new Advocate(adv));
        setAdvocates(advocateData);
      } catch (error) {
        console.error("Error fetching advocates:", error);
      }
    }

    fetchAdvocates();
  }, []);

  return (
    <main className="px-6 my-6">
      <header className="flex items-center my-6">
        <h1 className="text-primary text-3xl">Solace Advocates</h1>
      </header>
      <SearchBar input={input} onInputChange={setInput} searchAdvocate={searchAdvocate} />
      {advocates.length > 0 ? (
        <AdvocateTable advocates={advocates} filteredAdvocates={filteredAdvocates} filtered={isFiltered} />
      ) : (
        <p>Loading advocates...</p>
      )}
    </main>
  );
}
