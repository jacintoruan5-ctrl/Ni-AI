import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

export async function POST(req: Request) {
  try {
  const body = await req.json();
  const prompt = body.prompt;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  const text = completion.choices[0].message?.content || '';
  return NextResponse.json({ result: text });

} catch (err) {
  const error = err as Error; 
  return NextResponse.json({ error: error.message }, { status: 500 });
}
}

