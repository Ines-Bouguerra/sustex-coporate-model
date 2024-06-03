import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    Typography,
    useTheme
} from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import GrassOutlined from "@mui/icons-material/GrassOutlined";
import SocialDistanceOutlinedIcon from '@mui/icons-material/SocialDistanceOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [file, setFile] = useState(null);

    const [environmentScore, setEnvironmentScore] = useState();
    const [socialScore, setSocialScore] = useState();
    const [governanceScore, setGovernanceScore] = useState();

    const [options] = useState({ labels: ['Score E', 'Score S', 'Score G'] });
    const [series, setSeries] = useState([0, 0, 0]);

    const [esgData, setEsgData] = useState([0, 0]);

    const [isLoaded, setIsLoaded] = useState(false);

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files) {
            setFile(files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        axios.post('http://localhost:8000/esg/upload/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                const fileUrl = response.data.path;
                const socket = new WebSocket('ws://localhost:8000/ws/data/');
                socket.onopen = () => {
                    setIsLoaded(true);
                    socket.send(JSON.stringify({
                        type: 'form_data',
                        data: {
                            file_path: fileUrl
                        }
                    }));
                    socket.onmessage = (event) => {
                        const data = JSON.parse(event.data);
                        const document_data = data.document_data;
                        if (document_data) {
                            setEnvironmentScore(document_data.total_e_score);
                            setSocialScore(document_data.total_s_score);
                            setGovernanceScore(document_data.total_g_score);
                            // setSeries([data.document_data.total_e_score, data.document_data.total_s_score, data.document_data.total_g_score]);
                            setSeries([{
                                id: "Environment Score",
                                color: colors.greenAccent[500],
                                data: [
                                    { x: '2021-01', y: data.document_data.total_e_score },
                                    { x: '2021-02', y: data.document_data.total_e_score },
                                    { x: '2021-03', y: data.document_data.total_e_score },
                                    { x: '2021-04', y: data.document_data.total_e_score },
                                    { x: '2021-05', y: data.document_data.total_e_score },
                                    { x: '2021-06', y: data.document_data.total_e_score },
                                    { x: '2021-07', y: data.document_data.total_e_score },
                                    { x: '2021-08', y: data.document_data.total_e_score },
                                    { x: '2021-09', y: data.document_data.total_e_score },
                                    { x: '2021-10', y: data.document_data.total_e_score },
                                    { x: '2021-11', y: data.document_data.total_e_score },
                                    { x: '2021-12', y: data.document_data.total_e_score }
                                ]
                            },
                                {
                                    id: "Social Score",
                                    color: colors.greenAccent[500],
                                    data: [
                                        { x: '2021-01', y: data.document_data.total_s_score },
                                        { x: '2021-02', y: data.document_data.total_s_score },
                                        { x: '2021-03', y: data.document_data.total_s_score },
                                        { x: '2021-04', y: data.document_data.total_s_score },
                                        { x: '2021-05', y: data.document_data.total_s_score },
                                        { x: '2021-06', y: data.document_data.total_s_score },
                                        { x: '2021-07', y: data.document_data.total_s_score },
                                        { x: '2021-08', y: data.document_data.total_s_score },
                                        { x: '2021-09', y: data.document_data.total_s_score },
                                        { x: '2021-10', y: data.document_data.total_s_score },
                                        { x: '2021-11', y: data.document_data.total_s_score },
                                        { x: '2021-12', y: data.document_data.total_s_score }
                                    ]
                                },
                                {
                                    id: "Governance Score",
                                    color: colors.greenAccent[500],
                                    data: [
                                        { x: '2021-01', y: data.document_data.total_g_score },
                                        { x: '2021-02', y: data.document_data.total_g_score },
                                        { x: '2021-03', y: data.document_data.total_g_score },
                                        { x: '2021-04', y: data.document_data.total_g_score },
                                        { x: '2021-05', y: data.document_data.total_g_score },
                                        { x: '2021-06', y: data.document_data.total_g_score },
                                        { x: '2021-07', y: data.document_data.total_g_score },
                                        { x: '2021-08', y: data.document_data.total_g_score },
                                        { x: '2021-09', y: data.document_data.total_g_score },
                                        { x: '2021-10', y: data.document_data.total_g_score },
                                        { x: '2021-11', y: data.document_data.total_g_score },
                                        { x: '2021-12', y: data.document_data.total_g_score }
                                    ]
                                }
                            ]);
                            setEsgData([data.document_data.total_e_score, data.year]);
                        }
                        console.log(data)
                    }
                    socket.onclose = () => {
                        setIsLoaded(false); // Set isLoaded to false when WebSocket connection is closed
                    }
                }
            })
            .catch(error => {
                console.error('Error uploading file: ', error);
            });
    };

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to your ESG dashboard" />
                <Box>
                    <input
                        accept=".pdf,.csv,.xlsx,.xls"
                        style={{ display: "none" }}
                        id="upload-data"
                        type="file"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="upload-data">
                        <Button
                            variant="contained"
                            component="span"
                            startIcon={<UploadOutlinedIcon />}
                            sx={{
                                backgroundColor: colors.blueAccent[700],
                                color: colors.grey[100],
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                                mr: "10px"
                            }}
                        >
                            Select Report (PDF, CSV, XLSX)
                        </Button>
                    </label>
                    <Button
                        variant="contained"
                        startIcon={isLoaded ? <CircularProgress size={24} color="inherit" /> : <UploadOutlinedIcon />}
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                            mr: "10px"
                        }}
                        onClick={handleSubmit}
                        disabled={!file}
                    >
                        Upload Report
                    </Button>
                </Box>
            </Box>
            {!isLoaded ? (
                <div className="text-center">
                    <Typography variant="h5" fontWeight="600" color={colors.grey[100]} mt="20px">
                        Upload a report to see your ESG scores.
                    </Typography>
                </div>
            ) : (
                <>
                    {/* GRID & CHARTS */}
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(12, 1fr)"
                        gridAutoRows="140px"
                        gap="20px"
                    >
                        {/* ROW 1 */}
                        <Box
                            gridColumn="span 3"
                            backgroundColor={colors.primary[400]}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <StatBox
                                title={environmentScore}
                                subtitle="Environment Score"
                                progress="0.75"
                                increase="+14%"
                                icon={
                                    <GrassOutlined
                                        sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                                    />
                                }
                            />
                        </Box>
                        <Box
                            gridColumn="span 3"
                            backgroundColor={colors.primary[400]}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <StatBox
                                title={socialScore}
                                subtitle="Social Score"
                                progress="0.50"
                                increase="+21%"
                                icon={
                                    <SocialDistanceOutlinedIcon
                                        sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                                    />
                                }
                            />
                        </Box>
                        <Box
                            gridColumn="span 3"
                            backgroundColor={colors.primary[400]}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <StatBox
                                title={governanceScore}
                                subtitle="Governance Score"
                                progress="0.30"
                                increase="+5%"
                                icon={
                                    <AccountBalanceOutlinedIcon
                                        sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                                    />
                                }
                            />
                        </Box>
                        <Box
                            gridColumn="span 3"
                            backgroundColor={colors.primary[400]}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <StatBox
                                title=""
                                subtitle=""
                                progress=""
                                increase=""
                                icon=""
                            />
                        </Box>

                        {/* ROW 2 */}
                        <Box
                            gridColumn="span 8"
                            gridRow="span 2"
                            backgroundColor={colors.primary[400]}
                        >
                            <Box
                                mt="25px"
                                p="0 30px"
                                display="flex "
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Box>
                                    <Typography
                                        variant="h5"
                                        fontWeight="600"
                                        color={colors.grey[100]}
                                    >
                                        ESG Score Over Time
                                    </Typography>
                                    <Typography
                                        variant="h3"
                                        fontWeight="bold"
                                        color={colors.greenAccent[500]}
                                    >
                                        {esgData[0]}
                                    </Typography>
                                </Box>
                                <Box>
                                    <IconButton>
                                        <DownloadOutlinedIcon
                                            sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                                        />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Box height="250px" m="-20px 0 0 0">
                                    <LineChart isDashboard={true} options={options} series={series} />
                            </Box>
                        </Box>
                        <Box
                            gridColumn="span 4"
                            gridRow="span 2"
                            backgroundColor={colors.primary[400]}
                            overflow="auto"
                        >
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom={`4px solid ${colors.primary[500]}`}
                                colors={colors.grey[100]}
                                p="15px"
                            >
                                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                                    Recent Transactions
                                </Typography>
                            </Box>
                        </Box>

                        {/* ROW 3 */}
                        <Box
                            gridColumn="span 4"
                            gridRow="span 2"
                            backgroundColor={colors.primary[400]}
                            p="30px"
                        >
                            <Typography variant="h5" fontWeight="600">
                                Campaign
                            </Typography>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                mt="25px"
                            >
                                <ProgressCircle size="125" />
                                <Typography
                                    variant="h5"
                                    color={colors.greenAccent[500]}
                                    sx={{ mt: "15px" }}
                                >
                                    $48,352 revenue generated
                                </Typography>
                                <Typography>Includes extra misc expenditures and costs</Typography>
                            </Box>
                        </Box>
                        <Box
                            gridColumn="span 4"
                            gridRow="span 2"
                            backgroundColor={colors.primary[400]}
                        >
                            <Typography
                                variant="h5"
                                fontWeight="600"
                                sx={{ padding: "30px 30px 0 30px" }}
                            >
                                Sales Quantity
                            </Typography>
                            <Box height="250px" mt="-20px">
                                <BarChart isDashboard={true} />
                            </Box>
                        </Box>
                        <Box
                            gridColumn="span 4"
                            gridRow="span 2"
                            backgroundColor={colors.primary[400]}
                            padding="30px"
                        >
                            <Typography
                                variant="h5"
                                fontWeight="600"
                                sx={{ marginBottom: "15px" }}
                            >
                                Geography Based Traffic
                            </Typography>
                        </Box>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default Dashboard;
