import React, { useState } from 'react';
import {
  Box, 
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  MenuItem,
  Alert,
  Snackbar,
  InputAdornment,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { addTrade } from '../../store/tradesSlice';
import { Trade, TradeFormData } from '../../types/trade';

export const TradeForm: React.FC = () => {
  const dispatch = useDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<TradeFormData>({
    symbol: '',
    entryPrice: '',
    exitPrice: '',
    quantity: '',
    type: 'LONG',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const generateTradeId = (): string => {
    return `trade-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trade: Trade = {
      ...formData,
      id: generateTradeId(),
      entryPrice: Number(formData.entryPrice),
      exitPrice: Number(formData.exitPrice),
      quantity: Number(formData.quantity),
    };
    dispatch(addTrade(trade));
    setShowSuccess(true);
    
    // Reset form
    setFormData({
      symbol: '',
      entryPrice: '',
      exitPrice: '',
      quantity: '',
      type: 'LONG',
      date: new Date().toISOString().split('T')[0],
      notes: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Card 
      className="h-full"
      sx={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <CardContent>
        <Typography variant="h5" className="mb-6 flex items-center">
          <AddIcon className="mr-2" />
          Add New Trade
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Symbol"
            name="symbol"
            value={formData.symbol}
            onChange={handleChange}
            required
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ShowChartIcon className="text-gray-400" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255,255,255,0.1)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255,255,255,0.2)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />

          <Box className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              label="Entry Price"
              name="entryPrice"
              type="number"
              placeholder="0.00"
              value={formData.entryPrice}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255,255,255,0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255,255,255,0.2)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <TextField
              label="Exit Price"
              name="exitPrice"
              type="number"
              placeholder="0.00"
              value={formData.exitPrice}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255,255,255,0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255,255,255,0.2)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
          </Box>

          <Box className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              placeholder="Enter quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255,255,255,0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255,255,255,0.2)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <TextField
              select
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255,255,255,0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255,255,255,0.2)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            >
              <MenuItem value="LONG">Long</MenuItem>
              <MenuItem value="SHORT">Short</MenuItem>
            </TextField>
          </Box>

          <TextField
            fullWidth
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayIcon className="text-gray-400" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255,255,255,0.1)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255,255,255,0.2)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />

          <TextField
            fullWidth
            label="Notes"
            name="notes"
            multiline
            rows={4}
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add any additional notes about the trade..."
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255,255,255,0.1)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255,255,255,0.2)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            size="large"
            className="mt-6"
            sx={{
              background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
              },
            }}
          >
            Add Trade
          </Button>
        </form>
      </CardContent>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          severity="success" 
          onClose={() => setShowSuccess(false)}
          sx={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.9) 0%, rgba(16,185,129,0.8) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(16,185,129,0.2)',
            color: 'white',
          }}
        >
          Trade added successfully
        </Alert>
      </Snackbar>
    </Card>
  );
};
