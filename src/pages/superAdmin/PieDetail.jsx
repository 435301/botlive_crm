import { useLocation } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import SelectFilter from "../../components/SelectFilter";
import { useState } from "react";
import { useCrud } from "../../hooks/useCrud";

const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 18;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="#555"
            fontSize={11}
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {name}
        </text>
    );
};

const PieDetail = () => {
    const location = useLocation();
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    // const [month, setMonth] = useState(1);

    const months = [
        { label: "January", value: 1, },
        { label: "Febraury", value: 2, },
        { label: "March", value: 3, },
        { label: "April", value: 4, },
        { label: "May", value: 5, },
        { label: "June", value: 6 },
        { label: "July", value: 7 },
        { label: "August", value: 8 },
        { label: "September", value: 9 },
        { label: "October", value: 10 },
        { label: "November", value: 11 },
        { label: "December", value: 12 }
    ]
    const { useList } = useCrud({
        entity: "attendance",
        listUrl: "/admin/attendancePercentageByDistrict",
    });
    const { chartData } = location.state || {}; // chart data passed from dashboard
    console.log('chartData', chartData);
    const districtId = chartData?.data?.[0]?.districtId;
    const { data, isLoading, isError } = useList(
        {
            districtId: Number(chartData?.data?.[0]?.districtId),
            month: Number(month)
        },
        {
            retry: false
        }
    );
    const attendanceByDistrict = (data?.data || []).map((item) => {
        const present = Number(item.percentage);
        const absent = 100 - present;

        return [
            { name: "Present", value: present, color: "#4CAF50" },
            { name: "Absent", value: absent, color: "#019aa8" }
        ];
    }).flat();

    if (!chartData) return <div>No data available</div>;
    if (!districtId) return <div>District not found</div>;

    return (
        <div className="container mt-4" style={{ height: "500px" }}>
            <h4 className="mb-4">{chartData.title} - {chartData.area}</h4>
            <div className="mb-3" style={{ maxWidth: "200px" }}>
                <SelectFilter
                    value={month}
                    placeholder="Select month"
                    options={months}
                    onChange={setMonth}
                />
            </div>
            {isLoading ? (
                <div className="text-center">Loading...</div>
            ) : isError ? (
                <p className="text-center text-danger">No Data Found</p>
            ) : attendanceByDistrict.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={attendanceByDistrict}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={120}
                            paddingAngle={3}
                            label={renderCustomLabel}
                            labelLine
                        >
                            {attendanceByDistrict.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            ) : (
                <p className="text-center">No Data Found</p>
            )}
        </div>
    );
};

export default PieDetail;