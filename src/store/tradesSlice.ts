import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Trade } from '../types/trade';
import { storageService } from '../services/storage';

interface TradesState {
  trades: Trade[];
}

const initialState: TradesState = {
  trades: storageService.getTrades(),
};

export const tradesSlice = createSlice({
  name: 'trades',
  initialState,
  reducers: {
    addTrade: (state, action: PayloadAction<Trade>) => {
      const trade = action.payload;
      const entryPrice = Number(trade.entryPrice);
      const exitPrice = Number(trade.exitPrice);
      const quantity = Number(trade.quantity);

      // Calculate PnL and PnL percentage
      if (trade.type === 'LONG') {
        trade.pnl = (exitPrice - entryPrice) * quantity;
        trade.pnlPercentage = ((exitPrice - entryPrice) / entryPrice) * 100;
      } else {
        trade.pnl = (entryPrice - exitPrice) * quantity;
        trade.pnlPercentage = ((entryPrice - exitPrice) / entryPrice) * 100;
      }
      state.trades.push(trade);
      storageService.saveTrades(state.trades);
    },
    removeTrade: (state, action: PayloadAction<string>) => {
      state.trades = state.trades.filter(trade => trade.id !== action.payload);
      storageService.saveTrades(state.trades);
    },
  },
});

export const { addTrade, removeTrade } = tradesSlice.actions;
export default tradesSlice.reducer;