import Dashboard from "../components/Dashboard";
import {
  isToday,
  formatHistoryData,
} from "../utils/commonFunctions";
import HomeTable from "../components/home/HomeTable";
import Vaccinated from "../components/Vaccinated";
import DatePick from "../components/DatePick";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectDate } from "../redux/dateSlice";
import latest from '../utils/sampleLatestData.json';
import history from '../utils/sampleHistoryData.json';

export default function Home() {
  const date = useSelector(selectDate);

  const [data, setData] = useState(latest?.["TT"]),
    [tableData, setTableData] = useState(latest);

  useEffect(() => {
    if (isToday(date)) {
      setData(latest?.["TT"]);
      setTableData(latest);
    } else {
      setData(history?.["TT"]?.dates?.[date]);
      setTableData(formatHistoryData(history, date));
    }
  }, [date]);

  return (
    <div className="pt-8 mx-auto max-w-screen-xl min-h-screen">
      <div className="bg-white mx-auto flex items-center w-max px-4 py-1 sm:px-6 sm:py-2 rounded-lg  mb-8">
        <img
          src="/assets/maps/TT.png"
          className="object-contain h-16 sm:h-20"
          alt="map"
        />
        <h1 className="text-3xl sm:text-5xl" style={{ fontFamily: "Pacifico" }}>
          India
        </h1>
      </div>
      <DatePick />
      <Dashboard data={data} />
      <Vaccinated
        population={latest?.["TT"]?.meta?.population}
        v1={data?.total?.vaccinated1}
        v2={data?.total?.vaccinated2}
      />
      <HomeTable data={tableData} />
    </div>
  );
}
