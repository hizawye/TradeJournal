import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { RootState } from '../../store';
import { Trade } from '../../types/trade';

interface DayStats {
  trades: Trade[];
  totalPnL: number;
}

interface GroupedTrades {
  [date: string]: DayStats;
}

interface TradeDialogProps {
  open: boolean;
  onClose: () => void;
  trades: Trade[];
  date: string;
}

const TradeDialog: React.FC<TradeDialogProps> = ({ open, onClose, trades, date }) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle className="flex items-center">
      <CalendarMonthIcon className="mr-2" />
      Trades on {date}
    </DialogTitle>
    <DialogContent>
      {trades.map((trade) => (
        <Card 
          key={trade.id} 
          className="mb-3"
          sx={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <CardContent>
            <Box className="flex justify-between items-center mb-2">
              <Typography variant="h6">{trade.symbol}</Typography>
              <Typography 
                variant="body1" 
                className={`font-semibold ${(trade.pnl || 0) >= 0 ? 'text-emerald-500' : 'text-red-500'}`}
              >
                ${trade.pnl?.toFixed(2)}
              </Typography>
            </Box>
            <Box className="grid grid-cols-2 gap-4">
              <Typography variant="body2" color="text.secondary">
                Type: {trade.type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quantity: {trade.quantity}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Entry: ${trade.entryPrice}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Exit: ${trade.exitPrice}
              </Typography>
            </Box>
            {trade.notes && (
              <Typography variant="body2" color="text.secondary" className="mt-2">
                Notes: {trade.notes}
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </DialogContent>
  </Dialog>
);

export const Calendar: React.FC = () => {
  const trades = useSelector((state: RootState) => state.trades.trades);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const groupTradesByDate = (): GroupedTrades => {
    return trades.reduce((acc: GroupedTrades, trade) => {
      if (!acc[trade.date]) {
        acc[trade.date] = { trades: [], totalPnL: 0 };
      }
      acc[trade.date].trades.push(trade);
      acc[trade.date].totalPnL += trade.pnl || 0;
      return acc;
    }, {});
  };

  const groupedTrades = groupTradesByDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const firstDayWeekday = firstDayOfMonth.getDay();

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderDay = (dayNum: number) => {
    const date = new Date(currentYear, currentMonth, dayNum);
    const dateStr = date.toISOString().split('T')[0];
    const dayStats = groupedTrades[dateStr];
    const hasTrades = dayStats && dayStats.trades.length > 0;
    const isToday = new Date().toISOString().split('T')[0] === dateStr;

    return (
      <Card 
        key={dayNum} 
        onClick={() => hasTrades && setSelectedDate(dateStr)}
        className={`
          h-24 transition-all duration-200 
          ${hasTrades ? 'cursor-pointer hover:scale-105' : ''}
          ${isToday ? 'ring-2 ring-primary' : ''}
        `}
        sx={{
          background: hasTrades 
            ? `linear-gradient(135deg, 
                ${dayStats.totalPnL >= 0 
                  ? 'rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.05)' 
                  : 'rgba(239,68,68,0.1) 0%, rgba(239,68,68,0.05)'} 100%)`
            : 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)',
          backdropFilter: 'blur(10px)',
          border: hasTrades
            ? `1px solid ${dayStats.totalPnL >= 0 
                ? 'rgba(16,185,129,0.2)' 
                : 'rgba(239,68,68,0.2)'}`
            : '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <CardContent className="p-2">
          <Typography 
            variant="body2" 
            className={`text-right ${isToday ? 'font-bold' : ''}`}
          >
            {dayNum}
          </Typography>
          {hasTrades && (
            <>
              <Typography variant="body2" className="font-medium mt-2">
                {dayStats.trades.length} trade{dayStats.trades.length > 1 ? 's' : ''}
              </Typography>
              <Typography 
                variant="body2" 
                className={dayStats.totalPnL >= 0 ? 'text-emerald-500' : 'text-red-500'}
              >
                ${dayStats.totalPnL.toFixed(2)}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    );
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Box className="mt-8">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h5" className="flex items-center">
          <CalendarMonthIcon className="mr-2" />
          Trading Calendar
        </Typography>
        <Box className="flex items-center space-x-2">
          <IconButton onClick={handlePreviousMonth} size="small">
            <NavigateBeforeIcon />
          </IconButton>
          <Typography variant="h6">
            {monthNames[currentMonth]} {currentYear}
          </Typography>
          <IconButton onClick={handleNextMonth} size="small">
            <NavigateNextIcon />
          </IconButton>
        </Box>
      </Box>
      <Card 
        sx={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <CardContent>
          <Box className="grid grid-cols-7 gap-2">
            {weekDays.map(day => (
              <Box key={day} className="text-center font-medium text-gray-400 p-2">
                {day}
              </Box>
            ))}
            {[...Array(firstDayWeekday)].map((_, i) => (
              <Box key={`empty-${i}`} />
            ))}
            {[...Array(daysInMonth)].map((_, i) => renderDay(i + 1))}
          </Box>
        </CardContent>
      </Card>
      {selectedDate && groupedTrades[selectedDate] && (
        <TradeDialog
          open={!!selectedDate}
          onClose={() => setSelectedDate(null)}
          trades={groupedTrades[selectedDate].trades}
          date={selectedDate}
        />
      )}
    </Box>
  );
};
