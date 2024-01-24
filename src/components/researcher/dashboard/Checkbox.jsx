import { BsCheckLg } from "react-icons/bs";

const Checkbox = ({ toggle, onClick = () => {}, text = "", color }) => {
  return (
    <div
      className="flex items-center hover:cursor-pointer w-fit"
      onClick={onClick}
    >
      <div
        data-cy="checkbox-bg"
        className={`w-4 h-4 rounded-sm mr-4 ${
          toggle ? `${color ? color : "bg-red-500"}` : "bg-blue-500"
        } flex items-center justify-center`}
      >
        <BsCheckLg
          className={`${toggle ? "text-white" : "text-purple-500"} text-lg`}
        />
      </div>
      {text && <p className="my-0 pt-0">{text}</p>}
    </div>
  );
};

export default Checkbox;
