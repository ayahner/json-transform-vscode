import * as vscode from "vscode";
import jmespath = require("jmespath");

import { Constants } from  "../utils/constants";

export default class JMESPathService {
	private context: vscode.ExtensionContext;

	constructor(context: vscode.ExtensionContext) {
		this.context = context;
	}

	public search(data: string, expression: string): string {
		if (expression === undefined || expression.trim().length === 0) {
			throw new Error(Constants.ERROR_INVALID_EXPRESSION);
		}

		const jsonData = JSON.parse(data);
		
		const searchResult = jmespath.search(jsonData, expression);
		return searchResult;
	}
}
