import axios from 'axios';
import { calculateExpression, fetchHistory, clearHistory } from '../services/calculatorApi';

const { mockApi } = vi.hoisted(() => ({
  mockApi: {
    post: vi.fn(),
    get: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => mockApi),
  },
}));

describe('calculatorApi', () => {
  beforeEach(() => {
    mockApi.post.mockReset();
    mockApi.get.mockReset();
    mockApi.delete.mockReset();
  });

  it('returns calculation result on success', async () => {
    mockApi.post.mockResolvedValue({ data: { id: 1, expression: '2+2', result: '4' } });

    const result = await calculateExpression('2+2');
    expect(result.result).toBe('4');
  });

  it('throws on API failure for fetchHistory', async () => {
    mockApi.get.mockRejectedValue({ response: { data: { message: 'Server unavailable' } } });

    await expect(fetchHistory()).rejects.toThrow('Server unavailable');
  });

  it('clears history', async () => {
    mockApi.delete.mockResolvedValue({});

    await expect(clearHistory()).resolves.toBeUndefined();
  });
});
