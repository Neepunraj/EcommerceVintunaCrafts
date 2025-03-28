import { InputComponettypes } from "@/interfaces";

const InputComponent = ({
  label,
  placeholder,
  value,
  onChange,
  type,
}: InputComponettypes) => {
  return (
    <div>
      <p>{label}</p>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type || "text"}
        className="border placeholder-gray-400"
      />
    </div>
  );
};

export default InputComponent;
