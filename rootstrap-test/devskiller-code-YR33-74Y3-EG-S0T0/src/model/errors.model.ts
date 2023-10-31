export class GetCriptoIssue extends Error {
    constructor(m: string) {
        super(m);
         this.message=m
        }
        statusCode = 500
}