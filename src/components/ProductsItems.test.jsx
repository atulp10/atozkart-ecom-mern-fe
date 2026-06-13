import { describe, expect, it } from 'vitest';
import ReactPaginate from '../utils/reactPaginate';

describe('products pagination', () => {
  it('resolves react-paginate to a renderable component', () => {
    expect(typeof ReactPaginate).toBe('function');
  });
});
