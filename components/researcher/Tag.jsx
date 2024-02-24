import { tags } from "@/data/Tags";

export const Tag = ({ text, bg, Icon, color }) => {
  return (
    <div
      className={`${tags[bg]} w-fit px-4 py-1 rounded-xl flex justify-center items-center`}
      data-cy={`${text}-tag`}
    >
      {text}
      {Icon && <Icon className={`${color} text-xl ml-1`} />}
    </div>
  );
};

export default Tag;
