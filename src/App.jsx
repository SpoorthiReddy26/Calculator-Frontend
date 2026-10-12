import { useMemo, useState } from 'react';
import Calculator from './components/Calculator';
import HistoryPanel from './components/HistoryPanel';
import { calculateExpression, fetchHistory, clearHistory } from './services/calculatorApi';
import './styles/global.css';

const defaultTheme = 'light';

function App() {
  const [theme, setTheme] = useState(defaultTheme);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const refreshHistory = async () => {
    try {
      const records = await fetchHistory();
      setHistory(records);
    } catch (err) {
      setError(err.message || 'Could not load history.');
    }
  };

  const handleCalculate = async (expression) => {
    setLoading(true);
    setError('');
    try {
      const result = await calculateExpression(expression);
      await refreshHistory();
      return result;
    } catch (err) {
      setError(err.message || 'Calculation failed.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = async () => {
    try {
      await clearHistory();
      setHistory([]);
      setError('');
    } catch (err) {
      setError(err.message || 'Could not clear history.');
    }
  };

  const appClassName = useMemo(() => `app ${theme}`, [theme]);

  return (
    <div className={appClassName}>
      <div className="topbar">
        <h1>CalcFlow</h1>
        <button
          type="button"
          className="theme-toggle"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? 'Dark' : 'Light'} mode
        </button>
      </div>

      <div className="layout">
        <Calculator onCalculate={handleCalculate} loading={loading} error={error} onError={setError} />
        <HistoryPanel history={history} loading={loading} error={error} onRefresh={refreshHistory} onClear={handleClearHistory} />
      </div>
    </div>
  );
}

export default App;
