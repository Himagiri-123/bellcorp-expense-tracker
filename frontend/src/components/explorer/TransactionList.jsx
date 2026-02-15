import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { formatCurrency, formatDate } from '../../utils/formatData';

const TransactionList = ({ transactions, onView, onEdit, onDelete }) => {
  return (
    <div className="transaction-list" style={{background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', overflow: 'hidden'}}>
      {transactions.map((t, index) => (
        <div 
            key={t._id} 
            className="transaction-item" 
            style={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '12px 20px',
                borderBottom: index !== transactions.length - 1 ? '1px solid #f3f4f6' : 'none',
                borderLeft: `4px solid ${t.category === 'Food' ? '#10b981' : t.category === 'Transport' ? '#3b82f6' : '#f59e0b'}`,
                transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
        >
          <div style={{flex: 1}}>
            <h4 style={{margin: '0 0 4px 0', color: '#1f2937', fontSize:'0.95rem'}}>{t.title}</h4>
            <small style={{color: '#6b7280'}}>{formatDate(t.date)} • {t.category}</small>
          </div>
          
          <div style={{display:'flex', alignItems:'center', gap:'20px'}}>
            <span style={{fontWeight:'bold', fontSize: '1rem', color: '#111827'}}>{formatCurrency(t.amount)}</span>
            
            <div style={{display:'flex', gap:'10px'}}>
              <button onClick={() => onView(t)} title="View" style={{border:'none', background:'#e0e7ff', color:'#4f46e5', padding:'6px', borderRadius:'4px', cursor:'pointer', display:'flex'}}><FaEye size={14}/></button>
              <button onClick={() => onEdit(t)} title="Edit" style={{border:'none', background:'#fef3c7', color:'#d97706', padding:'6px', borderRadius:'4px', cursor:'pointer', display:'flex'}}><FaEdit size={14}/></button>
              <button onClick={() => onDelete(t._id)} title="Delete" style={{border:'none', background:'#fee2e2', color:'#dc2626', padding:'6px', borderRadius:'4px', cursor:'pointer', display:'flex'}}><FaTrash size={14}/></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;