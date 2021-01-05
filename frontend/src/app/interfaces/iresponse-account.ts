import { IResponse } from "./iresponse";
import { IUser } from "./iuser";

export interface IResponseAccount extends IResponse{
    usuario:IUser,
    token:string;
}
