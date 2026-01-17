'use client'
import React, { useState } from 'react'

export default function AddJobsPage() {
  const [position, setPosition] = useState('')
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')
  const [status, setStatus] = useState('Applied')
  const [jobType, setJobType] = useState('Full-time')

  const submitJob = async () => {
    const res = await fetch('/api/jobs', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ position, company, location, status, jobType }),
    })

    if (res.ok) alert('Job added successfully!')
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-muted py-20">
      <div className="w-full max-w-2xl bg-background rounded-2xl shadow-lg p-8 space-y-6">
        
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Add Job</h1>
          <p className="text-sm text-muted-foreground">
            Track your job applications in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="input"
            placeholder="Job Position"
            value={position}
            onChange={e => setPosition(e.target.value)}
          />
          <input
            className="input"
            placeholder="Company"
            value={company}
            onChange={e => setCompany(e.target.value)}
          />
          <input
            className="input"
            placeholder="Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            className="input"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option>Applied</option>
            <option>Interviewing</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>

          <select
            className="input"
            value={jobType}
            onChange={e => setJobType(e.target.value)}
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-primary text-primary-foreground py-3 font-medium hover:opacity-90 transition"
          onClick={submitJob}
        >
          Add Job
        </button>
      </div>
    </div>
  )
}
