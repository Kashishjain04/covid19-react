import { formatNum, getActive } from "../../utils/commonFunctions";
import { COLORS, STATE_CODES } from "../../utils/constants";
import { ArrowSmUpIcon, ArrowSmDownIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";

const HomeTable = ({ data }) => {
  const router = useRouter();
  //key--> 0:state,1:confirmed,2:active,3:recovered,4:deceased,6:tested,7:vaccinated1,8:vaccinated2
  //order--> 1:ascending,-1:descending
  const [sort, setSort] = useState({ key: 0, order: 1 });
  const [states, setStates] = useState(Object.entries(data));

  useEffect(() => {
    let prevStates = [...states];
    switch (sort.key) {
      case 0:
        prevStates.sort(
          (a, b) =>
            sort.order * (STATE_CODES[b[0]] < STATE_CODES[a[0]] ? 1 : -1)
        );
        break;
      case 1:
        prevStates.sort(
          (a, b) => sort.order * (a[1].total.confirmed - b[1].total.confirmed)
        );
        break;
      case 2:
        prevStates.sort(
          (a, b) => sort.order * (getActive(a[1].total) - getActive(b[1].total))
        );
        break;
      case 3:
        prevStates.sort(
          (a, b) => sort.order * (a[1].total.recovered - b[1].total.recovered)
        );
        break;
      case 4:
        prevStates.sort(
          (a, b) => sort.order * (a[1].total.deceased - b[1].total.deceased)
        );
        break;
      case 6:
        prevStates.sort(
          (a, b) => sort.order * (a[1].total.tested - b[1].total.tested)
        );
        break;
      case 7:
        prevStates.sort(
          (a, b) =>
            sort.order * (a[1].total.vaccinated1 - b[1].total.vaccinated1)
        );
        break;
      case 8:
        prevStates.sort(
          (a, b) =>
            sort.order * (a[1].total.vaccinated2 - b[1].total.vaccinated2)
        );
        break;
      default:
        break;
    }
    setStates(prevStates.filter((state) => state[0] !== "TT"));
    return () => {
      setStates(Object.entries(data));
    };
  }, [sort]);

  const sortHandler = (key) => {
    if (key === sort.key) {
      setSort((prev) => {
        return { ...prev, order: -1 * prev.order };
      });
    } else {
      setSort({
        key,
        order: 1,
      });
    }
  };

  const SortAsc = ({ color }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 absolute top-3 right-2"
      viewBox="0 0 20 20"
      fill="currentColor"
      style={{ color: `rgb(${color})` }}
    >
      <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
    </svg>
  );
  const SortDesc = ({ color }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 absolute top-3 right-2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      style={{ color: `rgb(${color})` }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
      />
    </svg>
  );

  return (
    <div className="overflow-x-scroll text-sm sm:text-base mx-3 sm:mx-5">
      <table className="mx-auto" style={{ height: "fit-content" }}>
        <thead className="table-head">
          <tr>
            <th className="sticky z-10 left-0">
              <div onClick={() => sortHandler(0)}>
                {sort.key === 0 &&
                  (sort.order === 1 ? (
                    <SortAsc color={"0,0,0"} />
                  ) : (
                    <SortDesc color={"0,0,0"} />
                  ))}
                <p>State/UT</p>
              </div>
            </th>
            <th>
              <div onClick={() => sortHandler(1)}>
                {sort.key === 1 &&
                  (sort.order === 1 ? (
                    <SortAsc color={COLORS.confirmed} />
                  ) : (
                    <SortDesc color={COLORS.confirmed} />
                  ))}
                <p>Confirmed</p>
              </div>
            </th>
            <th>
              <div onClick={() => sortHandler(2)}>
                {sort.key === 2 &&
                  (sort.order === 1 ? (
                    <SortAsc color={COLORS.active} />
                  ) : (
                    <SortDesc color={COLORS.active} />
                  ))}
                <p>Active</p>
              </div>
            </th>
            <th>
              <div onClick={() => sortHandler(3)}>
                {sort.key === 3 &&
                  (sort.order === 1 ? (
                    <SortAsc color={COLORS.recovered} />
                  ) : (
                    <SortDesc color={COLORS.recovered} />
                  ))}
                <p>Recovered</p>
              </div>
            </th>
            <th>
              <div onClick={() => sortHandler(4)}>
                {sort.key === 4 &&
                  (sort.order === 1 ? (
                    <SortAsc color={COLORS.deceased} />
                  ) : (
                    <SortDesc color={COLORS.deceased} />
                  ))}
                <p>Deceased</p>
              </div>
            </th>
            <th>
              <div style={{ cursor: "default" }}>
                <p>Other</p>
              </div>
            </th>
            <th>
              <div onClick={() => sortHandler(6)}>
                {sort.key === 6 &&
                  (sort.order === 1 ? (
                    <SortAsc color={COLORS.tested} />
                  ) : (
                    <SortDesc color={COLORS.tested} />
                  ))}
                <p>Tested</p>
              </div>
            </th>
            <th className="max-w-[10rem]">
              <div onClick={() => sortHandler(7)}>
                {sort.key === 7 &&
                  (sort.order === 1 ? (
                    <SortAsc color={COLORS.vaccinated} />
                  ) : (
                    <SortDesc color={COLORS.vaccinated} />
                  ))}
                <p>Vaccinated with at least one dose</p>
              </div>
            </th>
            <th className="max-w-[10rem]">
              <div onClick={() => sortHandler(8)}>
                {sort.key === 8 &&
                  (sort.order === 1 ? (
                    <SortAsc color={COLORS.vaccinated} />
                  ) : (
                    <SortDesc color={COLORS.vaccinated} />
                  ))}
                <p>Fully Vaccinated</p>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="table-body">
          {states.map((state, index) => {
            return (
              state[0] !== "TT" && (
                <tr
                  onClick={() => router.push(`/state/${state[0]}`)}
                  key={index}
                  className="cursor-pointer"
                >
                  <th className="max-w-[10rem] sticky left-0">
                    <div className="h-full p-2 grid place-items-center rounded-md bg-gray-200">
                      <p>{STATE_CODES[state[0]]}</p>
                    </div>
                  </th>
                  <td>
                    <div className={index % 2 ? "bg-gray-200" : undefined}>
                      <p
                        className="delta"
                        style={{ color: `rgb(${COLORS.confirmed})` }}
                      >
                        {state[1]?.delta?.confirmed > 0 && (
                          <ArrowSmUpIcon className="h-5 justify-self-end" />
                        )}
                        {state[1]?.delta?.confirmed?.toLocaleString("en-IN")}
                      </p>
                      <p>
                        {state[1]?.total?.confirmed?.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className={index % 2 ? "bg-gray-200" : undefined}>
                      <p
                        className="delta"
                        style={{ color: `rgb(${COLORS.active})` }}
                      >
                        {getActive(state[1]?.delta) > 0 && (
                          <ArrowSmUpIcon className="h-5 justify-self-end" />
                        )}
                        {getActive(state[1]?.delta) < 0 && (
                          <ArrowSmDownIcon className="h-5 justify-self-end" />
                        )}
                        {getActive(state[1]?.delta) !== 0 &&
                          Math.abs(getActive(state[1]?.delta))?.toLocaleString(
                            "en-IN"
                          )}
                      </p>
                      <p>
                        {getActive(state[1]?.total)?.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className={index % 2 ? "bg-gray-200" : undefined}>
                      <p
                        className="delta"
                        style={{ color: `rgb(${COLORS.recovered})` }}
                      >
                        {state[1]?.delta?.recovered > 0 && (
                          <ArrowSmUpIcon className="h-5 justify-self-end" />
                        )}
                        {state[1]?.delta?.recovered?.toLocaleString("en-IN")}
                      </p>
                      <p>
                        {state[1]?.total?.recovered?.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className={index % 2 ? "bg-gray-200" : undefined}>
                      <p
                        className="delta"
                        style={{ color: `rgb(${COLORS.deceased})` }}
                      >
                        {state[1]?.delta?.deceased > 0 && (
                          <ArrowSmUpIcon className="h-5 justify-self-end" />
                        )}
                        {state[1]?.delta?.deceased?.toLocaleString("en-IN")}
                      </p>
                      <p>
                        {state[1]?.total?.deceased?.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </td>
                  <td>
                    <p className={index % 2 ? "bg-gray-200" : undefined}>
                      {state[1]?.total?.other
                        ? state[1]?.total?.other?.toLocaleString("en-IN")
                        : 0}
                    </p>
                  </td>
                  <td>
                    <div className={index % 2 ? "bg-gray-200" : undefined}>
                      <p
                        className="delta"
                        style={{ color: `rgb(${COLORS.tested})` }}
                      >
                        {state[1]?.delta?.tested > 0 && (
                          <ArrowSmUpIcon className="h-5 justify-self-end" />
                        )}
                        {formatNum(state[1]?.delta?.tested, 1)?.toLocaleString(
                          "en-IN"
                        )}
                      </p>
                      <p>
                        {formatNum(state[1]?.total?.tested, 1)?.toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className={index % 2 ? "bg-gray-200" : undefined}>
                      <p
                        className="delta"
                        style={{ color: `rgb(${COLORS.vaccinated})` }}
                      >
                        {state[1]?.delta?.vaccinated1 > 0 && (
                          <ArrowSmUpIcon className="h-5 justify-self-end" />
                        )}
                        {formatNum(
                          state[1]?.delta?.vaccinated1,
                          1
                        )?.toLocaleString("en-IN")}
                      </p>
                      <p>
                        {formatNum(
                          state[1]?.total?.vaccinated1,
                          1
                        )?.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className={index % 2 ? "bg-gray-200" : undefined}>
                      <p
                        className="delta"
                        style={{ color: `rgb(${COLORS.vaccinated})` }}
                      >
                        {state[1]?.delta?.vaccinated2 > 0 && (
                          <ArrowSmUpIcon className="h-5 justify-self-end" />
                        )}
                        {formatNum(
                          state[1]?.delta?.vaccinated2,
                          1
                        )?.toLocaleString("en-IN")}
                      </p>
                      <p>
                        {formatNum(
                          state[1]?.total?.vaccinated2,
                          1
                        )?.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </td>
                </tr>
              )
            );
          })}
          <tr>
            <th className="max-w-[10rem] sticky left-0">
              <div className="h-full p-2 grid place-items-center rounded-md bg-gray-200">
                <p>India</p>
              </div>
            </th>
            <td>
              <div className="bg-gray-200">
                <p
                  className="delta"
                  style={{ color: `rgb(${COLORS.confirmed})` }}
                >
                  {data["TT"]?.delta?.confirmed > 0 && (
                    <ArrowSmUpIcon className="h-5 justify-self-end" />
                  )}
                  {data["TT"]?.delta?.confirmed?.toLocaleString("en-IN")}
                </p>
                <p>{data["TT"]?.total?.confirmed?.toLocaleString("en-IN")}</p>
              </div>
            </td>
            <td>
              <div className="bg-gray-200">
                <p className="delta" style={{ color: `rgb(${COLORS.active})` }}>
                  {getActive(data["TT"]?.delta) > 0 && (
                    <ArrowSmUpIcon className="h-5 justify-self-end" />
                  )}
                  {getActive(data["TT"]?.delta) < 0 && (
                    <ArrowSmDownIcon className="h-5 justify-self-end" />
                  )}
                  {getActive(data["TT"]?.delta) !== 0 &&
                    Math.abs(getActive(data["TT"]?.delta))?.toLocaleString(
                      "en-IN"
                    )}
                </p>
                <p>{getActive(data["TT"]?.total)?.toLocaleString("en-IN")}</p>
              </div>
            </td>
            <td>
              <div className="bg-gray-200">
                <p
                  className="delta"
                  style={{ color: `rgb(${COLORS.recovered})` }}
                >
                  {data["TT"]?.delta?.recovered > 0 && (
                    <ArrowSmUpIcon className="h-5 justify-self-end" />
                  )}
                  {data["TT"]?.delta?.recovered?.toLocaleString("en-IN")}
                </p>
                <p>{data["TT"]?.total?.recovered?.toLocaleString("en-IN")}</p>
              </div>
            </td>
            <td>
              <div className="bg-gray-200">
                <p
                  className="delta"
                  style={{ color: `rgb(${COLORS.deceased})` }}
                >
                  {data["TT"]?.delta?.deceased > 0 && (
                    <ArrowSmUpIcon className="h-5 justify-self-end" />
                  )}
                  {data["TT"]?.delta?.deceased?.toLocaleString("en-IN")}
                </p>
                <p>{data["TT"]?.total?.deceased?.toLocaleString("en-IN")}</p>
              </div>
            </td>
            <td>
              <p className="bg-gray-200">
                {data["TT"]?.total?.other
                  ? data["TT"]?.total?.other?.toLocaleString("en-IN")
                  : 0}
              </p>
            </td>
            <td>
              <div className="bg-gray-200">
                <p className="delta" style={{ color: `rgb(${COLORS.tested})` }}>
                  {data["TT"]?.delta?.tested > 0 && (
                    <ArrowSmUpIcon className="h-5 justify-self-end" />
                  )}
                  {formatNum(data["TT"]?.delta?.tested, 1)?.toLocaleString(
                    "en-IN"
                  )}
                </p>
                <p>
                  {formatNum(data["TT"]?.total?.tested, 1)?.toLocaleString(
                    "en-IN"
                  )}
                </p>
              </div>
            </td>
            <td>
              <div className="bg-gray-200">
                <p
                  className="delta"
                  style={{ color: `rgb(${COLORS.vaccinated})` }}
                >
                  {data["TT"]?.delta?.vaccinated1 > 0 && (
                    <ArrowSmUpIcon className="h-5 justify-self-end" />
                  )}
                  {formatNum(data["TT"]?.delta?.vaccinated1, 1)?.toLocaleString(
                    "en-IN"
                  )}
                </p>
                <p>
                  {formatNum(data["TT"]?.total?.vaccinated1, 1)?.toLocaleString(
                    "en-IN"
                  )}
                </p>
              </div>
            </td>
            <td>
              <div className="bg-gray-200">
                <p
                  className="delta"
                  style={{ color: `rgb(${COLORS.vaccinated})` }}
                >
                  {data["TT"]?.delta?.vaccinated2 > 0 && (
                    <ArrowSmUpIcon className="h-5 justify-self-end" />
                  )}
                  {formatNum(data["TT"]?.delta?.vaccinated2, 1)?.toLocaleString(
                    "en-IN"
                  )}
                </p>
                <p>
                  {formatNum(data["TT"]?.total?.vaccinated2, 1)?.toLocaleString(
                    "en-IN"
                  )}
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HomeTable;
