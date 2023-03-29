import * as vscode from 'vscode';

import JsonCommandService from "./services/jsonCommandService";
import OutputChannelResultViewer from "./ui/outputChannelResultViewer";
import { ErrorUtils } from "./utils/errorUtils";
import { Constants } from "./utils/constants";

export function activate(context: vscode.ExtensionContext) {
    console.log('json-transform-vscode: activated');

	const outputChannel = new OutputChannelResultViewer(Constants.OUTPUT_CHANNEL);
	const jsonCommandService = new JsonCommandService(context, outputChannel);

	// The command has been defined in the package.json file
	context.subscriptions.push(vscode.commands.registerTextEditorCommand('json-transform-vscode.execute', () => {
		try {
			jsonCommandService.execute();
		} catch (e) {
			vscode.window.showErrorMessage(`${ErrorUtils.getErrorMessage(e)}`);
		}
		})
	);
	context.subscriptions.push(outputChannel);
	context.subscriptions.push(jsonCommandService);
}

export function deactivate() {
	console.log('json-transform-vscode: deactivated');
}
