interface InputFieldSelectProps {
    label: string;
    name: string;
    value?: string | number;
    required?: boolean;
    options: { value: string; label: string }[];
    className?: string;
    defaultOption?: { value: string; label: string; disabled?: boolean; selected?: boolean };
    labelClassName?: string;
  }
const InputFieldSelect: React.FC<InputFieldSelectProps> = ({
    label,
    name,
    value,
    required,
    options,
    defaultOption,
  }) => {
    return (
      <div className="col-span-1">
        <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
        <div className="mt-2">
          <select
            id={name}
            name={name}
            value={value}
            required={required}
            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-cyan-600 sm:text-sm sm:leading-6"
          >
            {defaultOption && (
              <option value={defaultOption.value} disabled={defaultOption.disabled} selected={defaultOption.selected}>
                {defaultOption.label}
              </option>
            )}
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };
  
  
export default InputFieldSelect;