interface InputTextAreaProps {
    label: string;
    name: string;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    required?: boolean;
    rows?: number;
    className?: string;
  }

const InputTextArea: React.FC<InputTextAreaProps> = ({
    label,
    name,
    placeholder,
    required,
    rows = 4,
    defaultValue,
  }) => {
    return (
      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4">
        <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
        <div className="sm:col-span-2">
          <textarea
            id={name}
            name={name}
            placeholder={placeholder}
            required={required}
            defaultValue={defaultValue}
            rows={rows}
            className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    );
  };

  export default InputTextArea;