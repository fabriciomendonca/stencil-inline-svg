import { PluginTransformer } from '../src/declarations';
import { inlineSvg } from '../src';

jest.mock('svg-to-jsx', () => ({ default: (content: string, cb: (err: Error, jsx: string) => void) => {
  if (content === '') {
    cb(new Error('empty-content'), null);
  } else {
    cb(null, content);
  }
}}));
describe('Inline SVG Stencil Plugin', () => {
  let transformer: PluginTransformer;
  beforeEach(() => {
    transformer = inlineSvg();
  });

  it('should create a transformer object', () => {
    expect(transformer).toBeDefined();
    expect(transformer.name).toBe('inlineSvg');
  });

  it('should ignore file that is not an svg', async () => {
    const response = await transformer.transform('Content', 'file.png');

    expect(response).toBeNull();
  });

  it('should return an error ', async () => {
    let error;
    try {
      await transformer.transform('', 'file.svg');
    } catch (err) {
      error = err;
    }

    expect(error.message).toBe('empty-content');
  });

  it('should transform an svg file', async () => {
    const response = await transformer.transform('Content', 'file.svg');

    expect(response).toEqual({
      code: 'export default `Content`',
      id: 'file.svg'
    });
  });
});
