import React from 'react';
import { Button, Box } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link'; // Optional: add an icon

const LinkContent = ({ content, label }) => {
    return (
        <Box sx={{ textAlign: 'center', my: 2 }}> {/* Added margin top/bottom */}
            <Button
                variant="contained"
                color="primary" // Or "secondary", or "inherit"
                href={content}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<LinkIcon />} // Optional icon
                sx={{
                    fontWeight: 'bold',
                    boxShadow: 2,
                    '&:hover': {
                        boxShadow: 4,
                    }
                }}
            >
                {label || 'Learn More'}
            </Button>
        </Box>
    );
};

export default LinkContent;