import { Card, Select } from 'flowbite-react';

interface Option {
    label: string
    value: number | string
}

interface SelectOptionProps {
    title: string;
    value: number | string | '';
    onChange: (value: number | string) => void;
    options: Option[];
    placeholder?: string;
}

function SelectOption({ title, value, onChange, options, placeholder = "Selecet option" }: SelectOptionProps) {
    return (
        <Card className='mb-6'>
            <h5 className="text-lg font-semibold mb-3">{title}</h5>
            <Select value={value} onChange={(e) => onChange(e.target.value)}>
                <option value="">{placeholder}</option>
                {options?.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Select>
        </Card>
    )
}

export default SelectOption;
