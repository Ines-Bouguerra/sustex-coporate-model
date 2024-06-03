import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import useCases from '../../data/use-cases.json';

const UseCases = () => {

    return (
        <div className="use-cases-container">
            <h1>Use Cases</h1>
            <div className="use-cases">
                {useCases.map((useCase) => (
                    <Card key={useCase.id} className="use-case">
                        <CardMedia
                            component="img"
                            height="140"
                            image={useCase.image}
                            alt={useCase.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {useCase["I want to (perform some task)"]}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {useCase["So that I can (achieve some goals)"]}
                            </Typography>
                            <Link to={`/use-case/${useCase.id}`}>Learn More</Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default UseCases;
