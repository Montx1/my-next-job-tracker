'use client'
import React, { use } from 'react'
import { ResponsivePie } from '@nivo/pie'
import { useState, useEffect } from 'react'

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

type PieData = {
  id: string
  label: string
  value: number
}



export default function Stats() {
  const [allJobs, setAllJobs ] = useState<Job[]>([]);
  const [appliedJobs, setAppliedJobs] = useState(0);
  const [interviewJobs, setInterviewJobs] = useState(0);
  const [rejectedJobs, setRejectedJobs] = useState(0);
  const [acceptedJobs, setAcceptedJobs] = useState(0);
  const [graphData, setGraphData] = useState<PieData[]>([])

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch('api/jobs', {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        }
      });

      if (!res.ok) return;
      const rawData = await res.json(); 
      setAllJobs(rawData);
    }
    fetchJobs();
  }, [])

  useEffect(() => {
    let applied = 0;
    let interviewing = 0;
    let rejected = 0;
    let accepted = 0;

    allJobs.forEach(job => {
      switch (job.status) {
        case "Applied":
          applied++;
          break;
        case "Interviewing":
          interviewing++;
          break;
        case "Rejected":
          rejected++;
          break;
        case "Offer":
          accepted++;
          break;
      }
    });

    setAppliedJobs(applied);
    setInterviewJobs(interviewing);
    setRejectedJobs(rejected);
    setAcceptedJobs(accepted);
  }, [allJobs]);  

  useEffect(() => {
    const Gdata = [
      { id: "Applied", label: "Applied", value: appliedJobs},
      { id: "Interviewing", label: "Interviewing", value: interviewJobs},
      { id: "Rejected", label: "Rejected", value: rejectedJobs},
      { id: "Offer", label: "Offer", value: acceptedJobs}
    ]

    setGraphData(Gdata);

  }, [appliedJobs, rejectedJobs, interviewJobs, acceptedJobs])

  return (
    <>
    <h1 className='text-xl font-bold'>Here are the statistics for you job journey!</h1>
    <div style={{ height: 400 }}>
      <ResponsivePie
        data={graphData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333"
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      />
    </div>
    </>
  )
}