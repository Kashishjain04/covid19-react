import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { useDispatch, useSelector } from "react-redux";
import { selectDate, changeDate } from "../redux/dateSlice";
import { formatDate } from "../utils/commonFunctions";

const DatePick = () => {
  const dispatch = useDispatch(),
    date = useSelector(selectDate);
  const getDate = () => {
    return (
      new Date(date).getDate() +
      "-" +
      (new Date(date).getMonth() + 1) +
      "-" +
      new Date(date).getFullYear()
    );
  };

  const Calander = ({ onClick }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 cursor-pointer p-2 hover:rounded-full hover:bg-gray-200 mx-auto"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={onClick}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    );
  };

  return (
    <div className="absolute top-5 right-5 grid place-items-center">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          disableFuture
          maxDate={new Date("2021-10-31")}
          minDate={new Date("2020-05-19")}
          TextFieldComponent={Calander}
          value={date}
          onChange={(val) => dispatch(changeDate(formatDate(val)))}
        />
      </MuiPickersUtilsProvider>
      <p>{getDate()}</p>
    </div>
  );
};

export default DatePick;
