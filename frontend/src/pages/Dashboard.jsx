import { useEffect } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { formatCurrency, formatDate } from '../utils/formatData';
import ExpenseChart from '../components/dashboard/ExpenseChart';
import SummaryCard from '../components/dashboard/SummaryCard';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { 
    recentTransactions, summaryData, totalRecords, fetchSummary, fetchRecentTransactions 
  } = useTransactions();

  useEffect(() => {
    fetchSummary();
    fetchRecentTransactions();
  }, []); 

  const chartTransactions = summaryData.chartData.map(item => ({
      category: item.name,
      amount: item.value
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919'];

  return (
    <div className="dashboard-container">
      <h2 style={{marginBottom:'20px', color:'#374151'}}>Dashboard Overview</h2>

      <div className="stats-grid">
        <SummaryCard title="Total Expenses" amount={formatCurrency(summaryData.totalExpenses)} color="#ef4444" />
        <div className="stat-card">
            <h3>Total Transactions</h3>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end'}}>
                <p className="amount" style={{color: '#4f46e5', margin:0}}>{totalRecords}</p>
                <Link to="/transactions" className="btn-click-effect" style={{textDecoration:'none', padding:'8px 16px', background:'#e0e7ff', color:'#4f46e5', borderRadius:'5px', fontWeight:'500', fontSize:'0.9rem'}}>
                   View History &rarr;
                </Link>
            </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        <div style={{ flex: '1', minWidth: '350px', background:'white', padding:'20px', borderRadius:'12px', boxShadow:'0 4px 6px -1px rgba(0,0,0,0.1)' }}>
             <h3 style={{marginBottom:'15px', color:'#6b7280'}}>Expense Analysis</h3>
             <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                <div style={{flex:1}}>
                    <ExpenseChart transactions={chartTransactions} />
                </div>
                <div style={{flex:1, fontSize:'0.9rem'}}>
                    {summaryData.chartData.map((item, index) => (
                        <div key={index} style={{display:'flex', justifyContent:'space-between', marginBottom:'8px', borderBottom:'1px dashed #e5e7eb', paddingBottom:'4px'}}>
                            <span style={{display:'flex', alignItems:'center', gap:'8px'}}>
                                <span style={{width:'10px', height:'10px', borderRadius:'50%', background: COLORS[index % COLORS.length]}}></span>
                                {item.name}
                            </span>
                            <span style={{fontWeight:'bold'}}>{formatCurrency(item.value)}</span>
                        </div>
                    ))}
                    {summaryData.chartData.length === 0 && <p style={{color:'#9ca3af', textAlign:'center'}}>No data yet.</p>}
                </div>
             </div>
        </div>

        <div style={{ flex: '1', minWidth: '350px' }}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'15px'}}>
                <h3 style={{margin:0, color:'#6b7280'}}>Recent Activity</h3>
                <Link to="/transactions" style={{fontSize:'0.9rem', color:'#4f46e5', textDecoration:'none'}}>View All</Link>
            </div>
            
            <div className="transaction-list" style={{background:'white', borderRadius:'12px', boxShadow:'0 4px 6px -1px rgba(0,0,0,0.1)', overflow:'hidden'}}>
                {recentTransactions.length > 0 ? (
                    recentTransactions.map((t, index) => (
                        <div key={t._id} className="transaction-item" 
                             style={{
                                 display: 'flex', 
                                 justifyContent: 'space-between', 
                                 alignItems: 'center', 
                                 padding: '12px 20px',
                                 borderBottom: index !== recentTransactions.length - 1 ? '1px solid #f3f4f6' : 'none',
                                 transition: 'background 0.2s'
                             }}
                             onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                             onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                        >
                            <div style={{flex: 1}}>
                                <h4 style={{margin: '0 0 4px 0', fontSize:'0.95rem'}}>{t.title}</h4>
                                <div style={{fontSize: '0.8rem', color: '#6b7280'}}>
                                    {formatDate(t.date)} • {t.category}
                                </div>
                            </div>
                            <span style={{fontWeight:'bold', color: '#374151'}}>{formatCurrency(t.amount)}</span>
                        </div>
                    ))
                ) : (
                    <div style={{textAlign:'center', padding:'30px', color:'#9ca3af'}}>
                        <p>No recent transactions.</p>
                        <Link to="/transactions" style={{color:'#4f46e5', fontSize:'0.9rem'}}>Add First Transaction</Link>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;