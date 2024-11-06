// ui/src/api.js

// Mock function for fetching patient distribution data
export const fetchPatientDistribution = async () => {
  // Sample data simulating the response structure
  const mockData = [
    { ageRange: "0-18", male: 45, female: 40 },
    { ageRange: "19-35", male: 60, female: 55 },
    { ageRange: "36-60", male: 70, female: 65 },
    { ageRange: "60+", male: 30, female: 35 },
  ];

  // Simulating a network delay for the mock function
  await new Promise((resolve) => setTimeout(resolve, 500)); // 500ms delay

  return mockData;
};
