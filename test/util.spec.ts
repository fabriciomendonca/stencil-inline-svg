import { decodeBase64SourceText, usePlugin } from '../src/util';

describe('utils', () => {
  it('should use the plugin for an svg file', () => {
    expect(usePlugin('file.svg')).toBeTruthy();
  });

  it('should NOT use the plugin for a png file', () => {
    expect(usePlugin('file.png')).toBeFalsy();
  });

  it('should decode a base64 rollup imagePlugin export string', () => {
    const encoded = new Buffer('this is the base64 code').toString('base64');
    const exportStr = `const img = 'data:image/svg+xml;base64,${encoded}'; export default img`;

    expect(decodeBase64SourceText(exportStr)).toBe('this is the base64 code');
  });

  it('should return false if the string is not a rollup imagePlugin export return value', () => {
    expect(
      decodeBase64SourceText('this is not a decoded base64 string'),
    ).toBeFalsy();
  });
});
