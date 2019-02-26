/**
 * Copied and adapted from @stencil/sass
 * https://github.com/ionic-team/stencil-sass
 */

export interface PluginOptions {
  include?: string;
  exclude?: string;
  data?: any;
}

export interface PluginTransformResults {
  code?: string;
  id?: string;
}

export interface PluginCtx {
  config: {
    rootDir?: string;
    srcDir?: string;
  };
  fs: any;
  diagnostics: Diagnostic[];
}

export interface Diagnostic {
  level: 'error' | 'warn' | 'info' | 'log' | 'debug';
  type:
    | 'typescript'
    | 'bundling'
    | 'build'
    | 'runtime'
    | 'hydrate'
    | 'css'
    | 'inline-svg';
  header?: string;
  language?: string;
  messageText: string;
  code?: string;
  absFilePath?: string;
  relFilePath?: string;
  lineNumber?: number;
  columnNumber?: number;
  lines?: PrintLine[];
}

export interface PrintLine {
  lineIndex: number;
  lineNumber: number;
  text?: string;
  errorCharStart: number;
  errorLength?: number;
}

export interface PluginTransformer {
  name: string;
  transform: (
    sourceText: string,
    fileName: string,
  ) => Promise<PluginTransformResults>;
}
