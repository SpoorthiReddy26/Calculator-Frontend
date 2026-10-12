function HistoryPanel({ history = [], loading = false, error, onRefresh, onClear }) {
  return (
    <aside className="history-panel" aria-label="Calculation history panel">
      <div className="history-header">
        <h2>History</h2>
        <button type="button" onClick={onRefresh}>Refresh</button>
        <button type="button" onClick={onClear}>Clear</button>
      </div>

      {loading ? <div className="loading-indicator">Loading history...</div> : null}
      {error ? <div className="error-banner">{error}</div> : null}

      {history.length === 0 ? (
        <p className="empty-history">No calculations saved yet.</p>
      ) : (
        <ul className="history-list">
          {history.map((item) => (
            <li key={item.id} className="history-item">
              <div className="history-expression">{item.expression}</div>
              <div className="history-result">{item.result}</div>
              <div className="history-time">{new Date(item.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export default HistoryPanel;
