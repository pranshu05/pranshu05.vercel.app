import React, { useState, useEffect } from 'react';

const GitHubLastUpdated = () => {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    const fetchLastCommit = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/pranshu05/pranshu05.vercel.app/commits?per_page=1`);
        const data = await response.json();
        if (data.length > 0) {
          const lastCommitDate = new Date(data[0].commit.author.date);
          const formattedDate = lastCommitDate.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });
          setLastUpdated(formattedDate);
        }
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      }
    };

    fetchLastCommit();
  }, []);

  return (
    <small style={{ color: '#808080' }} className='last-updated'>
      Last Updated: {lastUpdated}
    </small>
  );
};

export default GitHubLastUpdated;