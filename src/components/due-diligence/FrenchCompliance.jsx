import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, TextField, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { ResponsiveBar } from '@nivo/bar';
import Header from '../Header';
import { toast } from 'react-toastify';

const FrenchCompliance = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [file, setFile] = useState(null);
    const [complianceResults, setComplianceResults] = useState(null); // État pour stocker les résultats de conformité

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            alert("Veuillez sélectionner un fichier.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8000/benchmarking/check_compliance/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                toast.success("Fichier téléchargé avec succès.");
                // Adaptation des résultats pour les rendre compatibles avec ResponsiveBar
                const adaptedData = Object.keys(response.data).map((key) => ({
                    criterion: key,
                    value: response.data[key] ? 1 : 0, // Utilisation de 1 pour Compliant, 0 pour Non-Compliant
                }));
                setComplianceResults(adaptedData); // Mettez à jour les résultats de conformité
            } else {
                toast.error("Erreur lors du téléchargement du fichier.");
            }
        } catch (error) {
            console.error("Erreur lors du téléchargement du fichier:", error);
            toast.error("Erreur lors du téléchargement du fichier.");
        }
    };

    return (
        <Box m="20px">
            <Header title="SEC Compliance" subtitle="This section contains information and tools to ensure compliance with SEC regulations." />
            <Typography variant="h5" gutterBottom>
                Upload File to Check Compliance Sec
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

            {/* Afficher le graphique si les résultats de conformité sont disponibles */}
            {complianceResults && (
                <Box mt={4}>
                    <Typography variant="h5" gutterBottom>
                        Compliance Results
                    </Typography>
                    <div style={{ height: '400px' }}>
                        <ResponsiveBar
                            data={complianceResults}
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
                            keys={['value']} // Utilisation de 'value' comme clé pour les valeurs de conformité
                            indexBy="criterion"
                            margin={{ top: 50, right: 130, bottom: 90, left: 350 }}
                            padding={0.3}
                            layout="horizontal"
                            valueScale={{ type: 'linear' }}
                            indexScale={{ type: 'band', round: true }}
                            colors={{ scheme: 'set3' }}
                            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                            axisTop={null}
                            axisRight={null}
                            axisBottom={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: -45,
                                legend: 'Conformité',
                                legendPosition: 'middle',
                                legendOffset: 50
                            }}
                            axisLeft={{
                                tickSize: 10,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: 'Critères de conformité',
                                legendPosition: 'middle',
                                // set legend offset to adjust for long text
                                legendOffset: -340
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
                                    itemTextColor: colors.grey[100],
                                    symbolSize: 20,
                                    effects: [
                                        {
                                            on: 'hover',
                                            style: {
                                                itemOpacity: 1,
                                            }
                                        }
                                    ]
                                }
                            ]}
                            animate={true}
                            motionStiffness={90}
                            motionDamping={15}
                        />
                    </div>
                </Box>
            )}
        </Box>
    );
};

export default FrenchCompliance;
