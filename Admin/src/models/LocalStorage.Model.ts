export interface ILocalStorageModel {
    Token: any   
}

export interface ITokenModel{
    Email: string,
    Mobile: string,
    Password: string,
    PersonId: number,
    aud: string,
    exp: number,
    RoleId: number,
}