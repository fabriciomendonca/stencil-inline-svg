import { svg } from '../src';

describe('Inline SVG Stencil Plugin', () => {
  it('sanity check', () => {
    expect(svg).toBeDefined();
    expect(svg()).toBeNull();
  });
});
