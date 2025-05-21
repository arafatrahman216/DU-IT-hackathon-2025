import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const VideoContent = ({ content, title }) => {
    const getYouTubeID = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYouTubeID(content);

    if (!videoId) {
        return <Typography color="error">Invalid YouTube URL</Typography>;
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
        <Paper
            elevation={0} // Use 0 elevation
            sx={{
                p: { xs: 1.5, sm: 2.5 },
                textAlign: 'center',
                borderRadius: 3, // Consistent rounding
                backgroundColor: 'rgba(255, 255, 255, 0.60)', // More transparent white
                backdropFilter: 'blur(10px)', // Increased blur
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.22)', // Slightly more opaque border
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', // Consistent shadow
            }}
        >
            {title && (
                <Typography variant="h6" component="h4" gutterBottom sx={{ color: 'text.primary', fontWeight: 'medium' }}>
                    {title}
                </Typography>
            )}
            <Box
                sx={{
                    position: 'relative',
                    paddingBottom: '56.25%', // 16:9 aspect ratio
                    height: 0,
                    overflow: 'hidden',
                    borderRadius: 1, // Rounded corners for the iframe container
                    '& iframe': {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 0, // Remove iframe border
                    },
                }}
            >
                <iframe
                    src={embedUrl}
                    title={title || 'YouTube video player'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </Box>
        </Paper>
    );
};

export default VideoContent;