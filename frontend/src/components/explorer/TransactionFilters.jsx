const TransactionFilters = ({ filters, setFilters, clearFilters }) => {
    const handleChange = (e) => {
      setFilters({ ...filters, [e.target.name]: e.target.value });
    };
  
    return (
      <div style={{background:'white', padding:'20px', borderRadius:'12px', boxShadow:'0 2px 4px rgba(0,0,0,0.05)', marginBottom:'20px'}}>
        <div style={{display:'flex', gap:'15px', flexWrap:'wrap', marginBottom:'15px'}}>
          <input name="search" type="text" placeholder="Search transactions..." value={filters.search} onChange={handleChange} className="search-input" style={{flex:3, padding:'10px', borderRadius:'6px', border:'1px solid #d1d5db'}}/>
          <select name="category" value={filters.category} onChange={handleChange} className="search-input" style={{flex:1, padding:'10px', borderRadius:'6px', border:'1px solid #d1d5db'}}>
              <option value="All">All Categories</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
          </select>
          <button onClick={clearFilters} style={{padding:'10px 20px', background:'#f3f4f6', color:'#374151', border:'none', borderRadius:'6px', cursor:'pointer', fontWeight:'500'}}>Clear</button>
        </div>
        
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'20px'}}>
            <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                <span style={{fontSize:'0.9rem', fontWeight:'500', color:'#4b5563'}}>Date:</span>
                <input name="startDate" type="date" value={filters.startDate} onChange={handleChange} style={{padding:'8px', borderRadius:'5px', border:'1px solid #d1d5db'}}/>
                <span style={{color:'#9ca3af'}}>-</span>
                <input name="endDate" type="date" value={filters.endDate} onChange={handleChange} style={{padding:'8px', borderRadius:'5px', border:'1px solid #d1d5db'}}/>
            </div>
            
            <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                <span style={{fontSize:'0.9rem', fontWeight:'500', color:'#4b5563'}}>Amount:</span>
                <input name="minAmount" type="number" placeholder="Min ₹" value={filters.minAmount} onChange={handleChange} style={{width:'100px', padding:'8px', borderRadius:'5px', border:'1px solid #d1d5db'}}/>
                <span style={{color:'#9ca3af'}}>-</span>
                <input name="maxAmount" type="number" placeholder="Max ₹" value={filters.maxAmount} onChange={handleChange} style={{width:'100px', padding:'8px', borderRadius:'5px', border:'1px solid #d1d5db'}}/>
            </div>
        </div>
      </div>
    );
  };
  
  export default TransactionFilters;