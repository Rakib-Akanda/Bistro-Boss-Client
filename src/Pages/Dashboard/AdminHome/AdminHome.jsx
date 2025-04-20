import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaMoneyCheckAlt, FaUsers } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineFoodBank } from "react-icons/md";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Legend,
} from "recharts";
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042",'red'];
const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      return res.data;
    },
  });
//   console.log(stats, chartData);
  // custom shape for the bar chart
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // custom shape for pie chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const pieChartData = chartData.map((data) => {
    return { name: data.category, value: data.revenue };
  });
  return (
    <div>
      <div>
        <h2 className="text-3xl font-semibold font-cinzel">
          <span>Hi, Welcome </span>
          {user?.displayName ? user.displayName : "Back"}
        </h2>
      </div>
      {/* Admin Stats */}
      <div className="my-4 ">
        <div className="flex justify-between">
          {/* revenue */}
          <div className=" bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] rounded-3xl px-5 py-5 text-white flex items-center gap-3 w-[190px]">
            <FaMoneyCheckAlt className="text-4xl" />
            <div>
              <h2 className="mb-2 font-inter text-2xl">Revenue</h2>
              <h2 className="font-extrabold font-inter text-4xl">
                ${stats?.revenue}
              </h2>
            </div>
          </div>
          {/* Menu Items */}
          <div className=" bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] rounded-3xl px-5 py-5 text-white flex items-center gap-3 w-[190px]">
            <FaUsers className="text-4xl" />
            <div>
              <h2 className="mb-2 font-inter text-2xl">Users</h2>
              <h2 className="font-extrabold font-inter text-4xl">
                {stats?.users}
              </h2>
            </div>
          </div>
          {/* revenue */}
          <div className=" bg-gradient-to-r from-[#FE4880] to-[#FECDE9] rounded-3xl px-5 py-5 text-white flex items-center gap-3  ">
            <MdOutlineFoodBank className="text-4xl" />
            <div>
              <h2 className="mb-2 font-inter text-2xl">Menu Items</h2>
              <h2 className="font-extrabold font-inter text-4xl">
                {stats?.menuItems}
              </h2>
            </div>
          </div>
          {/* revenue */}
          <div className=" bg-gradient-to-r from-[#6AAEFF] to-[#B6F7FF] rounded-3xl px-5 py-5 text-white flex items-center gap-3 w-[190px]">
            <TbTruckDelivery className="text-4xl" />
            <div>
              <h2 className="mb-2 font-inter text-2xl">Orders</h2>
              <h2 className="font-extrabold font-inter text-4xl">
                {stats?.orders}
              </h2>
            </div>
          </div>
        </div>
      </div>
      {/* Chart */}
      <div className="flex items-center">
        <div className="w1/2">
          <BarChart
            width={450}
            height={250}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar
              dataKey="quantity"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        {/* pie chart */}
        <div className="w1/2">
          <PieChart width={400} height={400}>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend></Legend>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
