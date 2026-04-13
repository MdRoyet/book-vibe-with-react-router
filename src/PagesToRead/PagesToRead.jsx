import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// --- CUSTOM SHAPE LOGIC (Draws the curved triangles) ---
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height} Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

// --- CUSTOM LABEL LOGIC (Places the colored numbers on top) ---
const CustomLabel = (props) => {
  const { x, y, width, value, fill } = props;
  return (
    <text
      x={x + width / 2}
      y={y - 10}
      fill={fill}
      textAnchor="middle"
      fontWeight="bold"
    >
      {value}
    </text>
  );
};

// Colors to match your design
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const PagesToRead = () => {
  const [readBooks, setReadBooks] = useState([]);

  // Fetch read books from Local Storage on load
  useEffect(() => {
    const storedRead = JSON.parse(localStorage.getItem("readBooks")) || [];
    setReadBooks(storedRead);
  }, []);

  if (readBooks.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center">
        <h2 className="text-2xl font-bold text-gray-500">
          You haven't read any books yet! Go add some to your Read List.
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Light Gray Rounded Container */}
      <div className="bg-[#131313]/[0.05] rounded-3xl p-8 md:p-16 h-[500px] md:h-[600px] w-full flex justify-center items-center">
        {/* Recharts Responsive Container */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={readBooks}
            margin={{
              top: 30,
              right: 30,
              left: 0,
              bottom: 20,
            }}
          >
            {/* Dashed background lines */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="bookName"
              tick={{ fill: "#6B7280", fontSize: 14 }}
              tickMargin={15}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#6B7280", fontSize: 14 }}
              axisLine={false}
              tickLine={false}
            />

            {/* The Bar Component */}
            <Bar
              dataKey="totalPages"
              shape={<TriangleBar />}
              label={<CustomLabel />} // Uses our custom label for exact coloring
            >
              {/* Maps over the books to assign a unique color to each bar */}
              {readBooks.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PagesToRead;
