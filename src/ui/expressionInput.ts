import * as vscode from 'vscode';

export default class ExpressionInput {
  private context: vscode.ExtensionContext;

  public onExpressionChanged: vscode.Event<string>;
  private onExpressionChangedEventEmitter: vscode.EventEmitter<string>;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.onExpressionChangedEventEmitter = new vscode.EventEmitter<string>();
    this.onExpressionChanged = this.onExpressionChangedEventEmitter.event;
  }

  /**
   * Presents an input box
   *
   * @param prompt The text to display underneath the input box.
   * @param placeholder An optional string to show as place holder in the input box to guide the user what to type.
   * @return A Promise<string> representing the user-entered expression
   */
  public async presentInputBox(
    prompt: string,
    placeholder?: string,
    value?: string
  ): Promise<string | undefined> {
    return vscode.window.showInputBox({
      prompt: prompt,
      valueSelection: [-1, -1],
      value: value,
      placeHolder: placeholder,
      validateInput: (expression) => {
        return this.validateExpression(expression);
      },
    });
  }

  private validateExpression(expression: string): string | undefined {
    //there is no validator for the input currently!
    this.onExpressionChangedEventEmitter.fire(expression);
    return;
  }
}
