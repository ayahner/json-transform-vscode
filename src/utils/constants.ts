export abstract class Constants {
	public static readonly INPUT_PROMPT = "Enter JMESPath expression";
    public static readonly INPUT_EXPRESSION = "JMESPath expression";
	
    public static readonly OUTPUT_CHANNEL = "JMESPath Output";
    
	public static readonly ERROR_UNSUPPORTED_DOCUMENT = "Requires JSON (json) language mode.";
	public static readonly ERROR_INVALID_EXPRESSION = "Invalid expression";

	public static readonly COMMAND_NAME = 'jmespath.query';
}
