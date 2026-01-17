import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const { position, company, location, status, jobType } = await req.json()

  await prisma.job.updateMany({
    where: {
      id,
      userId, // prevents cross uuser updates
    },
    data: {
      position,
      company,
      location,
      status,
      jobType,
    },
  })

  return NextResponse.json({ success: true })
}
