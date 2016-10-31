export class Groups{
    constructor(
        public name: string,
        public creationDate: string,
        public members: Set<string>
    ){}
}