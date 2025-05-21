import React from 'react';
import { Container, Paper, Box } from '@mui/material';
import { learningContentData } from '../../data/mockLearningData';
import HeaderContent from '../../components/LearningContent/HeaderContent';
import ImageContent from '../../components/LearningContent/ImageContent';
import FlashcardContent from '../../components/LearningContent/FlashcardContent';
import VideoContent from '../../components/LearningContent/VideoContent';
import LinkContent from '../../components/LearningContent/LinkContent';

const LearningPage = () => {
    return (
        <Container maxWidth="md" sx={{ py: { xs: 3, sm: 5 }, flexGrow: 1 }}>
            <Paper
                elevation={0} // Using 0 elevation and relying on border/custom shadow for depth
                sx={{
                    p: { xs: 2, sm: 4 },
                    borderRadius: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.55)', // More transparent white
                    backdropFilter: 'blur(12px)', // Increased blur
                    border: '1px solid rgba(255, 255, 255, 0.25)', // Slightly more opaque border
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
                }}
            >
                {learningContentData.map((item, index) => {
                    // Add some spacing between items
                    return (
                        <Box key={index} sx={{ mb: item.type === 'header' ? 3 : 2.5 }}> {/* More space before headers */}
                            {(() => {
                                switch (item.type) {
                                    case 'header':
                                        return <HeaderContent content={item.content} />;
                                    case 'image':
                                        return <ImageContent content={item.content} alt={item.alt} />;
                                    case 'flashcard':
                                        return <FlashcardContent itemKey={item.key} value={item.value} />;
                                    case 'video':
                                        return <VideoContent content={item.content} title={item.title} />;
                                    case 'link':
                                        return <LinkContent content={item.content} label={item.label} />;
                                    default:
                                        return <p>Unsupported content type</p>;
                                }
                            })()}
                        </Box>
                    );
                })}
            </Paper>
        </Container>
    );
};

export default LearningPage;