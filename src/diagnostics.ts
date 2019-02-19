/**
 * Copied and adapted from @stencil/sass
 * https://github.com/ionic-team/stencil-sass
 */
import * as d from './declarations';


export function loadDiagnostic(context: d.PluginCtx, svgError: any, filePath: string) {
  if (!svgError || !context) {
    return;
  }

  const diagnostic: d.Diagnostic = {
    level: 'error',
    type: 'inline-svg',
    language: 'scss',
    header: 'inline-svg error',
    code: svgError.status && svgError.status.toString(),
    relFilePath: null,
    absFilePath: null,
    messageText: svgError.message,
    lines: []
  };

  if (filePath) {
    diagnostic.absFilePath = filePath;
    diagnostic.relFilePath = formatFileName(context.config.rootDir, diagnostic.absFilePath);
    diagnostic.header = formatHeader('sass', diagnostic.absFilePath, context.config.rootDir, svgError.line);

    if (svgError.line > -1) {
      try {
        const sourceText = context.fs.readFileSync(diagnostic.absFilePath);
        const srcLines = sourceText.split(/(\r?\n)/);

        const errorLine: d.PrintLine = {
          lineIndex: svgError.line - 1,
          lineNumber: svgError.line,
          text: srcLines[svgError.line - 1],
          errorCharStart: svgError.column,
          errorLength: 0
        };

        for (let i = errorLine.errorCharStart; i >= 0; i--) {
          if (STOP_CHARS.indexOf(errorLine.text.charAt(i)) > -1) {
            break;
          }
          errorLine.errorCharStart = i;
        }

        for (let j = errorLine.errorCharStart; j <= errorLine.text.length; j++) {
          if (STOP_CHARS.indexOf(errorLine.text.charAt(j)) > -1) {
            break;
          }
          errorLine.errorLength++;
        }

        if (errorLine.errorLength === 0 && errorLine.errorCharStart > 0) {
          errorLine.errorLength = 1;
          errorLine.errorCharStart--;
        }

        diagnostic.lines.push(errorLine);

        if (errorLine.lineIndex > 0) {
          const previousLine: d.PrintLine = {
            lineIndex: errorLine.lineIndex - 1,
            lineNumber: errorLine.lineNumber - 1,
            text: srcLines[errorLine.lineIndex - 1],
            errorCharStart: -1,
            errorLength: -1
          };

          diagnostic.lines.unshift(previousLine);
        }

        if (errorLine.lineIndex + 1 < srcLines.length) {
          const nextLine: d.PrintLine = {
            lineIndex: errorLine.lineIndex + 1,
            lineNumber: errorLine.lineNumber + 1,
            text: srcLines[errorLine.lineIndex + 1],
            errorCharStart: -1,
            errorLength: -1
          };

          diagnostic.lines.push(nextLine);
        }

      } catch (e) {
        console.error(`InlineSVGPlugin loadDiagnostic, ${e}`);
      }
    }

  }

  context.diagnostics.push(diagnostic);
}


function formatFileName(rootDir: string, fileName: string) {
  if (!rootDir || !fileName) return '';

  fileName = fileName.replace(rootDir, '');
  if (/\/|\\/.test(fileName.charAt(0))) {
    fileName = fileName.substr(1);
  }
  if (fileName.length > 80) {
    fileName = '...' + fileName.substr(fileName.length - 80);
  }
  return fileName;
}


function formatHeader(type: string, fileName: string, rootDir: string, startLineNumber: number = null, endLineNumber: number = null) {
  let header = `${type}: ${formatFileName(rootDir, fileName)}`;

  if (startLineNumber !== null && startLineNumber > 0) {
    if (endLineNumber !== null && endLineNumber > startLineNumber) {
      header += `, lines: ${startLineNumber} - ${endLineNumber}`;
    } else {
      header += `, line: ${startLineNumber}`;
    }
  }

  return header;
}


const STOP_CHARS = ['', '\n', '\r', '\t', ' ', ':', ';', ',', '{', '}', '.', '#', '@', '!', '[', ']', '(', ')', '&', '+', '~', '^', '*', '$'];
