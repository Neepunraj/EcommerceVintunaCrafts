import { InputComponettypes, SelectComponentProps } from "@/interfaces";
interface optiontype {
  id: string;
  label: string;
}
const SelectComponent = ({
  label,
  value,
  onChange,
  options = [],
}: SelectComponentProps) => {
  return (
    <div>
      <p>{label}</p>
      <select
        value={value}
        onChange={onChange}
        className="border placeholder-gray-400"
      >
        {options && options.length ? (
          options.map((optionItem: optiontype) => (
            <option value={optionItem.id} key={optionItem.id}>
              {optionItem.label}
            </option>
          ))
        ) : (
          <option id="" value="">
            Select
          </option>
        )}
      </select>
    </div>
  );
};

export default SelectComponent;
