import { QuestionDisplay } from '@/components/QuestionDisplay'
import { connectDB } from '@/lib/db'
import { Question } from '@/lib/models/Question'
import { notFound } from 'next/navigation'

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  try {
    await connectDB()

    const { slug } = await params
    const question = await Question.findOne({ slug })

    if (!question || !question.isActive) {
      notFound()
    }

    return (
      <QuestionDisplay
        initialData={{
          name: question.name,
          question: question.question,
          backgroundImage: question.backgroundImage,
        }}
      />
    )
  } catch (error) {
    console.error('Page error:', error)
    notFound()
  }
}
