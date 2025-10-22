import type process from "process";

declare global {
	interface APIErrorResponse<DetailType=any> {
		code: string;
		message: string;
		details?: DetailType;
	}
	type APIResponse<SuccessType=void, ErrorDetailType=any> = SuccessType|APIErrorResponse<ErrorDetailType>;
}