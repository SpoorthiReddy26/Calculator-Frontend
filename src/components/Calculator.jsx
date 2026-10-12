import { useEffect, useMemo, useState } from 'react';
import CalculatorButton from './CalculatorButton';
import CalculatorDisplay from './CalculatorDisplay';

const buttonLayout = [
  ['7', '8', '9', '/', 'C'],
  ['4', '5', '6', '*', '⌫'],
  ['1', '2', '3', '-', '('],
  ['0', '.', '%', '+', ')'],
  ['√', '^', '±', '='],
];

function Calculator({ onCalculate, loading, error, onError }) {
  const [expression, setExpression] = useState('');

  const handleButtonClick = (value) => {
    if (value === 'C') {
      setExpression('');
      onError('');
      return;
    }

    if (value === '⌫') {
      setExpression((prev) => prev.slice(0, -1));
      return;
    }

    if (value === '=') {
      if (!expression.trim()) {
        onError('Enter an expression first.');
        return;
      }

      onCalculate(expression).then((result) => {
        setExpression(String(result.result));
      }).catch(() => {
        setExpression('');
      });
      return;
    }

    if (value === '±') {
      setExpression((prev) => {
        const next = prev.startsWith('-') ? prev.slice(1) : `-${prev}`;
        return next || '-';
      });
      return;
    }

    if (value === '√') {
      setExpression((prev) => `${prev}sqrt(`);
      return;
    }

    if (value === '^') {
      setExpression((prev) => `${prev}^`);
      return;
    }

    setExpression((prev) => `${prev}${value}`);
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      const keys = /[0-9+\-*/.()%^]/;
      if (keys.test(event.key) || event.key === 'Enter' || event.key === 'Backspace' || event.key === 'Delete') {
        event.preventDefault();
      }

      if (event.key === 'Enter') {
        handleButtonClick('=');
        return;
      }

      if (event.key === 'Backspace' || event.key === 'Delete') {
        handleButtonClick('⌫');
        return;
      }

      if (event.key === 'Escape') {
        handleButtonClick('C');
        return;
      }

      if (keys.test(event.key)) {
        handleButtonClick(event.key);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [expression]);

  const displayValue = useMemo(() => expression || '0', [expression]);

  return (
    <section className="calculator-panel">
      <CalculatorDisplay value={displayValue} />
      {error ? <div className="error-banner" role="alert">{error}</div> : null}
      <div className="keypad" aria-label="Calculator keypad">
        {buttonLayout.flat().map((button) => (
          <CalculatorButton
            key={button}
            label={button}
            value={button}
            onClick={handleButtonClick}
            variant={['C', '⌫', '=', '+', '-', '*', '/', '^'].includes(button) ? 'operator' : 'normal'}
          />
        ))}
      </div>
      {loading ? <div className="loading-indicator">Calculating...</div> : null}
    </section>
  );
}

export default Calculator;
