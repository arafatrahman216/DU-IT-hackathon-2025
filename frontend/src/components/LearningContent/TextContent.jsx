import React from 'react';
import { Typography } from '@mui/material';

const TextContent = ({ content }) => {  
    return (
        <Typography
            variant="body1"
            component="p"
            sx={{
                color: 'text.primary',
                textAlign: 'left',
                borderLeft: '4px solid #1976d2', // Add a colored bar on the left
                paddingLeft: 2, // Add some space between bar and text
            }}
        >
            {content}
        </Typography>
    );
};

export default TextContent;