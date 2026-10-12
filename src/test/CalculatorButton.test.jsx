import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CalculatorButton from '../components/CalculatorButton';

describe('CalculatorButton', () => {
  it('calls the handler with its value', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<CalculatorButton label="7" value="7" onClick={onClick} />);

    await user.click(screen.getByRole('button', { name: '7' }));
    expect(onClick).toHaveBeenCalledWith('7');
  });
});
