// components/Statistics.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Statistics.css';

const Statistics = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/statistics');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching statistics', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="statistics">
      <h2>Statistics</h2>
      <ul>
        {stats.map(stat => (
          <li key={stat.id}>{stat.name}: {stat.value}</li>
        ))}
      </ul>
    </div>
  );
};

export default Statistics;
