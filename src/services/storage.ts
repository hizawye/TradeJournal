import { Trade } from '../types/trade';

const STORAGE_KEY = 'tradejournal_trades';

export const storageService = {
  getTrades: (): Trade[] => {
    try {
      const storedTrades = localStorage.getItem(STORAGE_KEY);
      return storedTrades ? JSON.parse(storedTrades) : [];
    } catch (error) {
      console.error('Error loading trades:', error);
      return [];
    }
  },

  saveTrades: (trades: Trade[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trades));
    } catch (error) {
      console.error('Error saving trades:', error);
    }
  },
};
