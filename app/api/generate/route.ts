import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: NextRequest) {
  const { prompt } = await req.json()
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
    })
    const text = completion.choices[0].message?.content || ''
    return NextResponse.json({ result: text })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}