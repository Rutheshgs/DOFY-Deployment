export interface ILocalStorageModel {
    Token: any,
    PersonId: any,
    FirstName: string,
    Email: any,
    MobileNumber: string,
    AlternateNumber: number
}

export interface ITokenModel{
    Email: string,
    Mobile: string,
    Password: string,
    PersonId: string,
    aud: string,
    exp: number
}