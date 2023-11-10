require.config({ paths: { vs: '../node_modules/monaco-editor/min/vs' } });

require(['vs/editor/editor.main'], function () {
monaco.languages.register({ id: "lulang" });

  monaco.languages.setMonarchTokensProvider("lulang", {
    keywords: [
      'var', 'se', 'entao', 'funcao', 'procedimento'
    ],

    typeKeywords: [
      'booleano', 'inteiro'
    ],

    tokenizer: {
    root: [
      // identifiers and keywords
      [/[a-z_$][\w$]*/, { cases: { '@typeKeywords': 'tipo',
                                   '@keywords': 'reservado',
                                   '@default': 'identificador' } }],
      [/[A-Z][\w\$]*/, 'type.identifier' ],  // to show class names nicely

      [/\d+/, 'numero'],
      [/{/, 'comentario', '@comment'],
    ],

    comment: [
      [/}/, 'comentario', '@pop'], [/./, 'comentario.content']
    ],

    whitespace: [
      [/[ \t\r\n]+/, 'white'],
    ],
  },
  });

  monaco.editor.defineTheme("lulang-ptheme", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "reservado", foreground: "fe70a6" },
      { token: "keyword", foreground: "fe70a6" },
      { token: "tipo", foreground: "b99ddb" },
      { token: "funcao", foreground: "47a6c3" },
      { token: "numero", foreground: "d4c277" },
       { token: "comentario", foreground: "73808b", fontStyle: "bold" },
      // { token: "comentario", foreground: "ff0000", fontStyle: "bold" },
      //{ token: "comment", foreground: "00cc00", fontStyle: "bold" },
    ],
    colors: {},
  });

  monaco.languages.registerCompletionItemProvider("lulang", {
    provideCompletionItems: (model, position) => {
      var word = model.getWordUntilPosition(position);
      var range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      var suggestions = [
        {
          label: "programa",
          kind: monaco.languages.CompletionItemKind.Text,
          insertText: "programa",
          range: range,
        },
        {
          label: "var",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "var ${1:nome}: ${2:inteiro|booleano};",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule
              .InsertAsSnippet,
          range: range,
        },
        {
          label: "se",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            "se ${1:condição} entao",
            "\t$0"
          ].join("\n"),
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule
              .InsertAsSnippet,
          documentation: "Comando \"se\"",
          range: range,
        },
      ];
      return { suggestions: suggestions };
    },
  });

  onEditorReady(monaco.editor);
});

