import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Calculator from '../components/Calculator';

describe('Calculator', () => {
  it('renders calculator display and buttons', () => {
    render(<Calculator onCalculate={vi.fn()} loading={false} error="" onError={vi.fn()} />);
    expect(screen.getByLabelText(/calculator display/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '7' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'C' })).toBeInTheDocument();
  });

  it('updates display when user clicks digits', async () => {
    const user = userEvent.setup();
    render(<Calculator onCalculate={vi.fn()} loading={false} error="" onError={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: '1' }));
    await user.click(screen.getByRole('button', { name: '+' }));
    await user.click(screen.getByRole('button', { name: '2' }));

    expect(screen.getByLabelText(/calculator display/i)).toHaveTextContent('1+2');
  });

  it('clears expression when clear is pressed', async () => {
    const user = userEvent.setup();
    render(<Calculator onCalculate={vi.fn()} loading={false} error="" onError={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: '1' }));
    await user.click(screen.getByRole('button', { name: 'C' }));

    expect(screen.getByLabelText(/calculator display/i)).toHaveTextContent('0');
  });
});
