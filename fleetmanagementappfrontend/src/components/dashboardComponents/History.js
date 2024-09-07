// components/dashboardComponents/History.js
import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import './History.css';

const History = () => {
  const history = [
    { id: 1, message: 'Low fuel level', startDate: '04/02/2022', endDate: '04/12/2022' },
    { id: 2, message: 'Low coolant level', startDate: '03/15/2022', endDate: '03/20/2022' },
  ];

  return (
    <Card className="history">
      <CardContent>
        <Typography variant="h6">Incident History</Typography>
        <List>
          {history.map((item) => (
            <ListItem key={item.id}>
              <ListItemText primary={item.message} secondary={`From: ${item.startDate} To: ${item.endDate}`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default History;
