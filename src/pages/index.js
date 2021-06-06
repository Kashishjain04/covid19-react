import Head from "next/head";
import useSWR from "swr";
import Dashboard from "../components/Dashboard";
import { fetcher } from "../utils/commonFunctions";
import { HISTORY_DATA, LATEST_DATA } from "../utils/constants";
import HomeTable from "../components/home/HomeTable";
import Vaccinated from "../components/Vaccinated";

export default function Home({ latestData, historyData }) {
  const latest = useSWR(LATEST_DATA, fetcher, {
    initialData: latestData,
    refreshInterval: 100,
  }).data;
  const history = useSWR(HISTORY_DATA, fetcher, {
    initialData: historyData,
    refreshInterval: 100,
  }).data;

  return (
    <div className="min-h-screen">
      <Head>
        <title>Covid-19 India</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <main className="pt-8 mx-auto max-w-screen-xl">
        <div className="bg-white mx-auto flex items-center w-max px-4 py-1 sm:px-6 sm:py-2 rounded-lg  mb-8">
          <img
            src="/assets/maps/TT.png"
            className="object-contain h-16 sm:h-20"
          />
          <h1
            className="text-3xl sm:text-5xl"
            style={{ fontFamily: "Pacifico" }}
          >
            India
          </h1>
        </div>
        <Dashboard data={latest["TT"]} />
        <Vaccinated
          population={latest["TT"]?.meta?.population}
          v1={latest["TT"]?.total?.vaccinated1}
          v2={latest["TT"]?.total?.vaccinated2}
        />
        <HomeTable data={latest} />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const latestData = await fetcher(LATEST_DATA);
  const historyData = await fetcher(HISTORY_DATA);
  return {
    props: {
      latestData,
      historyData,
    },
  };
}
