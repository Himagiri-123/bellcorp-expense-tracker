import { createContext, useState, useContext, useCallback } from 'react';
import API from '../api'; // Import our configured API
import AuthContext from './AuthContext';
import Swal from 'sweetalert2';

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [transactions, setTransactions] = useState([]); 
  const [recentTransactions, setRecentTransactions] = useState([]); 
  const [summaryData, setSummaryData] = useState({ totalExpenses: 0, chartData: [] });
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch Transactions
  const fetchTransactions = useCallback(async (filters, isLoadMore = false) => {
    if (!user) return;
    const { page, limit, search, category, startDate, endDate, minAmount, maxAmount } = filters;
    try {
      setLoading(true);
      
      let url = `/transactions?page=${page}&limit=${limit}&search=${search}&category=${category}`;
      if(startDate && endDate) url += `&startDate=${startDate}&endDate=${endDate}`;
      if(minAmount) url += `&minAmount=${minAmount}`;
      if(maxAmount) url += `&maxAmount=${maxAmount}`;

      const response = await API.get(url);
      
      if (isLoadMore) {
          setTransactions(prev => [...prev, ...response.data.transactions]);
      } else {
          setTransactions(response.data.transactions);
      }
      
      setTotalPages(response.data.totalPages);
      setTotalRecords(response.data.totalRecords);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch Recent
  const fetchRecentTransactions = useCallback(async () => {
    if (!user) return;
    try {
      const response = await API.get(`/transactions?page=1&limit=5`);
      setRecentTransactions(response.data.transactions);
      setTotalRecords(response.data.totalRecords);
    } catch (error) {
      console.error("Recent Fetch Error:", error);
    }
  }, [user]);

  // Fetch Summary
  const fetchSummary = useCallback(async () => {
    if (!user) return;
    try {
      const response = await API.get('/transactions/summary');
      setSummaryData(response.data);
    } catch (error) {
      console.error("Summary Error:", error);
    }
  }, [user]);

  // Add Transaction
  const addTransaction = async (newTransaction, refreshCallback) => {
    try {
      await API.post('/transactions', newTransaction);
      
      Swal.fire({
          icon: 'success',
          title: 'Added!',
          text: 'Transaction added successfully',
          timer: 1500,
          showConfirmButton: false
      });

      fetchRecentTransactions(); 
      fetchSummary();
      if(refreshCallback) refreshCallback();
      
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add transaction'
      });
    }
  };

  // Update Transaction
  const updateTransaction = async (id, updatedData, refreshCallback) => {
    try {
      await API.put(`/transactions/${id}`, updatedData);
      
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Transaction details updated',
        timer: 1500,
        showConfirmButton: false
      });

      fetchRecentTransactions();
      fetchSummary();
      if(refreshCallback) refreshCallback();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update transaction'
      });
    }
  };

  // Delete Transaction
  const deleteTransaction = async (id, refreshCallback) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#3b82f6',
        confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await API.delete(`/transactions/${id}`);
                
                Swal.fire(
                    'Deleted!',
                    'Transaction has been deleted.',
                    'success'
                );

                fetchRecentTransactions();
                fetchSummary();
                if(refreshCallback) refreshCallback();
            } catch (error) {
                Swal.fire(
                    'Error!',
                    'Failed to delete transaction.',
                    'error'
                );
            }
        }
    });
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        recentTransactions,
        summaryData,
        totalRecords,
        totalPages,
        loading,
        fetchTransactions,
        fetchRecentTransactions,
        fetchSummary,
        addTransaction,
        updateTransaction,
        deleteTransaction
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContext;