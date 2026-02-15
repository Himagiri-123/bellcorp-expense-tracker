import { FaTimes } from 'react-icons/fa';
import { formatCurrency, formatDate } from '../utils/formatData';

const Modal = ({ transaction, onClose }) => {
  if (!transaction) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{margin:0, color:'#4f46e5'}}>Transaction Details</h3>
          <button className="modal-close-btn" onClick={onClose}><FaTimes /></button>
        </div>
        <div style={{fontSize: '1.1rem'}}>
            <p><strong>Title:</strong> {transaction.title}</p>
            <p><strong>Amount:</strong> <span style={{color:'red', fontWeight:'bold'}}>{formatCurrency(transaction.amount)}</span></p>
            <p><strong>Category:</strong> <span style={{background:'#e0e7ff', color:'#4f46e5', padding:'2px 8px', borderRadius:'4px', fontSize:'0.9rem'}}>{transaction.category}</span></p>
            <p><strong>Date:</strong> {formatDate(transaction.date)}</p>
            <div style={{marginTop:'15px', background:'#f9fafb', padding:'10px', borderRadius:'6px', border:'1px solid #e5e7eb'}}>
                <small style={{display:'block', marginBottom:'5px', color:'#6b7280'}}>Notes:</small>
                {transaction.notes || "No notes provided."}
            </div>
        </div>
        <div style={{marginTop:'20px', textAlign:'right'}}>
           <button onClick={onClose} style={{padding:'8px 20px', background:'#374151', color:'white', border:'none', borderRadius:'6px', cursor:'pointer'}}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;