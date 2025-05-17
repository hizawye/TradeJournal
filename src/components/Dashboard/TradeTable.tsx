import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';
import NotesIcon from '@mui/icons-material/Notes';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { deleteTrade } from '../../store/tradesSlice';
import { Trade } from '../../types/trade';

export const TradeTable: React.FC = () => {
  const trades = useSelector((state: RootState) => state.trades.trades);
  const dispatch = useDispatch<AppDispatch>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tradeToDelete, setTradeToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setTradeToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (tradeToDelete) {
      dispatch(deleteTrade(tradeToDelete));
    }
    setDeleteDialogOpen(false);
    setTradeToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setTradeToDelete(null);
  };

  return (
    <Box className="rounded-xl overflow-hidden backdrop-blur-lg border border-gray-800" sx={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.1)',
    }}>
      <Typography variant="h6" className="p-4 border-b border-gray-800 flex items-center">
        <AttachMoneyIcon className="mr-2" />
        Trade History
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Box className="flex items-center">
                  <EventIcon className="mr-2 text-gray-400" fontSize="small" />
                  Date
                </Box>
              </TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Entry Price</TableCell>
              <TableCell align="right">Exit Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">P&L</TableCell>
              <TableCell align="right">P&L %</TableCell>
              <TableCell>
                <Box className="flex items-center">
                  <NotesIcon className="mr-2 text-gray-400" fontSize="small" />
                  Notes
                </Box>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trades.map((trade: Trade) => (
              <TableRow key={trade.id} hover>
                <TableCell>{trade.date}</TableCell>
                <TableCell>{trade.symbol}</TableCell>
                <TableCell>{trade.type}</TableCell>
                <TableCell align="right">${Number(trade.entryPrice).toFixed(2)}</TableCell>
                <TableCell align="right">${Number(trade.exitPrice).toFixed(2)}</TableCell>
                <TableCell align="right">{Number(trade.quantity)}</TableCell>
                <TableCell 
                  align="right"
                  className={trade.pnl && trade.pnl >= 0 ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}
                >
                  {trade.pnl !== undefined ? `$${trade.pnl.toFixed(2)}` : '-'}
                </TableCell>
                <TableCell 
                  align="right"
                  className={trade.pnlPercentage && trade.pnlPercentage >= 0 ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}
                >
                  {trade.pnlPercentage !== undefined ? `${trade.pnlPercentage.toFixed(2)}%` : '-'}
                </TableCell>
                <TableCell>{trade.notes}</TableCell>
                <TableCell>
                  <Tooltip title="Delete trade">
                    <IconButton
                      size="small"
                      onClick={() => trade.id && handleDeleteClick(trade.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Trade"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this trade? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
