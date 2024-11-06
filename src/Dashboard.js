import React, { useEffect, useState } from "react";
import { fetchPatientDistribution } from "./api";
import PatientDistributionChart from "./PatientDistributionChart";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter state for age range and gender
  const [selectedAgeRange, setSelectedAgeRange] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);

  const allAgeRanges = ["0-18", "19-35", "36-60", "60+"];
  const allGenders = ["Male", "Female"];

  // Fetch data from the API
  const fetchData = async () => {
    setLoading(true);
    try {
      const responseData = await fetchPatientDistribution();
      setData(responseData);
      setError(null);
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle filter changes
  const handleAgeRangeChange = (event) => {
    const { value } = event.target;
    setSelectedAgeRange(value);
  };

  const handleGenderChange = (event) => {
    const { value } = event.target;
    setSelectedGender(value);
  };

  // Filter the data based on selected age range and gender
  const filteredData = data.filter((item) => {
    const ageRangeMatches =
      selectedAgeRange.length === 0 || selectedAgeRange.includes(item.ageRange);
    const genderMatches =
      selectedGender.length === 0 ||
      selectedGender.some((gender) =>
        gender === "male" ? item.male > 0 : item.female > 0
      );
    return ageRangeMatches && genderMatches;
  });

  // Reset filters
  const handleResetFilters = () => {
    setSelectedAgeRange([]);
    setSelectedGender([]);
  };

  // Refresh data without resetting filters
  const handleRefreshData = () => {
    fetchData();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {/* Filters */}
      <div style={{ marginBottom: "20px" }}>
        <FormControl style={{ marginRight: "10px" }}>
          <InputLabel>Age Range</InputLabel>
          <Select
            multiple
            value={selectedAgeRange}
            onChange={handleAgeRangeChange}
            label="Age Range"
            renderValue={(selected) => selected.join(", ")}
          >
            {allAgeRanges.map((age) => (
              <MenuItem key={age} value={age}>
                {age}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl style={{ marginRight: "10px" }}>
          <InputLabel>Gender</InputLabel>
          <Select
            multiple
            value={selectedGender}
            onChange={handleGenderChange}
            label="Gender"
            renderValue={(selected) => selected.join(", ")}
          >
            {allGenders.map((gender) => (
              <MenuItem key={gender} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleResetFilters}
          style={{ marginRight: "10px" }}
        >
          Reset Filters
        </Button>

        <Button variant="contained" color="primary" onClick={handleRefreshData}>
          Refresh Data
        </Button>
      </div>

      {/* Chart */}
      <PatientDistributionChart data={filteredData} filters={selectedGender} />
    </div>
  );
};

export default Dashboard;
