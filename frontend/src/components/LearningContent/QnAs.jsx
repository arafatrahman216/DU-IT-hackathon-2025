import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const QnA = ({ question, answer }) => {
    return (
        <Box sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    maxWidth: 600,
                    width: '100%',
                    textAlign: 'left',
                    boxShadow: 2,
                    '&:hover': {
                        boxShadow: 4,
                    }
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <QuestionAnswerIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" fontWeight="bold">
                        {question}
                    </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary">
                    {answer}
                </Typography>
            </Paper>
        </Box>
    );
};

export default QnA;