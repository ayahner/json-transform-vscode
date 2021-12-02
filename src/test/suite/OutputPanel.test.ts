import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as panel from '../../OutputPanel';

suite('OutputPanel Test Suite', () => {
	vscode.window.showInformationMessage('Start all OutputPanel tests.');

	test('OutputPanel test', () => {
		panel.openPanel();
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
		panel.closePanel();
	});
});
