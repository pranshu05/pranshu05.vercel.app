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
    const activities = data?.data?.activities;

    if (!activities || activities.length === 0) {
      return ''; 
    }

    let status = '';

    activities.forEach(activity => {
      if (activity?.type === 0) {
        status += `Playing ${activity?.name} | `;
      } else if (activity?.type === 1) {
        status += `Streaming ${activity?.name} | `;
      } else if (activity?.type === 2) {
        status += `Listening ${activity?.details} by ${activity?.state} | `;
      } else if (activity?.type === 3) {
        status += `Watching ${activity?.name} | `;
      }
    });

    return status;
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
