import React from 'react';
import { Box } from '@mui/material';

const ImageContent = ({ content, alt }) => {
    return (
        <Box
            component="img"
            src={content}
            alt={alt}
            sx={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: 2, // Use theme's border radius unit
                display: 'block', // To remove extra space below image if any
                margin: '0 auto', // Center image if it's smaller than container
                boxShadow: 3, // Use theme's shadow
            }}
        />
    );
};

export default ImageContent;