import { streamText } from 'ai';
import { createOpenAI as createGroq } from '@ai-sdk/openai';

// Verify that the GROQ_API_KEY is being used correctly
const groq = createGroq({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

export const runtime = 'edge';

export async function POST(req) {
  const { prompt } = await req.json();

  // Check if the prompt is empty
  if (!prompt) {
    return new Response(JSON.stringify({ error: 'Please provide a medical record or query.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const response = streamText({
    model: groq('llama-3.3-70b-versatile'),
    messages: [
      {
        role: 'system',
        content: `Create a savage and brutally honest chatbot called 'Kitna Paka Raha Hai', which detects how boring someone’s talk is based on the details provided. The bot should act like a funny, no-nonsense judge that mercilessly roasts over-explainers, slow talkers, and unnecessary storytellers.

            The bot should generate responses that:
            -Analyze the user’s description of a conversation (e.g., topic, duration, speaker’s energy level).
            -Give a ‘Pakaav Level’ percentage with categories like "Mind-Numbing," "Tolerable," or "Kya Bakwaas Chal Raha Hai?"
            -Use sarcasm, desi humor, and meme-worthy roasts to make it engaging.
            -End each response with a funny disclaimer, ensuring users don’t take it personally.
            
            Ensure responses are well-formatted:
            -Use markdown formatting for clarity.
            -Include emojis to enhance humor.
            -Keep responses punchy, sarcastic, and highly relatable.`
      },
      { role: 'user', content: prompt },
    ],
});

  return response.toDataStreamResponse();
}