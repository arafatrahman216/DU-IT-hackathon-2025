import React from 'react';
import { Typography } from '@mui/material';

const HeaderContent = ({ content }) => {
    return (
        <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
                fontWeight: 'bold',
                color: 'primary.dark', // Use a darker shade of primary for strong contrast
                textAlign: 'center', // Center headers for a more polished look
                textShadow: '1px 1px 3px rgba(0,0,0,0.1)', // Subtle shadow for depth
            }}
        >
            {content}
        </Typography>
    );
};

export default HeaderContent;