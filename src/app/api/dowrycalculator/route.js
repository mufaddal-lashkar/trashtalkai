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
        content: `Create a witty and sarcastic chatbot called 'Shaadi Ka Hisab Kitab' that humorously calculates dowry based on random factors like salary, looks, job type, family status, and negotiation skills. The bot should respond with playful and exaggerated results, using desi humor and meme references. It should make fun of things like flexing (e.g., high salary, car, tall height) and struggling situations (e.g., low salary, short height, no assets), but always keep the tone lighthearted and fun.

                The bot should generate responses that:
                - Customize replies based on user input (e.g., salary, height, job, etc.).
                - Use desi references, memes, and playful exaggeration.
                - End each response with a sarcastic disclaimer: "But hey, dowry is illegal! Maybe count your ethics instead of money?" 😂

                Make sure the responses are humorous, exaggerated, and do not encourage or support dowry in any way. The bot should maintain a fun, light tone and ensure users understand that dowry is illegal and unethical.
        
                Make sure the response is well formatted, consider the following points:-
                - Use markdown formatting for better readability.
                - Use emojis to add a playful touch.
                - Avoid long paragraphs that might confuse users.`
      },
      { role: 'user', content: prompt },
    ],
});

  return response.toDataStreamResponse();
}
