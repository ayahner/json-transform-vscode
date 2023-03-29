import * as vscode from 'vscode';
import { ResultViewer } from './resultViewer';

export default class OutputChannelResultViewer implements ResultViewer {
  private outputChannel: vscode.OutputChannel;
  private indentString: string;

  constructor(channelName: string, indent = '  ') {
    this.outputChannel = vscode.window.createOutputChannel(channelName);
    this.indentString = indent;
    this.outputChannel.show(true);
  }

  public viewError(errorMessage: string, clear: boolean = true) {
    if (clear) this.outputChannel.clear();
    this.outputChannel.appendLine(errorMessage);
    this.outputChannel.show(true);
  }
  public viewResult(queryResult: unknown, clear: boolean = true) {
    if (clear) this.outputChannel.clear();
    this.outputChannel.appendLine(
      JSON.stringify(queryResult, null, this.indentString)
    );
    this.outputChannel.show(true);
  }

  public dispose() {
    this.outputChannel.dispose();
  }
}
