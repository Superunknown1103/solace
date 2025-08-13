
interface AdvocateTableProps {
    advocates: Advocate[];
    filteredAdvocates: Advocate[];
    filtered: boolean;
}

const AdvocateTable = ({ advocates, filteredAdvocates, filtered }: AdvocateTableProps) => {
    if (filtered && filteredAdvocates.length == 0) {
        return <div className="mt-6">No advocates match your search criteria.</div>
    } else {
        const currentSearch = filtered ? filteredAdvocates : advocates
        const columns = Object.keys(currentSearch[0])
        return (
            <div className="mt-6">
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
                        {currentSearch.map((advocate, idx) => (
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
            </div>
        )
    }
}

export default AdvocateTable