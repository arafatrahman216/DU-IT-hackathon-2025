import { useEffect, useState } from 'react';
import {
    Container, Paper, Box, TextField, Button, CircularProgress, Typography
} from '@mui/material';
import HeaderContent from '../../components/LearningContent/HeaderContent';
import ImageContent from '../../components/LearningContent/ImageContent';
import FlashcardContent from '../../components/LearningContent/FlashcardContent';
import VideoContent from '../../components/LearningContent/VideoContent';
import LinkContent from '../../components/LearningContent/LinkContent';
import TextContent from '../../components/LearningContent/TextContent';
import QnA from '../../components/LearningContent/QnAs';

const LearningPage = () => {
    const [prompt, setPrompt] = useState('');
    const [learningContentData, setLearningContentData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchLearningContent = async (query) => {
        const response = await fetch('http://localhost:5000/api/learn/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    };

    const handleGenerate = async () => {
        if (!prompt.trim()) return;
        setLoading(true);
        setLearningContentData([]);
        try {
            const data = await fetchLearningContent(prompt);
            const parsedData = JSON.parse(data);
            setLearningContentData(parsedData);
        } catch (error) {
            console.error('Error fetching learning content:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: { xs: 3, sm: 5 }, flexGrow: 1 }}>
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 2, sm: 4 },
                    borderRadius: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.55)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    mb: 4
                }}
            >
                <Typography variant="h5" fontWeight={600} mb={2}>What do you want to learn?</Typography>
                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <TextField
                        fullWidth
                        label="Enter a topic or concept"
                        variant="outlined"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleGenerate}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Generate'}
                    </Button>
                </Box>
            </Paper>

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}

            {!loading && Array.isArray(learningContentData) && learningContentData.length > 0 && (
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 2, sm: 4 },
                        borderRadius: 3,
                        backgroundColor: 'rgba(255, 255, 255, 0.55)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    {learningContentData.map((item, index) => (
                        <Box key={index} sx={{ mb: item.type === 'header' ? 3 : 2.5 }}>
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
                                    case 'text':
                                        return <TextContent content={item.content} />;
                                    case 'qna':
                                        return <QnA question={item.question} answer={item.answer} />;
                                    default:
                                        return <p>Unsupported content type</p>;
                                }
                            })()}
                        </Box>
                    ))}
                </Paper>
            )}
        </Container>
    );
};

export default LearningPage;
