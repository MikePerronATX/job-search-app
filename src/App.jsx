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
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h2>{job.title}</h2>
            <h3>{job.company_name}</h3>
            <p>{job.category}</p>
            <a href={job.url} target="_blank" rel="noopener noreferrer">View Job</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;