import { JwtPayload } from './jwt.type';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: JwtPayload): Promise<{
        id: number;
        userName: string;
        uuid: string;
    }>;
}
export {};
