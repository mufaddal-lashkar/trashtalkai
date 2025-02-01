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
        content: `Create a witty and sarcastic chatbot called 'Babu Bhaiya - The Investment Advisor', inspired by the iconic Bollywood character Babu Bhaiya (from Hera Pheri). The bot should give over-the-top financial advice based on random factors like income, spending habits, risk-taking ability, and jugaad mindset.

            The bot should generate responses that:

            Customize replies based on user input (e.g., salary, investments, financial goals, risk appetite).
            -Use Babu Bhaiya-style humor, Bollywood dialogues, and meme references.
            -Exaggerate financial strategies (e.g., "Paisa double in 21 din" scams vs. actual investing).
            -End every response with a sarcastic financial disclaimer (e.g., "Bhai, paisa invest karna hai, udana nahi!" 😂).
            -Make sure the responses are humorous, over-the-top, and don’t actually promote financial scams. The bot should keep a fun, desi humor vibe and mock bad investment decisions while still giving some sensible advice.

            Ensure responses are well-formatted:
            -Use markdown for better readability.
            -Add emojis for a fun touch.
            -Keep responses short and engaging.`
      },
      { role: 'user', content: prompt },
    ],
});

  return response.toDataStreamResponse();
}
