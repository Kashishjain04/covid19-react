import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import Dashboard from "../../components/Dashboard";
import DatePick from "../../components/DatePick";
import StateTable from "../../components/state/StateTable";
import Vaccinated from "../../components/Vaccinated";
import { fetcher } from "../../utils/commonFunctions";
import { HISTORY_DATA, LATEST_DATA, STATE_CODES } from "../../utils/constants";

const StatePage = ({ latestData, historyData }) => {
  const router = useRouter();
  const { state } = router.query;

  const latest = useSWR(LATEST_DATA, fetcher, {
    initialData: latestData,
    refreshInterval: 100,
  }).data[state];
  const history = useSWR(HISTORY_DATA, fetcher, {
    initialData: historyData,
    refreshInterval: 100,
  }).data[state];

  return (
    <div className="min-h-screen">
      <Head>
        <title>Covid-19 - {STATE_CODES[state]}</title>
        <link rel="icon" href={`/logo.png`} />
      </Head>
      <main className="pt-8 mx-auto max-w-screen-xl">
        <DatePick />
        <div className="bg-white mx-auto flex items-center w-max px-4 py-1 sm:px-6 sm:py-2 rounded-lg  mb-8">
          <img
            src={`/assets/maps/${state}.png`}
            className="object-contain h-16 sm:h-20"
          />
          <h1
            className="text-3xl sm:text-5xl max-w-[15rem] sm:max-w-screen-sm"
            style={{ fontFamily: "Pacifico" }}
          >
            {STATE_CODES[state]}
          </h1>
        </div>
        <Dashboard data={latest} />
        <Vaccinated
          population={latest?.meta?.population}
          v1={latest?.total?.vaccinated1}
          v2={latest?.total?.vaccinated2}
        />
        {latest?.districts && <StateTable data={latest?.districts} />}
      </main>
    </div>
  );
};

export default StatePage;

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const latestData = await fetcher(LATEST_DATA);
  const historyData = await fetcher(HISTORY_DATA);
  return {
    props: {
      latestData: latestData[params.state],
      historyData: historyData[params.state],
    },
  };
}
