import { connectDB } from '@/lib/db'
import { Question } from '@/lib/models/Question'
import { sendYesEmail } from '@/lib/email'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB()

    const { slug } = await params
    const question = await Question.findOne({ slug })

    if (!question) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    if (!question.isActive) {
      return NextResponse.json({ error: 'Inactive' }, { status: 410 })
    }

    return NextResponse.json({
      name: question.name,
      question: question.question,
      backgroundImage: question.backgroundImage,
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB()

    const { slug } = await params
    const question = await Question.findOne({ slug })

    if (!question) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    if (!question.isActive) {
      return NextResponse.json({ error: 'Already answered' }, { status: 410 })
    }

    // Mark as inactive
    question.isActive = false
    question.answeredAt = new Date()
    await question.save()

    // Send email
    //await sendYesEmail(question.email, question.question, question.name)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
