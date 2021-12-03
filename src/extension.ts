// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as transformEditor from './JsonTransformEditor';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    console.log('json-transform-vscode: activated');

	// The command has been defined in the package.json file
	let disposable = vscode.commands.registerCommand('json-transform-vscode.transform', () => {
		transformEditor.transform();
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {

	console.log('json-transform-vscode: deactivated');
}
