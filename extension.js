// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// Cannot use import statement outside a module.
const { MaculaSidePanel } = require("./maculaSidePanel.js");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
* @param {vscode.ExtensionContext} context
*/
function activate(context) {
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "macula-side-panel",
      new MaculaSidePanel(context.extensionUri),
      {webviewOptions: {retainContextWhenHidden: true}}
    )
  );
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate
}
