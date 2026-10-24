// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "lab-3-code-helper" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('lab-3-code-helper.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello, World! Никита');
	});
const helloButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
helloButton.text = '$(sparkle) Hello';
helloButton.tooltip = 'Нажми, чтобы показать приветствие';
helloButton.command = 'lab-3-code-helper.helloWorld';
helloButton.show();
const lineStatsCommand = vscode.commands.registerCommand(
  'lab-3-code-helper.lineStats',
  function () {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      vscode.window.showInformationMessage('Сначала открой файл в редакторе.');
      return;
    }

    const lines = editor.document.getText().split('\n');
    let blankLines = 0;
    let commentLines = 0;
    let codeLines = 0;

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed === '') {
        blankLines++;
      } else if (
        trimmed.startsWith('//') ||
        trimmed.startsWith('#') ||
        trimmed.startsWith('--') ||
        trimmed.startsWith('/*') ||
        trimmed.startsWith('* ')
      ) {
        commentLines++;
      } else {
        codeLines++;
      }
    }

    vscode.window.showInformationMessage(
      'Код: ' + codeLines +
      ', комментарии: ' + commentLines +
      ', пустые строки: ' + blankLines
    );
  }
);
	context.subscriptions.push(disposable, helloButton, lineStatsCommand);
}
// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
