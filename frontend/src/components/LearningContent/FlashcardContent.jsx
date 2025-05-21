import React, { useState } from 'react';
import { Card, CardContent, Typography, CardActionArea, Box } from '@mui/material';
import { amber, deepPurple } from '@mui/material/colors'; // Import some vibrant colors

const FlashcardContent = ({ itemKey, value }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const frontBaseHexColor = amber[200]; // Example: #ffe082
    const backBaseHexColor = deepPurple[500]; // Example: #673ab7

    // Helper to convert hex to rgba string
    const hexToRgba = (hex, alpha) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    return (
        <Card
            sx={{
                maxWidth: 400,
                minHeight: 200,
                margin: '20px auto',
                borderRadius: 3,
                backgroundColor: 'transparent', // Card itself is transparent
                overflow: 'hidden', // Crucial for backdropFilter on child
            }}
        >
            <CardActionArea
                onClick={() => setIsFlipped(!isFlipped)}
                sx={{
                    height: '100%',
                    minHeight: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 2.5,
                    transition: 'background-color 0.4s ease-in-out, color 0.4s ease-in-out',
                    backgroundColor: isFlipped
                        ? hexToRgba(backBaseHexColor, 0.65) // Apply opacity here
                        : hexToRgba(frontBaseHexColor, 0.6), // Apply opacity here
                    backdropFilter: 'blur(10px)', // Keep or adjust blur
                    color: isFlipped ? 'common.white' : 'text.primary',
                    border: '1px solid rgba(255, 255, 255, 0.2)', // Consistent border
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Subtle shadow
                    '&:hover': {
                        filter: 'brightness(1.15)', // Slightly more pronounced hover
                        boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
                    }
                }}
            >
                {!isFlipped ? (
                    <>
                        <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 'medium' }}>
                            {itemKey}
                        </Typography>
                        <Typography variant="caption" display="block" sx={{ opacity: 0.8 }}>
                            (Click to reveal answer)
                        </Typography>
                    </>
                ) : (
                    <>
                        <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 'medium' }}>
                            Answer:
                        </Typography>
                        <Typography variant="body1">
                            {value}
                        </Typography>
                    </>
                )}
            </CardActionArea>
        </Card>
    );
};

export default FlashcardContent;