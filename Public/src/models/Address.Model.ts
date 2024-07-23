export interface IAddressModel {
    Id: number,
    Created?: any,
    CreatedBy?: number,
    Active?: boolean,
    Modified?: any,
    ModifiedBy?: number,
    ValidationErrors?: {},
    PersonId: any,
    CountryId: any,
    StateId: any,
    CityId: any,
    PinCode: string,
    Address: string,
    Address1: string,
    LandMark: string,
    Name: string,
    MobilePhone: string,
    WorkPhone: string,
    HomePhone: string,
    EmailId: string,
    AddressTypeId: any,
    IsDefault: boolean,
    LocationPin: any,
    RowOrder?: number,
    TotalRowsCount?: number,
    LocationId?: any,
    ApartmentNumber?: any,
}

export interface ILocationPinModel {
    Active?: boolean
    Code?: string
    Created?: string
    CreatedBy?: number
    DisplayInList?: boolean
    EnumName?: string
    Id?: number
    Identifier?: number
    IsValid?: boolean
    Level?: number
    LevelName?: string
    Modified?: string
    ModifiedBy?: number
    Name?: string
    Parent?: number
    RowOrder?: number
    ValidationErrors?: {}
}

export interface IAddressType {
    Id?: number,
    Created?: any,
    CreatedBy?: number,
    Active?: boolean,
    Modified?: any,
    ModifiedBy?: number,
    ValidationErrors?: {},
    Name?: string,
    DisplayName?: string,
    EnumName?: string,
    RowOrder?: number
}


export interface IDofyGeo {
    Id?: number,
    Created?: any,
    CreatedBy?: number,
    Active?: boolean,
    Modified?: any,
    ModifiedBy?: number,
    ValidationErrors?: {},
    Name?: string,
    DisplayName?: string,
    EnumName?: string,
    RowOrder?: number,
    Identifier?: number,
    Code?: string,
    Level?: number,
    LevelName?: string,
    Parent?: number,
    DisplayInList?: boolean
}
