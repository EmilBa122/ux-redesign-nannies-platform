import React, { useState, useContext, useEffect } from "react";
import { Box, Typography, Grid, LinearProgress, Rating } from "@mui/material";

import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './AdCreation.css';
import './ResumeCreation.css';

import { AuthContext } from '../context/AuthContext';

const RatingsSection = ({}) => {

    const { user } = useContext(AuthContext);

    const [ratings, setRatings] = useState([]);

    const [averageRating, setAverageRating] = useState(0);

    // https://stackoverflow.com/questions/54363595/extract-day-month-year-from-a-yyyy-dd-mm-string-in-javascript
    // https://dev.to/lavary/convert-a-ddmmyyyy-string-to-a-date-object-in-javascript-35o3
    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split("/").map(Number);
        return new Date(year, month - 1, day); // Months are zero-indexed
    };

    const [starCounts, setStarCounts] = useState({
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const response = await fetch('/data/ratings.json');
                if (response.ok) {
                    const data = await response.json();
                    const sortedRatings = data.user_rating.sort((a, b) => {
                        return parseDate(b.date) - parseDate(a.date);
                    });
                    setRatings(sortedRatings);
                    let sum = 0;
                    const starDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
                    data.user_rating.forEach(rate => {
                        sum = sum + rate.rating;
                        starDistribution[rate.rating] = starDistribution[rate.rating] + 1;
                    })
                    const avg = sum / data.user_rating.length;
                    setAverageRating(avg);
                    // console.log(avg, sum);
                    setStarCounts(starDistribution);
                } else {
                console.error('Failed to fetch areas');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchRatings();  
        
    }, []); 

    if (!user) return null;

    return (
        <div className="AdCreation AdCreation-body" style={{ fontFamily: 'sans-serif' }}>

            {/* Breadcrumb Section */}
            <Breadcrumb style={{ paddingLeft: '1.25rem', marginTop: '10px' }}>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Αρχική</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/HomePageBabysitter' }}>Αρχική Νταντάς</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/HomePageBabysitter/RatingsSection' }}>Προβολή Κριτικών</Breadcrumb.Item>
            </Breadcrumb>

            <h1 id="title1" style={{paddingLeft: '1.25rem'}}>Προβολή Κριτικών</h1> 

            <main className="AdCreation-form-container">

            <Box sx={{ width: "50%", marginTop: "1.5rem" }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '3rem' }}>
                    {/* Average Rating Section */}
                    <Box sx={{ 
                        display: "flex", 
                        flexDirection: 'column', 
                        marginBottom: "2rem",
                    }}>
                        <h2 style={{ marginLeft: "4rem" }}>
                            {averageRating.toFixed(1)}
                        </h2>
                        <Rating value={parseFloat(averageRating)} precision={0.1} readOnly sx={{ fontSize: "2rem" }}/>
                        <p style={{ fontSize: "1.5rem", marginLeft: "2rem", marginTop: "0.5rem" }}>
                            {ratings.length} Κριτικές
                        </p>
                    </Box>

                    {/* Star Counts Section */}
                    <Box sx={{ 
                        display: "flex", 
                        flexDirection: 'column', 
                        marginLeft: "2rem", 
                        flex: 1  
                    }}>
                        {Object.entries(starCounts)
                            .sort(([a], [b]) => b - a)
                            .map(([stars, count]) => {
                                const percentage = ratings.length > 0 ? (count / ratings.length) * 100 : 0; // Avoid division by zero
                                return (
                                    <Grid 
                                        container 
                                        key={stars} 
                                        alignItems="center" 
                                        sx={{ marginBottom: '0.5rem' }} 
                                    >
                                        <Grid item xs={2}> 
                                            <Typography sx={{ fontSize: '0.9rem' }}> 
                                                {stars} αστέρια
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={9}> 
                                            <LinearProgress
                                                variant="determinate"
                                                value={percentage}
                                                sx={{
                                                    height: 8, 
                                                    borderRadius: 5, 
                                                    backgroundColor: "white", 
                                                    "& .MuiLinearProgress-bar": {
                                                        backgroundColor: "#FAAF00", 
                                                        borderRadius: 5, 
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={1}> 
                                            <Typography sx={{ fontSize: '0.9rem' }}> 
                                                {percentage.toFixed(0)}%
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                );
                            })}
                    </Box>
                </Box>   

                {/* Individual Reviews */}
                <Box sx={{ marginTop: '1rem' }}>
                    {ratings.map((rating, index) => (
                        <Box
                            key={index}
                            sx={{
                                marginBottom: '1.5rem',
                                backgroundColor: '#F0F0F0',
                                borderRadius: '10px',
                                display: 'flex',
                                paddingLeft: '16px',
                                flexDirection: 'column'
                            }}
                        >
                            <h3 style={{ fontWeight: 'bold', fontSize: '1.1rem', marginTop: '0.5rem' }}>
                                {rating.username} - {rating.date}
                            </h3>
                            <Rating value={rating.rating} readOnly size="small" />
                            <p style={{ fontSize: '1rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                                {rating.review}
                            </p>
                        </Box>
                    ))}
                </Box>
            </Box>
          
            <section className="ResumeCreation-button-customization_finalized_forum">
                    <a
                      href="/HomePageBabysitter"
                      className="ResumeCreation-button-customization"
                      onClick={(e) => {
                        e.preventDefault(); 
                        navigate('/HomePageBabysitter');
                    }}
                    >
                      Επιστροφή
                    </a>
            </section>

        </main>

    </div>
    );
};

export default RatingsSection;