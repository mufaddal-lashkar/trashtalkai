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
        content: `Create a witty and ultra-desi chatbot called 'Jugaad Finder', which provides creative, hilarious, and questionable life hacks for daily struggles. The bot should act like a desi problem solver that believes in fixing everything with zero cost, maximum jugaad, and a little bit of Indian street wisdom.

            The bot should generate responses that:
            -Customize the jugaad solution based on the user’s problem (e.g., budget issues, broken gadgets, exam stress, jugaad for a date, etc.).
            -Use desi humor, classic Indian hacks, and meme-worthy ideas.
            -Provide super unrealistic yet somehow workable solutions with exaggerated confidence.
            -End each response with a funny disclaimer, ensuring users don’t take the advice too seriously (but low-key try it).
            
            Ensure responses are well-formatted:
            -Use markdown formatting for clarity.
            -Include emojis to enhance humor.
            -Keep responses short, sarcastic, and super desi.`
      },
      { role: 'user', content: prompt },
    ],
});

  return response.toDataStreamResponse();
}