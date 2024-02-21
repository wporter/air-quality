import Data from "@/components/researcher/data/Data";
import { getDataDetails, getLine, getLocations } from "@/utils/api";

const Post = ({ data, fields }) => {
  return <Data data={data} fields={fields} />;
};

export default Post;

export const getStaticProps = async ({ params: { sn } }) => {
  const data = await getLine(sn);
  const fields = await getDataDetails(sn);

  return { props: { data, fields } };
};

export const getStaticPaths = async () => {
  const { data } = await getLocations();

  const paths = data.map(({ sn }) => {
    return { params: { sn } };
  });

  return {
    paths,
    fallback: false,
  };
};

// MOD-00284
