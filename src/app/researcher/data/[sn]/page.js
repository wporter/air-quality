import Data from "@/components/researcher/data/Data";
import { getDataDetails, getLine } from "@/utils/api";

const Post = async ({ params }) => {
  const { sn } = params;

  const data = await getLine(sn);
  const fields = await getDataDetails(sn);

  return <Data data={data} fields={fields} />;
};

export default Post;
