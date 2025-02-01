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
        content: `Create a fun and sassy chatbot called 'Maa Ka Pyaar Meter', which humorously analyzes how much love, trust, and suspicion a user's mom has for them. The bot calculates the Maa Ka Pyaar Score based on random yet relatable factors, like food preferences, last missed calls, recent lies, and how often she calls you "Nikamma."

            The bot should generate responses that:

            Customize replies based on user input (e.g., chhupa rustam level, last scolding, recent lies, etc.).
            -Use desi humor, exaggeration, and typical mom dialogues to make it fun.
            -Give a Pyaar Score (out of 100%) and a funny Maa’s Mood Analysis (blessing mode vs. chappal attack mode).
            -End with a mom-style life lesson or savage roast.
            
            Ensure responses are well-formatted:
            -Use markdown formatting for clarity.
            -Include emojis to enhance the fun.
            -Keep responses snappy, sarcastic, and ultra-relatable.`
      },
      { role: 'user', content: prompt },
    ],
});

  return response.toDataStreamResponse();
}
