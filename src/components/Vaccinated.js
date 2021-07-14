import { formatNum } from "../utils/commonFunctions";
import { useEffect, useState } from "react";

const Vaccinated = ({ population, v1, v2 }) => {
  const v1per = formatNum((v1 / population) * 100, 1),
    v2per = formatNum((v2 / population) * 100, 1);
  const [display, setDisplay] = useState(
    (v1 + v2).toLocaleString("en-IN") + " vaccine doses administered"
  );

  const setV1 = () => {
    const num = isNaN(v1per) ? "-" : v1per,
    v = isNaN(v1) ? "-" : v1.toLocaleString("en-IN");
    setDisplay(`Partially Vaccinated: ${num}% (${v})`);
  };
  const setV2 = () => {
    const num = isNaN(v2per) ? "-" : v2per,
    v = isNaN(v2) ? "-" : v2.toLocaleString("en-IN");
    setDisplay(`Fully Vaccinated: ${num}% (${v})`);
  };
  const setDefault = () => {
    const num = isNaN(v1 + v2) ? "-" : v1 + v2;
    setDisplay(num.toLocaleString("en-IN") + " vaccine doses administered");
  };

  useEffect(() => {
    setDefault();
    //eslint-disable-next-line
  }, [v1, v2]);

  return (
    <div className="mx-3 sm:mx-5 mb-4">
      <div className="flex items-center space-x-1 mx-auto mb-2 px-2 py-1 w-max bg-[#db558120] rounded-md text-sm font-semibold text-[#db5581]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
        <p>{display}</p>
      </div>
      <div className="relative w-full h-7 rounded-md bg-[#db558120]">
        <div
          onMouseEnter={setV1}
          onMouseLeave={setDefault}
          onTouchStart={setV1}
          onTouchEnd={setDefault}
          className="absolute h-7 rounded-md cursor-pointer"
          style={{
            width: `${v1per}%`,
            background:
              "repeating-linear-gradient(55deg, #ebadc3, #ebadc3 5px, #e794b1 5px, #e794b1 10px)",
          }}
        />
        <div
          onMouseEnter={setV2}
          onMouseLeave={setDefault}
          onTouchStart={setV2}
          onTouchEnd={setDefault}
          className="absolute bg-[#db558199] h-7 rounded-md cursor-pointer"
          style={{ width: `${v2per}%` }}
        />
      </div>
    </div>
  );
};

export default Vaccinated;
