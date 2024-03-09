import Protected from "@/components/researcher/Protected";
import Data from "@/components/researcher/data/Data";
import { getDataDetails, getLine } from "@/utils/api";

const Post = async ({ params }) => {
  const { sn } = params;

  const data = await getLine(sn);
  const fields = await getDataDetails(sn);

  return (
    <Protected>
      <Data data={data} fields={fields} />
    </Protected>
  );
};

export default Post;
