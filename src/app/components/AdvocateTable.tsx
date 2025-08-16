import { useEffect, useState } from "react";
import Advocate from "../classes/Advocate";

interface AdvocateTableProps {
    searchQuery: string,
}

const AdvocateTable = ({ searchQuery }: AdvocateTableProps) => {
    const [advocates, setAdvocates] = useState<Advocate[]>([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setPage(1);
      }, [searchQuery]);

    useEffect(() => {
        async function fetchAdvocates() {
            try {
                const response = await fetch(
                    `/api/advocates?page=${page}&limit=${limit}&search=${encodeURIComponent(searchQuery)}`
                  );
                const jsonResponse = await response.json();
                setAdvocates(jsonResponse.data.map((a: any) => new Advocate(a)));
                setTotal(jsonResponse.pagination.total);
            } catch (error) {
                console.error("Error fetching advocates:", error);
            }
        }

        fetchAdvocates();
    }, [page, limit, searchQuery]);

    if (advocates.length == 0) {
        return <p>No advocates match your search criteria.</p>
    } else {
        const totalPages = limit > 0 ? Math.ceil(total / limit) : 1;
        const columns = Object.keys(advocates[0]) || [];
        return <div className="mt-6">
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-100 text-primary">
                        {columns.map((col) => (
                            <th
                                key={col}
                                className="border border-gray-300 p-2"
                            >
                                {col.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {advocates.map((advocate, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                            {columns.map((col) => {
                                let value = (advocate as any)[col];
                                return (
                                    <td key={col} className="border border-gray-300 p-2">
                                        {value}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-6">
                {/* Pagination controls */}
                <div className="flex justify-end items-center mb-2 gap-2">
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span>
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                        disabled={page === totalPages}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    }
}

export default AdvocateTable