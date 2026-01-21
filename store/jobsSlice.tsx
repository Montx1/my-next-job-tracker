import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

interface JobsState {
    items: Job[]
    allItems: Job[]
    loading: boolean
}

const initialState: JobsState = {
    items: [],
    allItems: [],
    loading: false
}

export const fetchJobs = createAsyncThunk(
    'jobs/fetchJobs',
    async () => {
        const res = await fetch("/api/jobs")
        return await res.json()
    }
)

const jobsSlice = createSlice({
    name: 'jobs',
    initialState: initialState,
    reducers: {
        addJob(state, action) {
            state.items.push(action.payload)
            state.allItems.push(action.payload)
        },
        updateJob(state, action) {
            const idx = state.items.findIndex(job => job.id === action.payload.id)
            if (idx !== -1) state.items[idx] = action.payload

            const allidx = state.allItems.findIndex(job => job.id === action.payload.id)
            if (allidx !== -1) state.allItems[allidx] = action.payload
        },
        deleteJob(state, action) {
            const idx = state.items.findIndex(job => job.id === action.payload)
            if (idx !== -1) state.items.splice(idx, 1)

            const allidx = state.allItems.findIndex(job => job.id === action.payload)
            if (allidx !== -1) state.allItems.splice(allidx, 1)
        },
        replaceItems(state, action) {
            state.items = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchJobs.pending, state => {
                state.loading = true
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
                state.allItems = action.payload
            })
    }
})

export const { addJob, updateJob, deleteJob, replaceItems } = jobsSlice.actions
export default jobsSlice.reducer