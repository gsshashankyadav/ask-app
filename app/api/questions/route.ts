import { connectDB } from '@/lib/db'
import { Question } from '@/lib/models/Question'
import { NextRequest, NextResponse } from 'next/server'

function generateSlug() {
  return Math.random().toString(36).substring(2, 9)
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { name, question, backgroundImage } = await request.json()

    if (!name || !question) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    let slug = generateSlug()
    let slugExists = true

    while (slugExists) {
      const existing = await Question.findOne({ slug })
      if (!existing) {
        slugExists = false
      } else {
        slug = generateSlug()
      }
    }

    const newQuestion = await Question.create({
      name,
      question,
      backgroundImage: backgroundImage || 'gradient-1',
      slug,
      isActive: true,
    })

    return NextResponse.json({
      success: true,
      slug,
      shareUrl: `/q/${slug}`,
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to create question' },
      { status: 500 }
    )
  }
}
