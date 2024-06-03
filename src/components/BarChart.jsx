import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";

const BarChart = ({ isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const data = [
        {
            country: "AD",
            "hot dog": 118,
            "hot dogColor": "hsl(203, 70%, 50%)",
            burger: 158,
            burgerColor: "hsl(203, 70%, 50%)",
            sandwich: 88,
            sandwichColor: "hsl(203, 70%, 50%)",
            kebab: 93,
            kebabColor: "hsl(203, 70%, 50%)",
            fries: 132,
            friesColor: "hsl(203, 70%, 50%)",
            donut: 100,
            donutColor: "hsl(203, 70%, 50%)",
        },
        {
            country: "AE",
            "hot dog": 189,
            "hot dogColor": "hsl(203, 70%, 50%)",
            burger: 86,
            burgerColor: "hsl(203, 70%, 50%)",
            sandwich: 198,
            sandwichColor: "hsl(203, 70%, 50%)",
            kebab: 177,
            kebabColor: "hsl(203, 70%, 50%)",
            fries: 96,
            friesColor: "hsl(203, 70%, 50%)",
            donut: 198,
            donutColor: "hsl(203, 70%, 50%)",
        },
        {
            country: "AF",
            "hot dog": 94,
            "hot dogColor": "hsl(203, 70%, 50%)",
            burger: 108,
            burgerColor: "hsl(203, 70%, 50%)",
            sandwich: 116,
            sandwichColor: "hsl(203, 70%, 50%)",
            kebab: 155,
            kebabColor: "hsl(203, 70%, 50%)",
            fries: 94,
            friesColor: "hsl(203, 70%, 50%)",
            donut: 124,
            donutColor: "hsl(203, 70%, 50%)",
        },
        {
            country: "AG",
            "hot dog": 188,
            "hot dogColor": "hsl(203, 70%, 50%)",
            burger: 97,
            burgerColor: "hsl(203, 70%, 50%)",
            sandwich: 180,
            sandwichColor: "hsl(203, 70%, 50%)",
            kebab: 96,
            kebabColor: "hsl(203, 70%, 50%)",
            fries: 139,
            friesColor: "hsl(203, 70%, 50%)",
            donut: 101,
            donutColor: "hsl(203, 70%, 50%)",
        },
    ];
    return (
        <ResponsiveBar
            data={data}
            theme={{
                // added
                axis: {
                    domain: {
                        line: {
                            stroke: colors.grey[100],
                        },
                    },
                    legend: {
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                    ticks: {
                        line: {
                            stroke: colors.grey[100],
                            strokeWidth: 1,
                        },
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                },
                legends: {
                    text: {
                        fill: colors.grey[100],
                    },
                },
            }}
            keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
            indexBy="country"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "nivo" }}
            defs={[
                {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "#38bcb2",
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "#eed312",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
            ]}
            borderColor={{
                from: "color",
                modifiers: [["darker", "1.6"]],
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : "country", // changed
                legendPosition: "middle",
                legendOffset: 32,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : "food", // changed
                legendPosition: "middle",
                legendOffset: -40,
            }}
            enableLabel={false}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
            }}
            legends={[
                {
                    dataFrom: "keys",
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: "left-to-right",
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
            role="application"
            barAriaLabel={function (e) {
                return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
            }}
        />
    );
};

export default BarChart;