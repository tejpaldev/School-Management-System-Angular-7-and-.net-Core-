export class Profile {
    constructor(
        public profileId: string,
        public firstname: string,
        public lastname: string,
        public genderId: string,
        public gender: string,
        public middlename?: string,
        public photoId?: string,
        public photo?: string,
    ) { }
}