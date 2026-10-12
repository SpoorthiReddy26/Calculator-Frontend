function CalculatorButton({ label, value, onClick, variant = 'normal' }) {
  return (
    <button
      type="button"
      className={`calculator-button ${variant}`}
      value={value}
      onClick={() => onClick(value)}
      aria-label={label}
    >
      {label}
    </button>
  );
}

export default CalculatorButton;
