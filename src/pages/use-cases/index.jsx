import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import useCases from '../../data/use-cases.json';

const UseCases = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = useCases.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="use-cases-container">
            <h1>Use Cases</h1>
            <div className="use-cases">
                {currentItems.map((useCase) => (
                    <Card key={useCase.id} className="use-case">
                        {/* <CardMedia
                            component="img"
                            height="140"
                            image={useCase.image}
                            alt={useCase.title}
                        /> */}
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div">
                                {useCase["I want to (perform some task)"]}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {useCase["So that I can (achieve some goals)"]}
                            </Typography>
                            <Link to={`/${useCase.id}`}>Learn More</Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Pagination
                count={Math.ceil(useCases.length / itemsPerPage)}
                page={currentPage}
                onChange={handleChangePage}
                color="primary"
                className="pagination"
            />
        </div>
    );
};

export default UseCases;
