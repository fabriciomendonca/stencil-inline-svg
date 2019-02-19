import svgtojsx from 'svg-to-jsx';
import { PluginTransformResults } from './declarations';
import * as util from './util';

export function inlineSvg() {
  return {
    name: 'svg',
    transform(sourceText: string, fileName: string): Promise<PluginTransformResults> {
      if (!util.usePlugin(fileName)) {
        return null;
      }

      return new Promise<PluginTransformResults>(resolve => {
        svgtojsx(sourceText, (err, jsx) => {
          if (err) {
            resolve({
              id: fileName,
              code: '',
            });
            return;
          }

          resolve({
            id: fileName,
            code: `export default \`${jsx}\``,
          });
        });
      });
    }
  };
}
