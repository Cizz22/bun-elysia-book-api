


export class HttpException extends Error {
    code: number;

    constructor(public status: number, public message: string) {
        super(message);
        this.code = status;
    }
}