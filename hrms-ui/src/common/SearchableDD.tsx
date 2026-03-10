import { Dropdown, DropdownItem, TextInput } from 'flowbite-react';
import { useEffect, useMemo, useState } from 'react'
import { Search, X } from 'lucide-react';

interface SearchableDropdownProps<T> {
    label:string
    items: T[]
    getKey: (item: T) => string | number
    getLabel: (item: T) => string
    onSelect: (item: T) => void
    placeholder?: string
    notFoundText?: string
    debounceTime?: number
    clear?: boolean
    color?: string
}

function SearchableDropdown<T>({
    label,
    items = [],
    getKey,
    getLabel,
    onSelect,
    placeholder = "search..",
    notFoundText = 'no result found',
    debounceTime = 300,
    clear = true,
    color = 'blue'
}: SearchableDropdownProps<T>) {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedQuery(query), debounceTime);
        return () => clearTimeout(timeout);
    }, [query])

    const filteredItems = useMemo(() => {
        if (!debouncedQuery) return items;
        return items.filter((item) => getLabel(item).toLowerCase().includes(debouncedQuery.toLowerCase()));
    }, [debouncedQuery, items])
    return (
        <Dropdown label={label} color={color}>
            <div className="p-2 w-64">
                <div className="relative">
                    <TextInput icon={Search} className='mb-2' value={query} placeholder={placeholder} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.stopPropagation()} />
                    {query && <X className="absolute right-2 top-1/2 -translate-y-1/2" onClick={() => setQuery("")} />}
                </div>
            </div>
            <div className="max-h-60 overflow-y-auto mt-2">
                {filteredItems.length === 0 ? (
                    <div className="p-2 text-sm text-gray-500">{notFoundText}</div>
                ) : (
                    filteredItems.map((item) => (
                        <DropdownItem key={getKey(item)} onClick={() => {
                            onSelect(item);
                            if (clear) setQuery("");
                        }}>
                            {getLabel(item)}
                        </DropdownItem>
                    ))
                )}
            </div>
        </Dropdown>
    )
}

export default SearchableDropdown