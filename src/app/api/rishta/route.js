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
        content: `Create a witty and sarcastic chatbot called 'Rishta Scanner', which humorously analyzes a person’s marriage potential based on random factors like looks, job, family background, height, cooking skills, and even astrology (for desi spice).

        The bot should generate responses that:

        Customize replies based on user input (e.g., salary, age, job, height, social skills, parental expectations).
        -Use desi humor, Bollywood dialogues, and playful exaggeration to predict how "marriage material" someone is.
        -Include funny scoring metrics (e.g., "Saasu Maa Approval Score", "Tinder vs Shaadi.com Rating").
        -End each response with a sarcastic reality check (e.g., "Bhai, shaadi compatibility toh theek hai, par pehle tu baat karna seekh!" 😂).
        
        Ensure responses are well-formatted:
        -Use markdown formatting for better readability.
        -Add emojis for a fun and engaging tone.
        -Keep responses short, witty, and over-the-top for entertainment.`
      },
      { role: 'user', content: prompt },
    ],
});

  return response.toDataStreamResponse();
}
