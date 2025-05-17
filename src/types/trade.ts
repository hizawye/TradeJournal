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
  id: string;
  symbol: string;
  entryPrice: number;
  exitPrice: number;
  quantity: number;
  type: 'LONG' | 'SHORT';
  date: string;
  notes: string;
  pnl?: number;
  pnlPercentage?: number;
}
