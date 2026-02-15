import { useState, useEffect } from 'react';

const TransactionForm = ({ onAddTransaction, onUpdateTransaction, editingTransaction, setEditingTransaction }) => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  // Helper to get today's date in YYYY-MM-DD (Local Time)
  const getTodayString = () => {
    const today = new Date();
    // 'en-CA' gives YYYY-MM-DD format correctly for local time
    return today.toLocaleDateString('en-CA');
  };

  useEffect(() => {
    if (editingTransaction) {
      setText(editingTransaction.title);
      setAmount(editingTransaction.amount);
      setCategory(editingTransaction.category);
      
      if (editingTransaction.date) {
        // Extract YYYY-MM-DD from the stored date
        const localDate = new Date(editingTransaction.date).toLocaleDateString('en-CA');
        setDate(localDate);
      }
      
      setNotes(editingTransaction.notes || '');
    } else {
      clearForm();
    }
  }, [editingTransaction]);

  const clearForm = () => {
    setText('');
    setAmount('');
    setCategory('Food');
    setDate(getTodayString()); // Default to Today
    setNotes('');
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text || !amount) {
      alert('Please add a title and amount');
      return;
    }

    const transactionData = {
      title: text,
      amount: +amount,
      category,
      // Fix: Always send YYYY-MM-DD string. 
      // If user cleared date, send today's date string.
      date: date || getTodayString(), 
      notes
    };

    if (editingTransaction) {
      onUpdateTransaction(editingTransaction._id, transactionData);
    } else {
      onAddTransaction(transactionData);
    }

    if (!editingTransaction) clearForm();
  };

  const handleCancel = () => {
    setEditingTransaction(null);
    clearForm();
  };

  return (
    <div className="form-container" style={{ marginBottom: '20px', background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h3 style={{marginBottom: '15px', color: editingTransaction ? '#f59e0b' : '#4f46e5'}}>
        {editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
      </h3>
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="Ex: Salary, Groceries..." 
          />
        </div>

        <div style={{display: 'flex', gap: '10px'}}>
            <div className="form-group" style={{flex: 1}}>
            <label>Amount (₹)</label>
            <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="0" 
            />
            </div>
            <div className="form-group" style={{flex: 1}}>
            <label>Date</label>
            <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
            />
            </div>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
            <label>Notes (Optional)</label>
            <textarea 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add some details..."
                style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px'}}
            ></textarea>
        </div>

        <button className="btn" style={{background: editingTransaction ? '#f59e0b' : '#4f46e5'}}>
            {editingTransaction ? 'Update Transaction' : 'Add Transaction'}
        </button>
        
        {editingTransaction && (
            <button type="button" onClick={handleCancel} style={{width: '100%', marginTop: '10px', padding: '10px', background: '#9ca3af', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}}>
                Cancel Edit
            </button>
        )}
      </form>
    </div>
  );
};

export default TransactionForm;