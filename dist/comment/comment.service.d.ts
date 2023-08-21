import { JwtService } from '@nestjs/jwt';
export declare class CommentService {
    private jwtService;
    constructor(jwtService: JwtService);
    prisma: any;
    postComment(token: any, commentData: any): Promise<string>;
    getComment(token: any): Promise<any>;
    editComment(token: any, id: number, commentUpdated: any): Promise<string>;
    removeCmt(token: any, id: number): Promise<string>;
    getCommentById(token: any, MaCongViec: number): Promise<any>;
}
