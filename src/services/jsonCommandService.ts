import * as vscode from 'vscode';
// import jmesPathService from "./jmespathService";

import OutputChannelResultViewer from '../ui/outputChannelResultViewer';
import ExpressionInput from '../ui/expressionInput';
import { ResultViewer } from '../ui/resultViewer';
import { Constants } from '../utils/constants';
import { ErrorUtils } from '../utils/errorUtils';
import JMESPathService from './jmespathService';

export default class JsonCommandService {
  public static COMMAND_NAME = 'jmespath.query';

  private lastExpression: string | undefined;
  private expressionInput: ExpressionInput;
  private jsonService: JMESPathService;
  private resultViewer: ResultViewer;

  private disposable: vscode.Disposable;

  constructor(context: vscode.ExtensionContext, resultViewer?: ResultViewer) {
    this.expressionInput = new ExpressionInput(context);
    this.jsonService = new JMESPathService(context);
    this.resultViewer =
      resultViewer ||
      new OutputChannelResultViewer(Constants.OUTPUT_CHANNEL, '  ');

    const subscriptions: Array<vscode.Disposable> = [];

    this.expressionInput.onExpressionChanged(
      (expression) => {
        this.searchAndDisplayResult(expression);
      },
      this,
      subscriptions
    );

    this.disposable = vscode.Disposable.from(...subscriptions);
  }

  public async execute() {
    if (vscode.window.activeTextEditor?.document.languageId !== 'json' && vscode.window.activeTextEditor?.document.languageId !== 'jsonc') {
      this.resultViewer.viewResult("Language Type '"+vscode.window.activeTextEditor?.document.languageId+"' not supported. "+Constants.ERROR_UNSUPPORTED_DOCUMENT);
    }

    try {
      const expression = await this.expressionInput.presentInputBox(
        Constants.INPUT_PROMPT,
        Constants.INPUT_EXPRESSION,
        this.lastExpression
      );
      if (expression === undefined) {
        return Promise.resolve();
      }
      if (expression.trim().length === 0) {
        throw new Error(Constants.ERROR_INVALID_EXPRESSION);
      }
      this.searchAndDisplayResult(expression);
    } catch (error) {
      return vscode.window.showErrorMessage(`${ErrorUtils.getErrorMessage(error)}`);
    }
  }

  public dispose() {
    this.disposable.dispose();
  }

  private searchAndDisplayResult(expression: string) {
    const data = vscode.window.activeTextEditor?.document.getText();
    if (data) {
      const result = this.jsonService.search(data, expression);
      if (result) {
        this.lastExpression = expression;
      }
      this.resultViewer.viewResult(result);
    }
  }
}
