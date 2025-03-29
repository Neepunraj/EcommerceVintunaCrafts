import {
  InputComponettypes,
  SelectComponentProps,
  Selectoptions,
} from "@/interfaces";

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
          options.map((optionItem: Selectoptions) => (
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
