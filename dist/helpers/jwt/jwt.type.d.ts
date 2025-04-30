export type JwtPayload = {
    id: number;
    uuid: string;
    userName: string;
};
export interface RequestWithUser extends Request {
    user: {
        id: number;
        uuid: string;
        userName: string;
    };
}
