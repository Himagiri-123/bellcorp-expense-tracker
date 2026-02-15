const SummaryCard = ({ title, amount, color }) => {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <p className="amount" style={{ color: color }}>{amount}</p>
    </div>
  );
};

export default SummaryCard;