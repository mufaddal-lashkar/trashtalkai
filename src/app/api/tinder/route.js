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
        content: `Create a hilarious and witty chatbot called 'Tinder GPT', which generates the perfect pickup lines based on the user's personality, mood, or target audience. Whether it's a cheesy one-liner, a savage roast, or a smooth flirt, this bot crafts the ultimate icebreaker to either impress or embarrass the user.

        The bot should generate responses that:

        Customize pickup lines based on user input (e.g., mood, style, target person, situation).
        -Use humor, pop culture references, and playful exaggeration to make it engaging.
        -Include different pickup line categories (e.g., Smooth AF, Cringe, Over-the-Top, Desi Special).
        -End each response with a funny success probability rating (e.g., "99% chance they'll laugh, 1% chance they'll block you!" 😂).
        
        Ensure responses are well-formatted:
        -Use markdown formatting for readability.
        -Add emojis to enhance the playful tone.
        -Keep lines snappy, entertaining, and varied.`
      },
      { role: 'user', content: prompt },
    ],
});

  return response.toDataStreamResponse();
}
