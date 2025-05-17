import { createSlice, createAsyncThunk, PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { Trade } from '../types/trade';
import * as tradeService from '../services/tradeService';

interface TradesState {
  trades: Trade[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TradesState = {
  trades: [],
  status: 'idle',
  error: null
};

export const fetchTrades = createAsyncThunk<Trade[], string>(
  'trades/fetchTrades',
  async (userId) => {
    const trades = await tradeService.getTradesByUserId(userId);
    return trades;
  }
);

export const addTrade = createAsyncThunk<Trade, { userId: string; tradeData: Omit<Trade, 'id'> }>(
  'trades/addTrade',
  async ({ userId, tradeData }) => {
    const tradeId = await tradeService.createTrade(userId, tradeData);
    return { ...tradeData, id: tradeId };
  }
);

export const updateTrade = createAsyncThunk<
  Trade,
  { tradeId: string; tradeData: Partial<Trade> }
>(
  'trades/updateTrade',
  async ({ tradeId, tradeData }) => {
    await tradeService.updateTrade(tradeId, tradeData);
    return { id: tradeId, ...tradeData } as Trade;
  }
);

export const deleteTrade = createAsyncThunk<string, string>(
  'trades/deleteTrade',
  async (tradeId: string) => {
    await tradeService.deleteTrade(tradeId);
    return tradeId;
  }
);

const tradesSlice = createSlice({
  name: 'trades',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<TradesState>) => {
    builder
      .addCase(fetchTrades.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTrades.fulfilled, (state, action: PayloadAction<Trade[]>) => {
        state.status = 'succeeded';
        state.trades = action.payload;
      })
      .addCase(fetchTrades.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addTrade.fulfilled, (state, action: PayloadAction<Trade>) => {
        state.trades.push(action.payload);
      })
      .addCase(updateTrade.fulfilled, (state, action: PayloadAction<Trade>) => {
        const index = state.trades.findIndex((trade: Trade) => trade.id === action.payload.id);
        if (index !== -1) {
          state.trades[index] = { ...state.trades[index], ...action.payload };
        }
      })
      .addCase(deleteTrade.fulfilled, (state, action: PayloadAction<string>) => {
        state.trades = state.trades.filter((trade: Trade) => trade.id !== action.payload);
      });
  }
});

export default tradesSlice.reducer;