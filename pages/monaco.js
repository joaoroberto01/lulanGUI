require.config({ paths: { vs: '../node_modules/monaco-editor/min/vs' } });

require(['vs/editor/editor.main'], function () {
monaco.languages.register({ id: "lulang" });


  monaco.languages.setMonarchTokensProvider("lulang", {
    keywords: [
      'programa', 'var', 'se', 'entao', 'senao', 'enquanto', 'faca', 'inicio', 'fim', 'fim;', 'fim.',
      'funcao', 'procedimento'
    ],

    functions: [
      'leia', 'escreva'
    ],

    namedOperators: ["div", "e", "ou", "nao"],

    operators: ["+", "-", "*", ">", ">=", "<", "<=", "=", "!="],

    booleans: ['verdadeiro', 'falso'],

    typeKeywords: [
      'booleano', 'inteiro'
    ],

    tokenizer: {
    root: [
      // identifiers and keywords
      [/[a-z_$][\w$]*/, { cases: { '@typeKeywords': 'tipo',
                                   '@functions': 'comandos',
                                   '@booleans': 'valor',
                                   '@namedOperators': 'operador',
                                   '@keywords': 'reservado',
                                   '@default': 'identificador' } }],
      [/(\+|\-|\*|div|>=?|<=?|=|!=)/, 'operador'],
      [/(:=)/, 'atribuicao'],
      [/\d+/, 'valor'],
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
      { token: "operador", foreground: "FC6A5D" },
      { token: "atribuicao", foreground: "FD8F3F" },
      { token: "comandos", foreground: "5DD8FF" },
//      { token: "comandos", foreground: "B282EB" },
      { token: "tipo", foreground: "b99ddb" },
      { token: "funcao", foreground: "47a6c3" },
      { token: "valor", foreground: "d4c277" },
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
          label: "programa",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            "programa ${0:nomeprograma};",
            "${1:variaveis}",
            "inicio",
            "\t$2",
            "fim."
          ].join("\n"),
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Exemplo de programa",
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
        {
          label: "enquanto",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            "enquanto ${1:condição} faca",
            "inicio",
            "\t$0",
            "fim;"
          ].join("\n"),
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule
              .InsertAsSnippet,
          documentation: "Comando \"enquanto\"",
          range: range,
        },
      ];
      return { suggestions: suggestions };
    },
  });

  onEditorReady();
});

