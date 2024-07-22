import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';
import axios from 'axios';
import Header from './Header';
import { tokens } from '../theme';

const BenchmarkingChart = () => {
  const [benchmarkingData, setBenchmarkingData] = useState([]);
  const [company1, setCompany1] = useState('');
  const [company2, setCompany2] = useState('');
  const [year, setYear] = useState('');
  const [companies, setCompanies] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const fetchCompanies = useCallback(() => {
    axios.get('http://152.228.133.62:8000/benchmarking/companies/')
      .then(response => {
        setCompanies(response.data.companies);
      })
      .catch(error => {
        console.error('Error fetching companies: ', error);
      });
  }, []);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const transformBenchmarkingData = (data) => {
    const categories = [
      { key: "total_env_label", label: "Environmental Label" },
      { key: "total_soc_label", label: "Social Label" },
      { key: "total_gov_label", label: "Governance Label" },
      { key: "total_env_neutral", label: "Environmental Neutral" },
      { key: "total_env_opportunity", label: "Environmental Opportunity" },
      { key: "total_env_risk", label: "Environmental Risk" },
      { key: "total_soc_neutral", label: "Social Neutral" },
      { key: "total_soc_opportunity", label: "Social Opportunity" },
      { key: "total_soc_risk", label: "Social Risk" },
      { key: "total_gov_neutral", label: "Governance Neutral" },
      { key: "total_gov_opportunity", label: "Governance Opportunity" },
      { key: "total_gov_risk", label: "Governance Risk" },
      { key: "total_e_score", label: "Environmental Score" },
      { key: "total_s_score", label: "Social Score" },
      { key: "total_g_score", label: "Governance Score" },
      { key: "total_esg_score", label: "ESG Score" }
    ];

    const transformedData = categories.map(category => {
      return {
        category: category.label,
        [company1]: data.list_infos1[0][company1]?.[0]?.[category.key] || 0,
        [company2]: data.list_infos2[0][company2]?.[0]?.[category.key] || 0,
      };
    });

    return transformedData;
  };

  const fetchBenchmarkingData = useCallback(() => {
    const params = {
      campany1: [company1],
      campany2: [company2],
      date: year,
    };

    axios.post('http://152.228.133.62:8000/benchmarking/benchmark_campany/', params)
      .then(response => {
        const transformedData = transformBenchmarkingData(response.data);
        setBenchmarkingData(transformedData);
      })
      .catch(error => {
        console.error('Error fetching benchmarking data: ', error);
      });
  }, [company1, company2, year]);

  useEffect(() => {
    if (company1 && company2 && year) {
      fetchBenchmarkingData();
    }
  }, [company1, company2, year, fetchBenchmarkingData]);

  const years = Array.from({ length: 10 }, (_, index) => new Date().getFullYear() - index);

  return (
    <Box m="20px">
      <Header title="Benchmarking Chart" subtitle="Compare two companies' scores for a specific year" />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <FormControl sx={{ minWidth: 400 }}>
          <InputLabel id="company1-label" sx={{ color: colors.blueAccent[300] }}>
            Company 1
          </InputLabel>
          <Select
            labelId="company1-label"
            value={company1}
            label="Company 1"
            onChange={(e) => setCompany1(e.target.value)}
            sx={{
              borderColor: colors.blueAccent[300],
              '&:focus': { borderColor: colors.blueAccent[300] },
            }}
          >
            {Array.isArray(companies) && companies.filter(company => company !== company2).map((company) => (
              <MenuItem key={company} value={company}>
                {company}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 400 }}>
          <InputLabel id="company2-label" sx={{ color: colors.blueAccent[300] }}>
            Company 2
          </InputLabel>
          <Select
            labelId="company2-label"
            value={company2}
            label="Company 2"
            onChange={(e) => setCompany2(e.target.value)}
            sx={{
              borderColor: colors.blueAccent[300],
              '&:focus': { borderColor: colors.blueAccent[300] },
            }}
          >
            {Array.isArray(companies) && companies.filter(company => company !== company1).map((company) => (
              <MenuItem key={company} value={company}>
                {company}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="year-label" sx={{ color: colors.blueAccent[300] }}>
            Year
          </InputLabel>
          <Select
            labelId="year-label"
            value={year}
            label="Year"
            onChange={(e) => setYear(e.target.value)}
            sx={{
              borderColor: colors.blueAccent[300],
              '&:focus': { borderColor: colors.blueAccent[300] },
            }}
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
            backgroundColor: colors.blueAccent[300],
            color: colors.grey[900],
            fontSize: '14px',
            fontWeight: 'bold',
            padding: '10px 20px',
            mr: '10px',
            '&:hover': {
              backgroundColor: colors.blueAccent[500],
            },
          }}
          onClick={fetchBenchmarkingData}
        >
          Compare Companies Scores
        </Button>
      </Box>
      <Box height="400px">
        {company1 && company2 && year && (
          <ResponsiveBar
            data={benchmarkingData}
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
            keys={[company1, company2]}
            indexBy="category"
            margin={{ top: 80, right: 160, bottom: 100, left: 80 }}
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
              tickRotation: -45,
              legend: 'Category',
              legendPosition: 'middle',
              legendOffset: 94,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Score',
              legendPosition: 'middle',
              legendOffset: -40,
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
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            animate
            motionStiffness={90}
            motionDamping={15}
          />
        )}
      </Box>

      <Box mt={4}>
        {company1 && company2 && year && (
          <Typography variant="body2" sx={{ color: colors.blueAccent[300] }}>
            * Scores are based on selected year and companies ESG data for that year. ESG data is collected from public sources. The scores are calculated based on the data available for the selected year.
          </Typography>
        )}
      </Box>
      <Box mt={4} mb={4}>
        {company1 && company2 && year && (
          <Box sx={{ overflowX: 'auto' }}>
            <TableContainer component={Box} sx={{ borderRadius: 8, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
              <Table>
                <TableHead sx={{ backgroundColor: colors.blueAccent[300], color: '#fff' }}>
                  <TableRow>
                    <TableCell align="center" sx={{ minWidth: 200 }}>Category</TableCell>
                    <TableCell align="center">{company1}</TableCell>
                    <TableCell align="center">{company2}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {benchmarkingData.map(item => (
                    <TableRow key={item.category}>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                        {item.category}
                      </TableCell>
                      <TableCell align="center">{item[company1]}</TableCell>
                      <TableCell align="center">{item[company2]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
      <br />
    </Box>
  );
};

export default BenchmarkingChart;
