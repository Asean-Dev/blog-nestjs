export declare class ApiResponse<T> {
    code: number;
    success: boolean;
    message: string;
    data?: T;
    constructor(partial: Partial<ApiResponse<T>>);
}
export declare const ResponseSuccess: <T>(data: T) => ApiResponse<T>;
