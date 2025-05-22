import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Alert,
    Typography,
    Box,
    CircularProgress,
    Paper,
} from '@mui/material';

const MisInfo = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        setError('');
        try {
            const response = await fetch('http://localhost:5000/api/info/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: input }),
            });
            if (!response.ok) throw new Error('Server error');
            const data = await response.json();
            setResult(data.result);
            console.log(data.result);
        } catch (err) {
            setError('Failed to verify. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 6 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Misinformation Checker
                </Typography>
                <Button
                    variant="outlined"
                    sx={{ mb: 2 }}
                    onClick={() => navigate('/profile')}
                >
                    Return to Profile
                </Button>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Enter a statement to verify"
                        variant="outlined"
                        fullWidth
                        multiline
                        minRows={3}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={loading}
                        required
                        sx={{ mb: 2 }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading || !input.trim()}
                        >
                            Check
                        </Button>
                        {loading && <CircularProgress size={24} />}
                    </Box>
                </form>

                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}

                {result && (
                    <Alert severity={result.isMisinfo ? 'error' : 'success'} sx={{ mt: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {result.isMisinfo
                                ? '⚠️ Misinformation Detected!'
                                : '✅ No Misinformation Detected.'}
                        </Typography>

                        {/* English Explanation */}
                        {result.explanation && (
                            <>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    <strong>Explanation (EN):</strong> {result.explanation.english}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    <strong>ব্যাখ্যা (BN):</strong> {result.explanation.bengali}
                                </Typography>
                            </>
                        )}
                        {/* Sources */}
                        {result.sources && Array.isArray(result.sources) && result.sources.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="subtitle2" fontWeight="bold">
                                    Sources:
                                </Typography>
                                <ul style={{ margin: 0, paddingLeft: 18 }}>
                                    {result.sources.map((src, idx) => (
                                        <li key={idx}>
                                            <a href={src} target="_blank" rel="noopener noreferrer">
                                                {src}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </Box>
                        )}
                    </Alert>
                )}
            </Paper>
        </Container>
    );
};

export default MisInfo;
