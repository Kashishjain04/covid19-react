import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import Dashboard from "../components/Dashboard";
import DatePick from "../components/DatePick";
import StateTable from "../components/state/StateTable";
import Vaccinated from "../components/Vaccinated";
import { selectDate } from "../redux/dateSlice";
import { isToday } from "../utils/commonFunctions";
import { STATE_CODES } from "../utils/constants";
import latest from '../utils/sampleLatestData.json';
import history from '../utils/sampleHistoryData.json';
import seo from "../utils/seo";

const State = () => {
  const historyHook = useHistory(),
    params = useParams(),
    { stateCode } = params,
    date = useSelector(selectDate);

  useEffect(() => {
    seo({ title: `Covid-19 ${STATE_CODES[stateCode]}` });
  }, [stateCode]);

  const [data, setData] = useState(latest?.[stateCode]);

  useEffect(() => {
    if (isToday(date)) {
      setData(latest?.[stateCode]);
    } else {
      setData(history?.[stateCode]?.dates?.[date]);
    }
  }, [date, stateCode]);

  return (
    <div className="pt-8 mx-auto max-w-screen-xl min-h-screen">
      <DatePick />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 absolute top-5 left-5 p-2 rounded-full cursor-pointer hover:bg-gray-200"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={() => historyHook.replace("/")}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
      <div className="bg-white mx-auto flex items-center w-max px-4 py-1 sm:px-6 sm:py-2 rounded-lg  mb-8">
        <img
          src={`/assets/maps/${stateCode}.png`}
          className="object-contain h-16 sm:h-20"
          alt="map"
        />
        <h1
          className="text-3xl sm:text-5xl max-w-[15rem] sm:max-w-screen-sm"
          style={{ fontFamily: "Pacifico" }}
        >
          {STATE_CODES[stateCode]}
        </h1>
      </div>
      <Dashboard data={data} />
      <Vaccinated
        population={latest?.[stateCode]?.meta?.population}
        v1={data?.total?.vaccinated1}
        v2={data?.total?.vaccinated2}
      />
      {isToday(date) && latest?.[stateCode]?.districts && (
        <StateTable data={latest?.[stateCode]?.districts} />
      )}
    </div>
  );
};

export default State;

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}
