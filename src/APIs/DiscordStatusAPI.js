import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const DiscordStatus = () => {
  const [data, setData] = useState('');
  
  useEffect(() => {
    axios
      .get('https://api.lanyard.rest/v1/users/754381104034742415')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  const getActivityStatus = () => {
    const activity = data?.data?.discord_status;
    
    if (activity?.type === 0) {
      return `| Playing ${activity?.name}`;
    } else if (activity?.type === 2) {
      return `| Listening to ${activity?.name}`;
    } else if (activity?.type === 4) {
      return `| Streaming ${activity?.name}`;
    } else if (activity?.type === 5) {
      return `| Watching ${activity?.name}`;
    } else {
      return '';
    }
  };
  
  return (
    <span>
      {getActivityStatus()} 
      Currently {data.data?.discord_status} on{' '}
      <a
        href="https://discordapp.com/users/754381104034742415"
        aria-label="discord"
        target="_blank"
        rel="noopener noreferrer"
      >
        Discord
      </a>
    </span>
  );
};
