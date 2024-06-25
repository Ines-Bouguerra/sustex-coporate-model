import React, { useCallback, useEffect, useState } from 'react';
import {
  Box, Button, FormControl, InputLabel, MenuItem, Select, useTheme
} from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';
import axios from 'axios';
import Header from './Header';
import { tokens } from '../theme';

const BenchmarkingChart = () => {
  const [benchmarkingData, setBenchmarkingData] = useState([
    { category: 'Category A', company1: 20, company2: 25 },
    { category: 'Category B', company1: 30, company2: 35 },
    { category: 'Category C', company1: 25, company2: 28 },
    { category: 'Category D', company1: 35, company2: 30 },
  ]);
  const [company1, setCompany1] = useState('');
  const [company2, setCompany2] = useState('');
  const [year1, setYear1] = useState('');
  const [year2, setYear2] = useState('');
  const [companies, setCompanies] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    // Fetch the list of companies for the select options
    axios.get('http://localhost:8000/companies')
      .then(response => {
        setCompanies(response.data);
      })
      .catch(error => {
        console.error('Error fetching companies data: ', error);
      });
  }, []);

  const fetchBenchmarkingData = useCallback(() => {
    const params = {
      company1,
      company2,
      year1,
      year2,
    };

    axios.post('http://localhost:8000/benchmarking/benchmark_company/', params)
      .then(response => {
        setBenchmarkingData(response.data);
      })
      .catch(error => {
        console.error('Error fetching benchmarking data: ', error);
      });
  }, [company1, company2, year1, year2]);

  useEffect(() => {
    if (company1 && company2 && year1 && year2) {
      fetchBenchmarkingData();
    }
  }, [company1, company2, year1, year2, fetchBenchmarkingData]);

  // Generate list of years (assuming a reasonable range)
  const years = Array.from({ length: 10 }, (_, index) => new Date().getFullYear() - index);

  return (
    <Box m="20px">
      <Header title="Benchmarking Chart" subtitle={"Compare two companies' scores for a specific year"} />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel
            id="company1-label"
            sx={{ color: colors.blueAccent[700] }} // Set label color
          >
            Company 1
          </InputLabel>
          <Select
            labelId="company1-label"
            value={company1}
            label="Company 1"
            onChange={(e) => setCompany1(e.target.value)}
            sx={{
              borderColor: colors.blueAccent[700],
              '&:focus': { borderColor: colors.blueAccent[700] },
              
            }}
          >
            {companies.map((company) => (
              <MenuItem key={company.id} value={company.name}>
                {company.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel
            id="company2-label"
            sx={{ color: colors.blueAccent[700] }} // Set label color
          >
            Company 2
          </InputLabel>
          <Select
            labelId="company2-label"
            value={company2}
            label="Company 2"
            onChange={(e) => setCompany2(e.target.value)}
            sx={{ borderColor: colors.blueAccent[700], '&:focus': { borderColor: colors.blueAccent[700] } }} // Set border color
          >
            {companies.map((company) => (
              <MenuItem key={company.id} value={company.name}>
                {company.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel
            id="year1-label"
            sx={{ color: colors.blueAccent[700] }} // Set label color
          >
            Year 1
          </InputLabel>
          <Select
            labelId="year1-label"
            value={year1}
            label="Year 1"
            onChange={(e) => setYear1(e.target.value)}
            sx={{ borderColor: colors.blueAccent[700], '&:focus': { borderColor: colors.blueAccent[700] } }} // Set border color
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel
            id="year2-label"
            sx={{ color: colors.blueAccent[700] }} // Set label color
          >
            Year 2
          </InputLabel>
          <Select
            labelId="year2-label"
            value={year2}
            label="Year 2"
            onChange={(e) => setYear2(e.target.value)}
            sx={{ borderColor: colors.blueAccent[700], '&:focus': { borderColor: colors.blueAccent[700] } }} // Set border color
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            mr: "10px"
          }}
          onClick={fetchBenchmarkingData}
        >
          Compare Companies Scores
        </Button>

      </Box>
      <Box height="400px">
        <ResponsiveBar
          data={benchmarkingData}
          keys={['company1', 'company2']}
          indexBy="category"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'nivo' }}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Category',
            legendPosition: 'middle',
            legendOffset: 32
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Score',
            legendPosition: 'middle',
            legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </Box>
    </Box>
  );
};

export default BenchmarkingChart;
