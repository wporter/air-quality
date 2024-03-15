import Protected from "@/components/researcher/Protected";
import Data from "@/components/researcher/data/Data";
import { getDataDetails, getLine } from "@/utils/api";

const Post = async ({ params }) => {
  const { sn } = params;

  const line = await getLine(sn);
  const { data, meta } = await getDataDetails(sn);

  return (
    <Protected>
      <div className="pl-8">
        <Data data={line} fields={data} meta={meta} />
      </div>
    </Protected>
  );
};

export default Post;
