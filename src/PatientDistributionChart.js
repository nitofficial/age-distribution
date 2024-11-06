// ui/src/components/PatientDistributionChart.js
import React from "react";
import { BarChart } from "@mui/x-charts";
import { Box } from "@mui/material";

const PatientDistributionChart = ({ data, filters }) => {
  // Dummy xAxis labels based on age ranges
  const xAxisLabels = data.map((item) => item.ageRange);

  // All series data
  const allSeries = [
    {
      label: "Male",
      data: data.map((item) => item.male),
      color: "#8884d8",
    },
    {
      label: "Female",
      data: data.map((item) => item.female),
      color: "#82ca9d",
    },
  ];
  const highlightScope = {
    highlight: "series",
    fade: "global",
  };
  // Filter the series based on the `filters` prop
  const filteredSeries = allSeries
    .filter((series) => {
      if (filters.includes("Male") && series.label === "Male") return true;
      if (filters.includes("Female") && series.label === "Female") return true;
      return filters.length === 0; // Show both if no filter is selected
    })
    .map((s) => ({
      ...s,
      highlightScope,
    }));

  return (
    <Box>
      <Box sx={{ height: 400, width: "100%" }}>
        <BarChart
          width={620}
          height={350}
          series={filteredSeries}
          skipAnimation={false}
          xAxis={[
            {
              label: "Age Range",
              data: xAxisLabels,
              scaleType: "band",
              labelStyle: {
                fontSize: "15px",
              },
              tickLabelStyle: {
                fontSize: "15px",
              },
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default PatientDistributionChart;
