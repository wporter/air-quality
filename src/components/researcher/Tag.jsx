import { tags } from "@/data/Tags";

export const Tag = ({ text, color }) => {
  return (
    <div
      className={`${tags[color]} w-fit px-4 py-1 rounded flex justify-center items-center`}
      data-cy={`${text}-tag`}
    >
      {text}
    </div>
  );
};

export default Tag;
