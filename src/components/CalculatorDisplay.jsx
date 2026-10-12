function CalculatorDisplay({ value }) {
  return (
    <div className="calculator-display" aria-live="polite" aria-label="Calculator display">
      {value || '0'}
    </div>
  );
}

export default CalculatorDisplay;
