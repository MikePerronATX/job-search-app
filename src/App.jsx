import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async ({ term, location }) => {
    setLoading(true);
    setNoResults(false);

    try {
      const response = await fetch(`https://job-search-backend-qvnz.onrender.com/jobs?search=${encodeURIComponent(term)}&location=${encodeURIComponent(location)}`);
      const data = await response.json();

      if (data.jobs && data.jobs.length > 0) {
        setJobs(data.jobs);
      } else {
        setJobs([]);
        setNoResults(true);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
      setNoResults(true);
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Find Your Next Job</h1>
      <SearchBar onSearch={handleSearch} />

      {loading && <div className="spinner">Loading...</div>}

      {noResults && !loading && <div className="no-results">No jobs found. Try a different search!</div>}

      <div className="jobs-list">
        {jobs.map((job, index) => (
          <div key={index} className="job-card">
            <div className="job-card-header">
              {job.employer_logo && (
                <img
                  src={job.employer_logo}
                  alt="Company logo"
                  className="company-logo"
                />
              )}
              <div className="job-card-info">
                <h2>{job.job_title}</h2>
                <h3>{job.employer_name}</h3>
                <p>{job.job_city}, {job.job_state}</p>
              </div>
            </div>
            <p className="job-description">{job.job_description?.slice(0, 120)}...</p>
            <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer" className="view-job-button">
              View Job
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;