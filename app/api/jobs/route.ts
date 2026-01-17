import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { position, company, location, status, jobType } = await req.json()

  if (!position || !company) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }

  await prisma.job.create({
    data: {
      userId,
      position,
      company,
      location,
      status,
      jobType
    }
  })

  return NextResponse.json({ success: true })
}


export async function GET(req: Request)
 {
    const { userId } = await auth()
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const jobs = await prisma.job.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
    })

    console.log('Fetched jobs:', jobs);
    return NextResponse.json(jobs)
 }

