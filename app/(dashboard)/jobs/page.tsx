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
  const [allJobs, setAllJobs] = useState<Job[]>([])
  const [formData, setFormData] = useState({
    position: '',
    company: '',
    location: '',
    status: 'Applied',
    jobType: 'Full-time'
  })

  const [searchData, setSearchData] = useState({
    position: '',
    company: '',
    location: '',
    status: '',
    jobType: ''
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
      setAllJobs(data);
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value })
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
      setAllJobs(allJobs.map(job => job.id === selectedJob.id ? { ...job, ...formData } : job));
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
      setAllJobs(allJobs.filter(job => job.id != selectedJob.id));
      setSelectedJob(null);
    }
  }

  const filterJob = () => {
    const filtered = allJobs.filter(job => {
      return (
        job.position.toLowerCase().includes(searchData.position.toLowerCase()) &&
        job.company.toLowerCase().includes(searchData.company.toLowerCase()) &&
        job.location.toLowerCase().includes(searchData.location.toLowerCase()) &&
        (searchData.status && searchData.status !== "Any" ? job.status === searchData.status : true) &&
        (searchData.jobType && searchData.jobType !== "Any" ? job.jobType === searchData.jobType : true)
      )
    })

    console.log(searchData)
    console.log(filtered);
    setJobs(filtered);
  }

  const resetJobs = () => {
    setJobs(allJobs);
  }

  return (
    <div className='h-[80vh] overflow-y-auto space-y-4 p-4'>
      <div className='h-[25vh] flex flex-start flex-col gap-2'>
        <h1 className='font-xxl'><strong>Filter jobs</strong></h1>
        <div className="flex flex-row gap-4 p-4 bg-muted/40 rounded-xl border shadow-sm backdrop-blur-sm">
          <input
            className="flex-1 px-4 py-2 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-primary transition"
            name="position"
            onChange={handleSearchChange}
            placeholder="🔍 Search position"
          />
          <input
            className="flex-1 px-4 py-2 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-primary transition"
            name="company"
            onChange={handleSearchChange}
            placeholder="🏢 Search company"
          />
          <input
            className="flex-1 px-4 py-2 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-primary transition"
            name="location"
            onChange={handleSearchChange}
            placeholder="📍 Search location"
          />
        </div>

        <div className='flex flex-row justify-between border'>
          <select className='flex-1 px-4 py-2 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-primary transition' name="status" onChange={handleSearchChange}>
            <option value="">Any</option>
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select className="flex-1 px-4 py-2 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-primary transition" name='jobType' onChange={handleSearchChange}>
            <option value="">Any</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <Button onClick={filterJob}>Search Listings</Button>
        <Button onClick={resetJobs}>Reset</Button>
      </div>
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
              
            <Button className="mt-4 w-full bg-blue-500 text-white rounded hover:bg-blue-700" onClick={saveJob}>Save Changes</Button>
            <Button className="mt-2 w-full bg-red-500 text-white rounded hover:bg-red-700" onClick={removeJob}>Delete Job</Button>
          </div>
        </div>
      )}
    </div>
  )
}
