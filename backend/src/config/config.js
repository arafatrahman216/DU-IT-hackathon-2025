import dotenv from 'dotenv';

// Configuration file for environment variables
dotenv.config({ path: process.cwd() + '/.env' });




export default {
  // Server configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // ElevenLabs configuration
  elevenLabs: {
    apiKey: process.env.ELEVENLABS_API_KEY,
    voiceId: process.env.ELEVENLABS_VOICE_ID || 'EXAVITQu4vr4xnSDxMaL' // Default voice ID
  },
  
  // LLM configuration (Groq or Gemini)
  llm: {
    provider: process.env.LLM_PROVIDER || 'groq', // 'groq' or 'gemini'
    apiKey: process.env.LLM_API_KEY ,
    model: process.env.LLM_MODEL || "llama-3.3-70b-versatile" // Default model for Groq
  }

};