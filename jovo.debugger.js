const { DebuggerConfig } = require('@jovotech/plugin-debugger');

const debuggerConfig = new DebuggerConfig({
  locales: ['de','en'],
  buttons: [
    {
      label: 'LAUNCH',
      input: {
        type: 'LAUNCH',
      },
    },
    {
      label: 'Ja',
      input: {
        intent: 'YesIntent',
      },
    },
    {
      label: 'Vielleicht',
      input: {
        intent: 'NotSureIntent',
      },
    },
    {
      label: 'Nein',
      input: {
        intent: 'NoIntent',
      },
    },
    // ...
  ],
});

module.exports = debuggerConfig;
