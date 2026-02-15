const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (totalPages <= 1) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '5px' }}>
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        className="page-btn"
      >
        Prev
      </button>
      
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`page-btn ${currentPage === number ? 'active' : ''}`}
        >
          {number}
        </button>
      ))}

      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className="page-btn"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;