import { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';
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

  const fetchTransactions = useCallback(async (filters, isLoadMore = false) => {
    if (!user) return;
    const { page, limit, search, category, startDate, endDate, minAmount, maxAmount } = filters;
    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      
      let url = `http://localhost:5000/api/transactions?page=${page}&limit=${limit}&search=${search}&category=${category}`;
      if(startDate && endDate) url += `&startDate=${startDate}&endDate=${endDate}`;
      if(minAmount) url += `&minAmount=${minAmount}`;
      if(maxAmount) url += `&maxAmount=${maxAmount}`;

      const response = await axios.get(url, config);
      
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

  const fetchRecentTransactions = useCallback(async () => {
    if (!user) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const response = await axios.get(`http://localhost:5000/api/transactions?page=1&limit=5`, config);
      setRecentTransactions(response.data.transactions);
      setTotalRecords(response.data.totalRecords);
    } catch (error) {
      console.error("Recent Fetch Error:", error);
    }
  }, [user]);

  const fetchSummary = useCallback(async () => {
    if (!user) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const response = await axios.get('http://localhost:5000/api/transactions/summary', config);
      setSummaryData(response.data);
    } catch (error) {
      console.error("Summary Error:", error);
    }
  }, [user]);

  const addTransaction = async (newTransaction, refreshCallback) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post('http://localhost:5000/api/transactions', newTransaction, config);
      
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

  const updateTransaction = async (id, updatedData, refreshCallback) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`http://localhost:5000/api/transactions/${id}`, updatedData, config);
      
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
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                await axios.delete(`http://localhost:5000/api/transactions/${id}`, config);
                
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