import * as vscode from 'vscode';
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import * as jmespath from 'jmespath';
import exp = require('constants');

let tmpFilePath = path.join(os.tmpdir(), 'json-transform-vscode.json');
let tmpFileUri = vscode.Uri.file(tmpFilePath);
console.log(`json-transform-vscode: tmp file Path: ${tmpFileUri.fsPath}`);
let lastExpression: string | undefined;

export function transform() {
  let activeEditor = vscode.window.activeTextEditor;
  
  let selection = getSelection();
  if (!selection) {
    vscode.window.showWarningMessage(
      'Active panel (or active selection) is not valid JSON to transform'
    );
    return;
  }

  fs.writeFileSync(tmpFilePath, JSON.stringify(selection, null, 2));
  vscode.window.showTextDocument(tmpFileUri, {preserveFocus:true, viewColumn:getViewColumn()})
    .then(function () {
      function renderOutput(expression: any) {
        var outputJson;
        lastExpression = expression;
        if (expression) {
          try {
            outputJson = jmespath.search(selection, expression);
          } catch (error) {
            vscode.window.showWarningMessage(`Search error: '${expression}'`);
            return null;
          }
          fs.writeFileSync(tmpFilePath, JSON.stringify(outputJson, null, 2));
        }
        return null;
      }
      vscode.window
        .showInputBox({
          value: lastExpression,
          valueSelection: [-1, -1],
          validateInput: renderOutput,
        })
        .then(function (expression) {
        });
    });
}

function getSelection(): string | undefined {
  let selectedText = getSelectedText();
  if (!selectedText) {
    selectedText = getActiveDocumentText();
  }

  let selectedJson = undefined;

  if (selectedText) {
    try {
      selectedJson = JSON.parse(selectedText);
    } catch (error) {
      console.log(
        'json-transform-vscode.getSelection: selected text is not JSON'
      );
    }
  }
  return selectedJson;
}

function getSelectedText(): string | undefined {
  let activeEditor = vscode.window.activeTextEditor;
  let selection = activeEditor?.selection;
  return activeEditor?.document.getText(selection);
}

function getActiveDocumentText(): string | undefined {
  var editor = vscode.window.activeTextEditor;
  return editor?.document.getText();
}

function getViewColumn() {
  var activeEditor = vscode.window.activeTextEditor;

  if (!activeEditor) {
    return vscode.ViewColumn.One;
  }
  switch (activeEditor.viewColumn) {
    case vscode.ViewColumn.One:
      return vscode.ViewColumn.Two;
    case vscode.ViewColumn.Two:
      return vscode.ViewColumn.Three;
  }
  return activeEditor.viewColumn;
}
