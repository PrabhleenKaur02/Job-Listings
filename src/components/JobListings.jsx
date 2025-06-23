import { useState, useEffect} from 'react'
import JobListing from './JobListing';
import Spinner from './Spinner';

const JobListings = ({ isHome = false }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect( () => { 
      const fetchJobs = async () => {
        const apiURL = isHome ? '/api/jobs?_limit=3' : '/api/jobs'
        console.log('fetching from: ', apiURL)
        try {
          const res = await fetch(apiURL, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        const data = await res.json();
        console.log(Array.isArray(data.JobsList), data.JobsList)
        setJobs(data.JobsList || [])
        } catch (error) {
          console.log('Error fetching data', error)
          setJobs([])
        }finally {
          setLoading(false);
        }
      }

      fetchJobs();
    }, [])

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
         {isHome ? 'Recent Jobs' : 'Browse Jobs' }
        </h2>
        
            {loading ? (
            <Spinner loading={loading} />
          ) : jobs.length === 0 ? (
            <p className='text-center text-grey-500'>OOPS! No jobs found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              { Array.isArray(jobs) && jobs.map((job) => (
              <JobListing key={job._id} job={ job } />
            )) }
             </div>
            )}
            
      </div>
    </section>
  )
}

export default JobListings