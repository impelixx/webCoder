import React, { useEffect } from 'react';
import { Editor, useMonaco } from '@monaco-editor/react';

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
  fontSize?: number;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange, fontSize }) => {
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.languages.registerCompletionItemProvider('python', {
        provideCompletionItems: (model, position) => {
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };

          const suggestions = [
            {
              label: 'def',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'def ',
              range: range,
            },
            {
              label: 'int',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'int ',
              range: range,
            },
            {
              label: 'float',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'float ',
              range: range,
            },
            {
              label: 'bool',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'bool ',
              range: range,
            },
            {
              label: 'string',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'string ',
              range: range,
            },
            // Функции
            {
              label: 'print',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'print(${1})',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
            },
            {
              label: 'len',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'len(${1:object})',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
            },
            {
              label: 'range',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'range(${1})',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
            },
            {
              label: 'sum',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'sum(${1:iterable})',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
            },
            {
              label: 'max',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'max(${1:iterable})',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
            },
            {
              label: 'min',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'min(${1:iterable})',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
            },
            {
              label: 'abs',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'abs(${1:number})',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
            },
            {
              label: 'any',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'any(${1:iterable})',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
            },
            {
              label: 'if',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'if ${1:condition}:\n\t${2:pass}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
            },
            {
              label: 'for',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'for ${1:item} in ${2:iterable}:\n\t${3:pass}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
            },
            {
              label: 'while',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'while ${1:condition}:\n\t${2:pass}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range,
            },
          ];

          const textUntilPosition = model.getValueInRange({
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column,
          });
          const variableRegex = /\b(?:int|float|bool|string)\s+(\w+)/g;
          const variables = new Set<string>();
          let match;
          const functionRegex = /\b(?:def|class)\s+(\w+)/g;
          const functions = new Set<string>();

          while ((match = variableRegex.exec(textUntilPosition)) !== null) {
            variables.add(match[1]);
          }
          while ((match = functionRegex.exec(textUntilPosition)) !== null) {
            functions.add(match[1]);
          }

          variables.forEach((variable) => {
            suggestions.push({
              label: variable,
              kind: monaco.languages.CompletionItemKind.Variable,
              insertText: variable,
              range: range,
            });
          });
          functions.forEach((func) => {
            suggestions.push({
              label: func,
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: `${func}()`,
              range: range,
            });
          });

          return { suggestions: suggestions };
        },
      });
    }
  }, [monaco]);

  return (
    <Editor
      height="100%"
      width="100%"
      defaultValue={initialValue}
      defaultLanguage="python"
      theme="vs-dark"
      onChange={(value) => onChange(value || '')}
      options={{
        automaticLayout: true,
        fontSize: fontSize,
      }}
    />
  );
};

export default CodeEditor;