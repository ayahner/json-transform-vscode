
export interface ResultViewer {
	viewError(errorMessage: string): unknown;
	viewError(errorMessage: string, clear: boolean): unknown;
	viewResult(queryResult: unknown): unknown;
	viewResult(queryResult: unknown, clear: boolean): unknown;
}
