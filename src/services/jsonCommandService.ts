import {ExtensionContext, Disposable, window, Memento} from 'vscode';
// import jmesPathService from "./jmespathService";

import OutputChannelResultViewer from '../ui/outputChannelResultViewer';
import ExpressionInput from '../ui/expressionInput';
import { ResultViewer } from '../ui/resultViewer';
import { Constants } from '../utils/constants';
import { ErrorUtils } from '../utils/errorUtils';
import JMESPathService from './jmespathService';

export default class JsonCommandService {

  private expressionInput: ExpressionInput;
  private jsonService: JMESPathService;
  private resultViewer: ResultViewer;
  private disposable: Disposable;
  private context : ExtensionContext;

  constructor(context: ExtensionContext, resultViewer?: ResultViewer) {    
    this.context = context;
    this.expressionInput = new ExpressionInput(context);
    this.jsonService = new JMESPathService(context);
    this.resultViewer =
      resultViewer ||
      new OutputChannelResultViewer(Constants.OUTPUT_CHANNEL, '  ');

    const subscriptions: Array<Disposable> = [];

    this.expressionInput.onExpressionChanged(
      (expression) => {
        this.searchAndDisplayResult(expression);
      },
      this,
      subscriptions
    );

    this.disposable = Disposable.from(...subscriptions);
  }

  public async execute() {
    if (window.activeTextEditor?.document.languageId !== 'json' && window.activeTextEditor?.document.languageId !== 'jsonc') {
      this.resultViewer.viewResult("Language Type '"+window.activeTextEditor?.document.languageId+"' not supported. "+Constants.ERROR_UNSUPPORTED_DOCUMENT);
    }

    try {
      const expression = await this.expressionInput.presentInputBox(
        Constants.INPUT_PROMPT,
        Constants.INPUT_EXPRESSION,
        this.context.globalState.get(Constants.COMMAND_NAME, "")
      );
      if (expression === undefined) {
        return Promise.resolve();
      }
      if (expression.trim().length === 0) {
        throw new Error(Constants.ERROR_INVALID_EXPRESSION);
      }
      this.searchAndDisplayResult(expression.trim());
    } catch (error) {
      return window.showErrorMessage(`Error: ${ErrorUtils.getErrorMessage(error)}`);
    }
  }

  public dispose() {
    this.disposable.dispose();
  }

  private searchAndDisplayResult(expression: string) {
    const data = window.activeTextEditor?.document.getText();
    if (data) {
      try {
        const result = this.jsonService.search(data, expression);
        if (result) {
          this.context.globalState.update(Constants.COMMAND_NAME, expression.trim())
        }
        this.resultViewer.viewResult(result);
      } catch (e) {
        this.resultViewer.viewError(`Error: ${e} for`);
        this.resultViewer.viewError(`expression: ${expression}`, false);
      }
    }
  }

}
