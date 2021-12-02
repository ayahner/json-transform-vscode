// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import * as panel from './OutputPanel';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    console.log('json-transform-vscode: extension "json-transform-vscode" is now active');

	// The command has been defined in the package.json file
	let disposable = vscode.commands.registerCommand('json-transform-vscode.transform', () => {
		vscode.window.showWarningMessage('No transformation service registered');
	});
	let openOutputPanel = vscode.commands.registerCommand('json-transform-vscode.openPanel', () => {
		panel.openPanel();
	});
	let closeOutputPanel = vscode.commands.registerCommand('json-transform-vscode.closePanel', () => {
		panel.closePanel();
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {

	console.log('json-transform-vscode: extension "json-transform-vscode" is now deactivated');
}
