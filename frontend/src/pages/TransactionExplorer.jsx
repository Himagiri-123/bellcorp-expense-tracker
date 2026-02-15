import { useEffect, useState, useRef } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import TransactionForm from '../components/TransactionForm';
import Modal from '../components/Modal';
import TransactionFilters from '../components/explorer/TransactionFilters';
import TransactionList from '../components/explorer/TransactionList';

const TransactionExplorer = () => {
  const { transactions, totalRecords, totalPages, loading, fetchTransactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();

  const [filters, setFilters] = useState(() => {
    const saved = localStorage.getItem('explorerFilters');
    return saved ? JSON.parse(saved) : { search: '', category: 'All', startDate: '', endDate: '', minAmount: '', maxAmount: '' };
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [viewingTransaction, setViewingTransaction] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    localStorage.setItem('explorerFilters', JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    const isLoadMore = currentPage > 1;
    fetchTransactions({ page: currentPage, limit: 10, ...filters }, isLoadMore);
  }, [currentPage, filters]);

  const handleLoadMore = () => { if (currentPage < totalPages) setCurrentPage(prev => prev + 1); };
  
  const handleShowLess = () => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({...prev, ...newFilters}));
    setCurrentPage(1);
  };

  const handleAdd = async (data) => {
    await addTransaction(data, () => { setCurrentPage(1); fetchTransactions({ page: 1, limit: 10, ...filters }, false); });
    setShowAddForm(false);
  };

  const handleUpdate = async (id, data) => {
    await updateTransaction(id, data, () => { fetchTransactions({ page: 1, limit: currentPage * 10, ...filters }, false); });
    setEditingTransaction(null); setShowAddForm(false);
  };
  
  const handleDelete = (id) => { deleteTransaction(id, () => { fetchTransactions({ page: 1, limit: currentPage * 10, ...filters }, false); }); };

  const clearFilters = () => {
    setFilters({ search: '', category: 'All', startDate: '', endDate: '', minAmount: '', maxAmount: '' });
    setCurrentPage(1);
    localStorage.removeItem('explorerFilters');
  };

  return (
    <div className="dashboard-container">
      <Modal transaction={viewingTransaction} onClose={() => setViewingTransaction(null)} />
      
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
        <h2 style={{margin:0, color:'#1f2937'}}>Transaction Explorer</h2>
        <button onClick={() => { setShowAddForm(!showAddForm); setEditingTransaction(null); }} style={{background:'#4f46e5', color:'white', border:'none', padding:'10px 20px', borderRadius:'6px', cursor:'pointer', fontWeight:'500', boxShadow:'0 2px 4px rgba(79, 70, 229, 0.3)'}}>{showAddForm ? 'Close Form' : '+ Add Transaction'}</button>
      </div>

      {showAddForm && <div style={{marginBottom:'20px'}}><TransactionForm onAddTransaction={handleAdd} onUpdateTransaction={handleUpdate} editingTransaction={editingTransaction} setEditingTransaction={setEditingTransaction} /></div>}

      <TransactionFilters filters={filters} setFilters={handleFilterChange} clearFilters={clearFilters} />

      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', background:'#f3f4f6', padding:'10px 15px', borderRadius:'8px', marginBottom:'15px', color:'#4b5563', fontSize:'0.9rem'}}>
          <strong>Total Transactions: {totalRecords}</strong>
          <span>Showing <b>{transactions.length}</b> of <b>{totalRecords}</b></span>
      </div>

      {transactions.length > 0 ? (
        <TransactionList transactions={transactions} onView={setViewingTransaction} onEdit={(t)=>{setEditingTransaction(t); setShowAddForm(true); window.scrollTo({top:0,behavior:'smooth'});}} onDelete={handleDelete} />
      ) : (!loading && <div style={{textAlign:'center', padding:'40px', background:'white', borderRadius:'10px'}}><p style={{color:'#9ca3af'}}>No transactions found.</p></div>)}

      {loading && <div className="spinner"></div>}

      {!loading && (
        <div style={{textAlign: 'center', marginTop: '20px', marginBottom: '30px', display:'flex', justifyContent:'center', gap:'15px'}}>
             {currentPage < totalPages && (
                <button onClick={handleLoadMore} className="btn-click-effect" style={{padding: '10px 25px', background: '#e0e7ff', color: '#4f46e5', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: '600'}}>Load More ↓</button>
             )}
             {currentPage > 1 && (
                <button onClick={handleShowLess} className="btn-click-effect" style={{padding: '10px 25px', background: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db', borderRadius: '30px', cursor: 'pointer', fontWeight: '600'}}>Show Less ↑</button>
             )}
        </div>
      )}
    </div>
  );
};
export default TransactionExplorer;