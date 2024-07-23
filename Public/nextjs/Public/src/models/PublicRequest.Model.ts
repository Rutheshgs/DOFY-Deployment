export interface IPublicRequestModel {
    Id?: number,
    Created?: any,
    CreatedBy?: number,
    Active?: boolean,
    Modified?: any,
    ModifiedBy?: number,
    ValidationErrors?: {},
    OrderId: number,
    Name: string,
    MobileNumber: string,
    Email: string,
    CityId: number,
    Area: string,
    ProductTypeId: number,
    BrandName: string,
    BrandModelName: string,
    ModelVariant: string,
    ModelVariantId: number,
}

export interface IFindLocation {
    Product: any,
    BrandModelName: any,
    BrandName: any,
    Model: any,
    ModelVariant: any,
    CityId: any,
    Name: string,
    Email: string,
    MobileNumber: string,
    Area: string,
}

export interface IFindYourDeviceModel {
    DeviceType: string,
    BrandModelName: string,
    BrandName: string,
    ModalName: string,
    ModelVariant: string,
    Name: string,
    MobileNumber: string,
    Email: string,
}
