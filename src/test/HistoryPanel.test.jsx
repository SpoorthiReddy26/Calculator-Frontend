import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HistoryPanel from '../components/HistoryPanel';

describe('HistoryPanel', () => {
  it('renders empty state when history is empty', () => {
    render(<HistoryPanel history={[]} onRefresh={vi.fn()} onClear={vi.fn()} />);
    expect(screen.getByText(/no calculations saved yet/i)).toBeInTheDocument();
  });

  it('renders saved items and triggers actions', async () => {
    const user = userEvent.setup();
    const onRefresh = vi.fn();
    const onClear = vi.fn();

    render(
      <HistoryPanel
        history={[{ id: 1, expression: '2+2', result: '4', createdAt: '2024-01-01T00:00:00Z' }]}
        onRefresh={onRefresh}
        onClear={onClear}
      />
    );

    await user.click(screen.getByRole('button', { name: /refresh/i }));
    await user.click(screen.getByRole('button', { name: /clear/i }));

    expect(onRefresh).toHaveBeenCalledTimes(1);
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
