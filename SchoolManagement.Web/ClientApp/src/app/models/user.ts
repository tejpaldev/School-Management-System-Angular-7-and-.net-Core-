export class User {
  constructor(
    public userId: string,
    public username: string,
    public password: string,
    public email: string,
    public contact: string,
    public role?: string,
    public roleId?: string,
    public profileId?: string
  ) {}
}

export interface User {
  Username: string;
  Password: string;
}
