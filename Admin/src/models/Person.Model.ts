export interface IPersonModel {
  LoginId: any,
  UserRoleId: any,
  FirstName: any,
  MiddleName: any,
  LastName: any,
  Email: any,
  Prefix: any,
  Suffix: any,
  DateOfBirth: any,
  UploadImagePath: any,
  UploadImageName: any,
  RowOrder: any,
  Mobile: any,
  SecondaryMobile: any,
  UserRoleName: any,
  UserLogin: {
    CompanyId: any,
    UserName: any,
    PassWord: any,
    Salt: any,
    IVKey: any,
    RowOrder: any,
    ConfirmPassword: any,
    Id: any,
    Created: any,
    CreatedBy: any,
    Active: any,
    Modified: any,
    ModifiedBy: any,
    IsValid: any,
    ValidationErrors: {
      Items: []
    }
  },
  Id: any,
  Created: any,
  CreatedBy: any,
  Active: any,
  Modified: any,
  ModifiedBy: any,
  IsValid: any,
  ValidationErrors: {
    Items: []
  }
}

export interface IDofyGeo {
  Parent1: any
  Id?: any,
  Created?: any,
  CreatedBy?: number,
  Active?: boolean,
  Modified?: any,
  ModifiedBy?: number,
  ValidationErrors?: {},
  Name?: any,
  DisplayName?: string,
  EnumName?: string,
  RowOrder?: number,
  Identifier?: number,
  Code?: any,
  Level?: number,
  LevelName?: string,
  Parent?: number,
  DisplayInList?: boolean
}
