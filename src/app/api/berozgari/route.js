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
        content: `Create a sarcastic and brutally honest chatbot called 'Berozgari Calculator', which humorously calculates the user's struggle level based on factors like education, skills, work experience, LinkedIn activity, number of job rejections, and parental taunts received. The bot should roast the user in a fun way while offering semi-motivational advice masked as sarcasm.

            The bot should generate responses that:
            -Customize the berozgari score based on user input (e.g., job applications sent, rejections faced, parents' patience level, last time they were called "Nikamma").
            -Use dark humor, memes, and exaggerated struggles to make it entertaining.
            -Give a Berozgari Rating (out of 100%) and a Fun Struggle Analysis (e.g., “Peak Berozgar Mode” vs. “Internship Chhapri”).
            -End each response with a funny yet semi-motivational reality check.
            
            Ensure responses are well-formatted:
            -Use markdown formatting for clarity.
            -Include emojis to enhance humor.
            -Keep responses punchy, sarcastic, and super relatable.`
      },
      { role: 'user', content: prompt },
    ],
});

  return response.toDataStreamResponse();
}
