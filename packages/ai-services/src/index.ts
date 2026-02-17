import OpenAI from 'openai';

function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set');
  return new OpenAI({ apiKey });
}

export async function generateTopic(nichePrompt?: string) {
  const openai = getOpenAI();
  const prompt = nichePrompt || 'Generate one viral YouTube Shorts idea in entertainment niche with Top 5 format.';
  const response = await openai.responses.create({
    model: 'gpt-4o-mini',
    input: prompt
  });
  return response.output_text.trim();
}

export async function generateScript(topic: string) {
  const openai = getOpenAI();
  const response = await openai.responses.create({
    model: 'gpt-4o-mini',
    input: `Write a 30 second YouTube Shorts script with countdown numbers, exciting tone, short sentences. Topic: ${topic}`
  });
  return response.output_text.trim();
}

export async function extractKeywords(script: string): Promise<string[]> {
  const openai = getOpenAI();
  const response = await openai.responses.create({
    model: 'gpt-4o-mini',
    input: `Extract 5 short stock-video keywords from this script as comma-separated values: ${script}`
  });

  return response.output_text
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean)
    .slice(0, 5);
}
