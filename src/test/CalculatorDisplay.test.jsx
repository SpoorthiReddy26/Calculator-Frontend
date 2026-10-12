import { render, screen } from '@testing-library/react';
import CalculatorDisplay from '../components/CalculatorDisplay';

describe('CalculatorDisplay', () => {
  it('shows the provided value and default zero', () => {
    const { rerender } = render(<CalculatorDisplay value="12+5" />);
    expect(screen.getByLabelText(/calculator display/i)).toHaveTextContent('12+5');

    rerender(<CalculatorDisplay value="" />);
    expect(screen.getByLabelText(/calculator display/i)).toHaveTextContent('0');
  });
});
