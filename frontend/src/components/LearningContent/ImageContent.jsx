import React from 'react';
import { Box } from '@mui/material';

const ImageContent = ({ content, alt, title = "untitled" }) => {
    return (
        <Box
            component="img"
            src={content}
            alt={alt}
            title={title}
            sx={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: 2,
                display: 'block',
                margin: '0 auto',
                boxShadow: 3,
            }}
        />
    );
};

export default ImageContent;