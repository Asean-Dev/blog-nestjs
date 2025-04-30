export declare class CreateBlogDto {
    titles: string;
    content: string;
    status: string;
}
export declare class CreateBlogCommentDto {
    blogUuid: string;
    comment: string;
}
export declare class FindBlogDto {
    status: string;
}
