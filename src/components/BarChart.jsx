import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";

const BarChart = ({ isDashboard = false, pillars }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Function to truncate the factor labels
    const truncateLabel = (label) => {
        const maxLength = 20;
        return label?.length > maxLength ? label.substring(0, maxLength - 3) + "..." : label;
    };

    return (
        <ResponsiveBar
            data={pillars}
            theme={{
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
            keys={["e_score", "s_score", "g_score", "score_sentiment"]}
            indexBy="factors"
            margin={{ top: 50, right: 160, bottom: 80, left: 80 }} // Increased margins
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
                tickRotation: -45, // Incline les labels à 45 degrés
                legend: isDashboard ? undefined : "factors", // changed
                legendPosition: "middle",
                legendOffset: 50, // Adjusted legend offset
                format: (tickValue) => truncateLabel(tickValue),
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : "factors", // changed
                legendPosition: "middle",
                legendOffset: -50, // Adjusted legend offset
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
                return e.id + ": " + e.formattedValue + " in factors: " + e.indexValue;
            }}
        />
    );
};

export default BarChart;
