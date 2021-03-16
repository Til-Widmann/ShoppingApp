export class User {
  constructor(
    public email: string,
    public id:string,
    private _token: string,
    private _tokeEpireDate: Date) {}


  get token(): string {
    if (!this.tokeEpireDate || new Date() > this.tokeEpireDate)
      return null;
    return this._token;
  }

  get tokeEpireDate(): Date {
    return this._tokeEpireDate;
  }
}
