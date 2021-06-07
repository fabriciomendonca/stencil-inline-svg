// import svgtojsx from 'svg-to-jsx';
import { PluginTransformResults, PluginTransformer } from './declarations';
import * as util from './util';

export function inlineSvg(): PluginTransformer {
  return {
    name: 'inlineSvg',
    transform(
      sourceText: string,
      fileName: string,
    ): Promise<PluginTransformResults> {
      if (!util.usePlugin(fileName)) {
        return null;
      }

      if (sourceText === '') {
        throw new Error('/** inlineSvg error: the SVG file is empty **/');
      }

      return new Promise<PluginTransformResults>((resolve) => {
        const svgCode = util.decodeBase64SourceText(sourceText) || sourceText;
        resolve({
          id: fileName,
          code: `export default \`${svgCode}\``,
        });
      });
    },
  };
}
