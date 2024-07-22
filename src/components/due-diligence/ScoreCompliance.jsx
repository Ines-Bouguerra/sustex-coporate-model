import React, { useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import Header from '../Header';
import axios from 'axios';
import { toast } from 'react-toastify';

const ScoreCompliance = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [file, setFile] = useState(null);
    const [complianceResults, setComplianceResults] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            toast.error("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://152.228.133.62:8000/benchmarking/check_due_diligence/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                toast.success("File uploaded successfully.");
                // Adapt the response data as needed for display
                setComplianceResults(response.data);
            } else {
                toast.error("Error uploading file.");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            toast.error("Error uploading file.");
        }
    };

    return (
        <Box m="20px">
            <Header title="Compliance Score" subtitle="This section contains information and tools to check compliance scores." />
            <Typography variant="h5" gutterBottom>
                Upload File to Check Compliance Score
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <TextField
                        type="file"
                        variant="outlined"
                        onChange={handleFileChange}
                        fullWidth
                        required
                        sx={{
                            paddingRight: '10px',
                            color: colors.grey[100],
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: colors.grey[100],
                                },
                                '&:hover fieldset': {
                                    borderColor: colors.grey[100],
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: colors.grey[100],
                                },
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        sx={{
                            backgroundColor: colors.greenAccent[400],
                            '&:hover': {
                                backgroundColor: colors.greenAccent[200],
                            },
                            padding: '20px 20px 10px 20px',
                            color: colors.grey[100],
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            fontSize: "14px",
                            fontWeight: "bold",
                        }}
                    >
                        Upload
                    </Button>
                </Box>
            </form>

            {/* Display compliance results if available */}
            {complianceResults && (
                <Box mt={4}>
                    <Typography variant="h5" gutterBottom>
                        Compliance Results
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Category</TableCell>
                                    <TableCell align="center">Count</TableCell>
                                    <TableCell align="center">Sentiment</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.keys(complianceResults).map((key) => (
                                    <TableRow key={key}>
                                        <TableCell component="th" scope="row">
                                            {key}
                                        </TableCell>
                                        <TableCell align="center">{complianceResults[key].count}</TableCell>
                                        <TableCell align="center">{complianceResults[key].sentiment}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </Box>
    );
};

export default ScoreCompliance;
