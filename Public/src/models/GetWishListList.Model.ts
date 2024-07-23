export interface IGetWishListListModel{
      Image: string | undefined
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
      enumName: string,
      thumbnailPath: string,
      maximumValue: number
    }
