import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const citySuggestions = [
    'New York, NY',
    'San Francisco, CA',
    'Austin, TX',
    'Chicago, IL',
    'Seattle, WA',
    'Denver, CO',
    'Miami, FL',
    'Los Angeles, CA',
    'Boston, MA',
    'Atlanta, GA',
    'Phoenix, AZ',
    'Portland, OR',
    'Philadelphia, PA',
    'Dallas, TX',
    'Houston, TX',
    'San Diego, CA',
    'Tampa, FL',
    'Charlotte, NC',
    'Nashville, TN',
    'Minneapolis, MN',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim() && !location.trim()) {
      setError('Please enter a job title or location to search.');
      return;
    }

    setError('');
    onSearch({ term: searchTerm, location });
  };

  return (
    <div className="search-bar-wrapper">
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="City (optional)"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            setShowSuggestions(true);
          }}
        />

        {location && showSuggestions && (
          <ul className="autocomplete-list">
            {citySuggestions
              .filter((city) =>
                city.toLowerCase().includes(location.toLowerCase())
              )
              .slice(0, 5)
              .map((city, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setLocation(city);
                    setShowSuggestions(false);
                  }}
                  className="autocomplete-item"
                >
                  {city}
                </li>
              ))}
          </ul>
        )}
        <button type="submit">Search</button>
      </form>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}
    </div>
  );
};

export default SearchBar;