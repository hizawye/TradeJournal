export interface TradeFormData {
  symbol: string;
  entryPrice: number | '';
  exitPrice: number | '';
  quantity: number | '';
  type: 'LONG' | 'SHORT';
  date: string;
  notes: string;
}

export interface Trade {
  id?: string;
  userId?: string;
  symbol: string;
  type: 'LONG' | 'SHORT';
  entryPrice: number;
  exitPrice: number;
  quantity: number;
  date: string;
  pnl?: number;
  pnlPercentage?: number;
  notes?: string;
  screenshot?: string;
  tags?: string[];
  timestamp?: any; // Firestore Timestamp
}
