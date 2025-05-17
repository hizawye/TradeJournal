import React from 'react';
import { Container, Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { TradeForm } from '../TradeForm/TradeForm';
import { TradeTable } from './TradeTable';
import { Analytics } from '../Analytics/Analytics';
import { Calendar } from '../Calendar/Calendar';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LightModeIcon from '@mui/icons-material/LightMode';

export const Dashboard: React.FC = () => {
  return (
    <Box>
      <AppBar position="static" elevation={0} className="bg-opacity-30 backdrop-blur-lg border-b border-gray-800">
        <Toolbar>
          <TrendingUpIcon className="mr-2 text-primary" />
          <Typography variant="h6" component="div" className="flex-grow font-semibold">
            Trade Journal
          </Typography>
          <IconButton color="inherit">
            <LightModeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" className="py-6 space-y-6">
        <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TradeForm />
          <Analytics />
        </Box>
        <Calendar />
        <TradeTable />
      </Container>
    </Box>
  );
};
