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
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import BarChart2 from "../../components/BarChart2";
import BarChart3 from "../../components/BarChart3";

import StatBox from "../../components/StatBox";
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ProgressCircle from "../../components/ProgressCircle";
import { format } from 'date-fns';
import ChatbotModal from "../../components/ChatbotModal";

const MAX_DATA_POINTS = 10;

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [file, setFile] = useState(null);
    const [environmentScore, setEnvironmentScore] = useState();
    const [socialScore, setSocialScore] = useState();
    const [governanceScore, setGovernanceScore] = useState();
    const [options] = useState({ labels: ['Score E', 'Score S', 'Score G'] });
    const [series, setSeries] = useState([
        { id: "Environment", color: colors.greenAccent[500], data: [] },
        { id: "Social", color: colors.blueAccent[400], data: [] },
        { id: "Governance", color: colors.redAccent[300], data: [] }
    ]);
    const [pillars, setPillars] = useState([]);
    const [esgData, setEsgData] = useState([]);
    const [data, setData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const socketRef = useRef(null);

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files) {
            setFile(files[0]);
        }
    };

    useEffect(() => {
        socketRef.current = new WebSocket('ws://localhost:8000/ws/data/');

        socketRef.current.onopen = () => {
            console.log('WebSocket connection established');
        };

        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const timestamp = new Date().toISOString();
            const formattedTimestamp = format(new Date(timestamp), 'dd, HH:mm:ss');

            if (data.document_data) {
                const { total_e_score, total_s_score, total_g_score, total_esg_score, year, campany_name, total_env_opportunity, total_soc_opportunity, total_gov_opportunity } = data.document_data;
                setEnvironmentScore(total_e_score);
                setSocialScore(total_s_score);
                setGovernanceScore(total_g_score);

                setSeries(prevSeries => [
                    {
                        ...prevSeries[0],
                        data: [...prevSeries[0].data, { x: formattedTimestamp, y: total_e_score }].slice(-MAX_DATA_POINTS)
                    },
                    {
                        ...prevSeries[1],
                        data: [...prevSeries[1].data, { x: formattedTimestamp, y: total_s_score }].slice(-MAX_DATA_POINTS)
                    },
                    {
                        ...prevSeries[2],
                        data: [...prevSeries[2].data, { x: formattedTimestamp, y: total_g_score }].slice(-MAX_DATA_POINTS)
                    }
                ]);

                setEsgData([total_esg_score, year]);

                const transformedPillars = data.all_data_sentiment.map(item => ({
                    category: item.category,
                    factors: item.factors,
                    color: 'hsl(203, 70%, 50%)',
                    e_score: item.e_score,
                    s_score: item.s_score,
                    g_score: item.g_score,
                    score_sentiment: item.score_sentiment,
                    sentiment: item.sentiment,
                }));
                setPillars(transformedPillars);

                setData({ total_e_score, total_s_score, total_g_score, total_esg_score, year, campany_name, total_env_opportunity, total_soc_opportunity, total_gov_opportunity });
            } else if (data.message) {
                setMessages(prevMessages => [...prevMessages, { role: 'assistant', body: data.message }]);
            }
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8000/esg/upload/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const fileUrl = response.data.path;

            setIsLoaded(true);
            socketRef.current.send(JSON.stringify({ type: 'form_data', data: { file_path: fileUrl } }));
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleSendMessage = (message) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({ type: 'form_data', data: { msg: message } }));

            setMessages(prevMessages => [...prevMessages, { role: 'user', body: message }]);
        }
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
                                mr: "10px",
                                '&:hover': {
                                    backgroundColor: colors.blueAccent[500],
                                },
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
                            mr: "10px",
                            '&:hover': {
                                backgroundColor: colors.blueAccent[500],
                            },
                        }}
                        onClick={handleSubmit}
                        disabled={!file}
                    >
                        Upload Report
                    </Button>
                </Box>
            </Box>
            <Box
                position="fixed"
                bottom="20px"
                right="20px"
                zIndex="tooltip"
            >
                <IconButton
                    sx={{
                        backgroundColor: colors.blueAccent[500],
                        color: colors.blueAccent[100],
                        '&:hover': {
                            backgroundColor: colors.blueAccent[600]
                        }
                    }}
                    onClick={() => setIsChatbotOpen(!isChatbotOpen)} // Toggle the state
                >
                    <ChatBubbleOutlineIcon sx={{ fontSize: "36px" }} />
                </IconButton>
            </Box>
            {isChatbotOpen && <ChatbotModal isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} messages={messages}
                onSendMessage={handleSendMessage} />}
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
                                progress={data.total_env_opportunity}
                                increase={data.total_env_opportunity}
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
                                progress={data.total_soc_opportunity}
                                increase={data.total_soc_opportunity}
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
                                progress={data.total_gov_opportunity}
                                increase={data.total_gov_opportunity}
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
                                title={data.total_esg_score}
                                subtitle="Total ESG Score"
                                progress={data.total_env_opportunity + data.total_soc_opportunity + data.total_gov_opportunity}
                                increase={data.total_env_opportunity + data.total_soc_opportunity + data.total_gov_opportunity}
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
                                    Company Overview
                                </Typography>
                            </Box>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom={`4px solid ${colors.primary[500]}`}
                                p="15px"
                                mt="25px"
                            >
                                <Box>
                                    <Typography
                                        color={colors.greenAccent[500]}
                                        variant="h5"
                                        fontWeight="600"
                                    >
                                        Company Name
                                    </Typography>
                                </Box>
                                <Box color={colors.greenAccent[500]}
                                    variant="h5"
                                    fontWeight="600">
                                    Year
                                </Box>
                                <Box
                                    color={colors.greenAccent[500]}
                                    variant="h5"
                                    fontWeight="600"
                                >
                                    Total ESG Score
                                </Box>
                            </Box>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom={`4px solid ${colors.primary[500]}`}
                                p="15px"
                                mt="25px"
                            >
                                <Box>
                                    <Typography
                                        color={colors.grey[100]}
                                        variant="h5"
                                        fontWeight="600"
                                    >
                                        {data.campany_name}
                                    </Typography>
                                </Box>
                                <Box color={colors.grey[100]} variant="h5"
                                    fontWeight="600"> {data.year}</Box>
                                <Box
                                    backgroundColor={colors.greenAccent[500]}
                                    p="5px 10px" variant="h5"
                                    fontWeight="600"
                                    borderRadius="4px"
                                >
                                    {data.total_esg_score}
                                </Box>
                            </Box>
                        </Box>

                        {/* ROW 3 */}
                        <Box
                            gridColumn="span 12"
                            gridRow="span 2"
                            backgroundColor={colors.primary[400]}
                        >
                            <Typography
                                variant="h5"
                                fontWeight="600"
                                sx={{ padding: "30px 30px 0 30px" }}
                            >
                                Pillar Scores Over Time {data.year}
                            </Typography>
                            <Box height="250px" mt="-20px">
                                <BarChart isDashboard={true} pillars={pillars} />
                            </Box>
                        </Box>

                        <Box
                            gridColumn="span 4"
                            gridRow="span 2"
                            backgroundColor={colors.primary[400]}
                            p="30px"
                        >
                            <Typography variant="h5" fontWeight="600">
                                Total ESG Score
                            </Typography>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                mt="25px"
                            >
                                <ProgressCircle size={data.total_esg_score} value={data.total_esg_score} />
                                <Typography
                                    variant="h5"
                                    color={colors.greenAccent[500]}
                                    sx={{ mt: "15px" }}
                                >
                                    {data.total_esg_score}  ESG Score
                                </Typography>
                                <Typography>{data.total_env_opportunity} Environment, {data.total_soc_opportunity} Social, {data.total_gov_opportunity} Governance</Typography>
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
                                Pillar Sentiment Analysis Over Time
                            </Typography>
                            <Box height="250px" mt="-20px">
                                <BarChart2 isDashboard={true} pillars={pillars} />
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
                                ESG Scores Over Time {data.year}
                            </Typography>
                            <Box height="250px" mt="-20px">
                                <BarChart3 isDashboard={true} pillars={pillars} />
                            </Box>
                        </Box>
                    </Box>                   
                </>
            )}
        </Box>
    );
};

export default Dashboard;
