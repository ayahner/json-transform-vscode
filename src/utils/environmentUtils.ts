import * as os from "os";
import * as path from "path";
import * as vscode from "vscode";

export default class EnvironmentUtils {
	private context: vscode.ExtensionContext;

	constructor(context: vscode.ExtensionContext) {
		this.context = context;
	}

	public getHomeDir(): string {
		const homeDir = process.env[(process.platform === "win32") ? "USERPROFILE" : "HOME"];
		return homeDir?homeDir:path.join(os.tmpdir(), 'json-transform-vscode.json');
	}

	public isInsiders(): boolean {
		return /insiders/.test(this.context.asAbsolutePath(""));
	}

	public getExtensionDir(): string {
		return path.join(this.getHomeDir(), this.isInsiders() ? ".vscode-insiders" : ".vscode", "extensions");
	}
}
