import { formatNum } from "../utils/commonFunctions";
import Tooltip from "@material-ui/core/Tooltip";

const Vaccinated = ({ population, v1, v2 }) => {
  const v1per = formatNum((v1 / population) * 100, 1),
    v2per = formatNum((v2 / population) * 100, 1);
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
        <p>{(v1 + v2).toLocaleString("en-IN")} vaccine doses administered</p>
      </div>
      <div className="relative w-full h-7 rounded-md bg-[#db558120]">
        <Tooltip
          title={`Atleast one dose: ${v1per}%`}
          placement="top"
          arrow
          interactive
        >
          <div
            className="absolute h-7 rounded-md cursor-pointer"
            style={{
              width: `${v1per}%`,
              background:
                "repeating-linear-gradient(55deg, #ebadc3, #ebadc3 5px, #e794b1 5px, #e794b1 10px)",
            }}
          />
        </Tooltip>
        <Tooltip
          className="bg-white"
          title={`Fully Vaccinated: ${v2per}%`}
          placement="top"
          arrow
          interactive
        >
          <div
            className="absolute bg-[#db558199] h-7 rounded-md cursor-pointer"
            style={{ width: `${v2per}%` }}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default Vaccinated;
