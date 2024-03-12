import Welcome from "@/components/Welcome";
import Map from "@/components/Map/Map";
import Footer from "@/components/Footer";
import { getMarkers } from "@/utils/api";
import Head from "next/head";

const Page = async () => {
  const { items } = await getMarkers();

  return (
    <>
      <div>
        <Head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </Head>
      </div>

      <div className="flex flex-col justify-center items-center relative">
        <Welcome />
        <div className="my-10 w-11/12">
          <p className="my-4 font-bold text-5xl">Public View</p>
          <Map height="h-[60vh]" width="w-full" markers={items} />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Page;
