type ApiResponse = SuccessResponse | ErrorResponse;

interface SuccessResponse {
    result?: number;
    data?: any
}

interface ErrorResponse {
    result?: number;
    resultCode?: string;
    resultMsg?: string;
}