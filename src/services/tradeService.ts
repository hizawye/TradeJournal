import { db } from '../config/firebase';
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Trade } from '../types/trade';

// Client-side operations
export const getTradesByUserId = async (userId: string): Promise<Trade[]> => {
  try {
    const tradesRef = collection(db, 'trades');
    const q = query(tradesRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Trade));
  } catch (error) {
    console.error('Error fetching trades:', error);
    throw error;
  }
};

export const createTrade = async (userId: string, tradeData: Omit<Trade, 'id'>) => {
  try {
    const tradesRef = collection(db, 'trades');
    const docRef = await addDoc(tradesRef, {
      ...tradeData,
      userId,
      timestamp: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating trade:', error);
    throw error;
  }
};

export const updateTrade = async (tradeId: string, tradeData: Partial<Trade>) => {
  try {
    const tradeRef = doc(db, 'trades', tradeId);
    await updateDoc(tradeRef, {
      ...tradeData,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating trade:', error);
    throw error;
  }
};

export const deleteTrade = async (tradeId: string) => {
  try {
    const tradeRef = doc(db, 'trades', tradeId);
    await deleteDoc(tradeRef);
  } catch (error) {
    console.error('Error deleting trade:', error);
    throw error;
  }
};
