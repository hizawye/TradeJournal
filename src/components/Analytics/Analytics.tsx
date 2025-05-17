import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, CardContent, Typography } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { RootState } from '../../store';
import { Trade } from '../../types/trade';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, color }) => (
  <Card 
    className="h-full transition-all duration-300 hover:scale-105"
    sx={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.1)',
    }}
  >
    <CardContent>
      <Box className="flex items-center justify-between mb-4">
        <Box 
          className="p-2 rounded-lg"
          sx={{ 
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            color: color || 'primary.main'
          }}
        >
          {icon}
        </Box>
        {trend && (
          <Typography 
            variant="body2" 
            className={`flex items-center ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}
          >
            {trend === 'up' ? '↑' : '↓'} {Math.abs(typeof value === 'number' ? value : 0)}%
          </Typography>
        )}
      </Box>
      <Typography variant="body1" color="text.secondary" className="mb-1">
        {title}
      </Typography>
      <Typography variant="h4" component="div" className="font-bold">
        {typeof value === 'number' && title.includes('P&L') ? `$${value.toFixed(2)}` : value}
      </Typography>
    </CardContent>
  </Card>
);

export const Analytics: React.FC = () => {
  const trades = useSelector((state: RootState) => state.trades.trades);

  const calculateStats = () => {
    if (trades.length === 0) {
      return {
        totalTrades: 0,
        winningTrades: 0,
        losingTrades: 0,
        winRate: 0,
        totalPnL: 0,
        averagePnL: 0,
        bestTrade: null as Trade | null,
        worstTrade: null as Trade | null,
      };
    }

    const winningTrades = trades.filter((trade: Trade) => (trade.pnl || 0) > 0);
    const totalPnL = trades.reduce((sum: number, trade: Trade) => sum + (trade.pnl || 0), 0);
    const sortedByPnL = [...trades].sort((a: Trade, b: Trade) => ((b.pnl || 0) - (a.pnl || 0)));

    return {
      totalTrades: trades.length,
      winningTrades: winningTrades.length,
      losingTrades: trades.length - winningTrades.length,
      winRate: (winningTrades.length / trades.length) * 100,
      totalPnL,
      averagePnL: totalPnL / trades.length,
      bestTrade: sortedByPnL[0],
      worstTrade: sortedByPnL[sortedByPnL.length - 1],
    };
  };

  const stats = calculateStats();

  return (
    <Box className="mt-8">
      <Typography variant="h5" className="mb-6 flex items-center">
        <ShowChartIcon className="mr-2" />
        Trading Analytics
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Box sx={{ flex: '1 1 calc(25% - 24px)', minWidth: 250 }}>
          <StatCard
            title="Total Trades"
            value={stats.totalTrades}
            icon={<TimelineIcon />}
          />
        </Box>
        <Box sx={{ flex: '1 1 calc(25% - 24px)', minWidth: 250 }}>
          <StatCard
            title="Win Rate"
            value={`${stats.winRate.toFixed(1)}%`}
            icon={<TrendingUpIcon />}
            trend={stats.winRate > 50 ? 'up' : 'down'}
            color={stats.winRate > 50 ? '#10b981' : '#ef4444'}
          />
        </Box>
        <Box sx={{ flex: '1 1 calc(25% - 24px)', minWidth: 250 }}>
          <StatCard
            title="Total P&L"
            value={stats.totalPnL}
            icon={<MonetizationOnIcon />}
            trend={stats.totalPnL > 0 ? 'up' : 'down'}
            color={stats.totalPnL > 0 ? '#10b981' : '#ef4444'}
          />
        </Box>
        <Box sx={{ flex: '1 1 calc(25% - 24px)', minWidth: 250 }}>
          <StatCard
            title="Avg. P&L/Trade"
            value={stats.averagePnL}
            icon={<AccountBalanceWalletIcon />}
            trend={stats.averagePnL > 0 ? 'up' : 'down'}
            color={stats.averagePnL > 0 ? '#10b981' : '#ef4444'}
          />
        </Box>
        
        {stats.bestTrade && (
          <Box sx={{ flex: '1 1 calc(50% - 24px)', minWidth: 250 }}>
            <Card 
              className="h-full"
              sx={{
                background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.05) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(16,185,129,0.2)',
              }}
            >
              <CardContent>
                <Typography variant="h6" className="mb-4 flex items-center">
                  <TrendingUpIcon className="mr-2 text-emerald-500" />
                  Best Trade
                </Typography>
                <Box className="space-y-2">
                  <Typography variant="body1">
                    Symbol: {stats.bestTrade.symbol}
                  </Typography>
                  <Typography variant="body1" className="text-emerald-500">
                    P&L: ${stats.bestTrade.pnl?.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date: {stats.bestTrade.date}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}
        
        {stats.worstTrade && (
          <Box sx={{ flex: '1 1 calc(50% - 24px)', minWidth: 250 }}>
            <Card 
              className="h-full"
              sx={{
                background: 'linear-gradient(135deg, rgba(239,68,68,0.1) 0%, rgba(239,68,68,0.05) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(239,68,68,0.2)',
              }}
            >
              <CardContent>
                <Typography variant="h6" className="mb-4 flex items-center">
                  <TrendingDownIcon className="mr-2 text-red-500" />
                  Worst Trade
                </Typography>
                <Box className="space-y-2">
                  <Typography variant="body1">
                    Symbol: {stats.worstTrade.symbol}
                  </Typography>
                  <Typography variant="body1" className="text-red-500">
                    P&L: ${stats.worstTrade.pnl?.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date: {stats.worstTrade.date}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>
    </Box>
  );
};