export interface IGetWishListModel{
      id: number,
      created?: string,
      createdBy?: number,
      active: boolean,
      modified?: string,
      modifiedBy?: number,
      isValid: boolean,
      validationErrors: {
        items: [
          {
            propertyName: string,
            message: string
          }
        ]
      },
      personId: number,
      modelVariantId: number,
      serviceTypeId: number,
      rowOrder: number,
      enumName: string,
      thumbnailPath: string,
      maximumValue: number
    }
   