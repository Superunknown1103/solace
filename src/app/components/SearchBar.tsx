import { useState } from 'react';

interface SearchBarInputProps {
    input: string;
    onInputChange: (text: string) => void; 
    searchAdvocate: (text: string) => void
}

const SearchBar = ({ input, searchAdvocate, onInputChange }: SearchBarInputProps) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        searchAdvocate(input.trim())
    }

    const clearSearch = () => { 
        onInputChange("")
        searchAdvocate("")
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input
                type="text"
                value={input}
                onChange={e => onInputChange(e.target.value)}
                placeholder="Search for an advocate..."
                className="border p-2 w-full max-w-xl "
            />
            <button
                type="submit"
                className="bg-primary hover:bg-primary-light text-white px-2 py-2 rounded-lg"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                    />
                </svg>
            </button>
            {input.length > 0 && <button onClick={e => clearSearch()} className="bg-primary hover:bg-primary-light text-white px-2 py-2 rounded-lg">Clear</button>}
        </form>
    )
}

export default SearchBar;
