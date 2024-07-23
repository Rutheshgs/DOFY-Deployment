export interface IPersonModel {
    Id: number,
    ValidationErrors: any,
    LoginId: number,
    UserRoleId: number,
    FirstName: string,
    MiddleName: string,
    LastName: string,
    Email: string,
    Prefix: string,
    Suffix: string,
    DateOfBirth: string,
    UploadImagePath: string,
    UploadImageName: string,
    Mobile: string,
    SecondaryMobile: string,
    UserLogin: {
        Id: number,
        ValidationErrors: any,
        CompanyId: number,
        UserName: string,
        PassWord: string,
        Salt: string,
        IVKey: string,
    }

}


