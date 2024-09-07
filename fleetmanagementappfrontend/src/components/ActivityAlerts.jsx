// components/ActivityAlerts.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function ActivityAlerts() {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 1 }}>Activity Alerts</Typography>
        <Typography variant="body2" color="textSecondary">
          No alerts at the moment.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ActivityAlerts;