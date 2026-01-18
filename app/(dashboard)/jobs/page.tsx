'use client'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import React from 'react'

interface Job {
  id: string
  userId: string
  position: string
  company: string
  location: string
  status: string
  jobType: string
  createdAt: string
}

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [formData, setFormData] = useState({
    position: '',
    company: '',
    location: '',
    status: 'Applied',
    jobType: 'Full-time'
  })

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch('/api/jobs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!res.ok) return
      const data = await res.json();
      setJobs(data);
    }
    fetchJobs();
  }, [])

  const openOverlay = (job: Job) => {
    setSelectedJob(job)
    setFormData({
      position: job.position,
      company: job.company,
      location: job.location,
      status: job.status,
      jobType: job.jobType
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const saveJob = async () => {
    if (!selectedJob) return;

    const res = await fetch(`api/jobs/${selectedJob.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    if (res.ok) {
      setJobs(jobs.map(job => job.id === selectedJob.id ? { ...job, ...formData } : job));
      setSelectedJob(null);
    }
  }

  const removeJob = async () => {
    if (!selectedJob) return;

    const res = await fetch(`api/jobs/${selectedJob.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.ok) {
      setJobs(jobs.filter(job => job.id !== selectedJob.id));
      setSelectedJob(null);
    }
  }

  return (
    <div className='h-[80vh] overflow-y-auto space-y-4 p-4'>
      {jobs.length === 0 && <p>No jobs found. Start by adding a new job!</p>}
      {jobs.map((job) => ( 
        <div key={job.id} className='p-4 border rounded-lg bg-background flex justify-between items-center hover:bg-gray-100' onClick={() => openOverlay(job)}>
          <div>
            <h2 className='text-lg font-semibold'>{job.position} at {job.company}</h2>
            <p className='text-sm text-muted-foreground'>{job.location} | {job.jobType} | {job.status}</p>
          </div>
          <div className='text-sm text-muted-foreground'>Applied on: {new Date(job.createdAt).toLocaleDateString()}</div>
        </div>
      ))}

      {/* Overlay for job details/editing */}
      {selectedJob && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm'>
          <div className='bg-background p-6 rounded-lg w-full max-w-md z-50'>
            <button className='mb-4 text-sm text-red-500' onClick={() => setSelectedJob(null)}>✕</button>

            <h2 className="text-xl font-semibold">Edit Job Listing</h2>

            <input className='input w-full' name='position' value={formData.position} onChange={handleChange} placeholder='Position'></input>
            <input className='input w-full' name='company' value={formData.company} onChange={handleChange} placeholder='Company'></input>
            <input className='input w-full' name='location' value={formData.location} onChange={handleChange} placeholder='Location'></input>
            <select className="input w-full" name='status' value={formData.status} onChange={handleChange}>
              <option>Applied</option>
              <option>Interviewing</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
            <select className="input w-full" name='jobType' value={formData.jobType} onChange={handleChange}>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
              
            <Button className="mt-4 w-full bg-blue-500 text-white rounded hover:bg-blue-700" onClick={saveJob}>Save Changed</Button>
            <Button className="mt-2 w-full bg-red-500 text-white rounded hover:bg-red-700" onClick={removeJob}>Delete Job</Button>
          </div>
        </div>
      )}
    </div>
  )
}
