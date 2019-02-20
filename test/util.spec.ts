import { usePlugin } from '../src/util';

describe('utils', () => {
  it('should use the plugin for an svg file', () => {
    expect(usePlugin('file.svg')).toBeTruthy();
  });

  it('should NOT use the plugin for a png file', () => {
    expect(usePlugin('file.png')).toBeFalsy();
  });
});
