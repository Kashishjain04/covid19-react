import { formatNum, getActive } from "../utils/commonFunctions";
import { COLORS } from "../utils/constants";

const { default: DashCard } = require("./DashCard");

const Dashboard = ({ data }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5">
      <DashCard
        title="Confirmed"
        color={COLORS.confirmed}
        delta={data?.delta?.confirmed?.toLocaleString("en-IN")}
        total={data?.total?.confirmed?.toLocaleString("en-IN")}
      />
      <DashCard
        title="Active"
        color={COLORS.active}
        delta=""
        total={getActive(data?.total)?.toLocaleString("en-IN")}
      />
      <DashCard
        title="Recovered"
        color={COLORS.recovered}
        delta={data?.delta?.recovered?.toLocaleString("en-IN")}
        total={data?.total?.recovered?.toLocaleString("en-IN")}
      />
      <DashCard
        title="Deceased"
        color={COLORS.deceased}
        delta={data?.delta?.deceased?.toLocaleString("en-IN")}
        total={data?.total?.deceased?.toLocaleString("en-IN")}
      />
      <DashCard
        title="Tested"
        color={COLORS.tested}
        delta={
          data?.delta?.tested
            ? formatNum(data?.delta?.tested, 2)?.toLocaleString("en-IN")
            : undefined
        }
        total={formatNum(data?.total?.tested, 2)?.toLocaleString("en-IN")}
      />
    </div>
  );
};

export default Dashboard;
