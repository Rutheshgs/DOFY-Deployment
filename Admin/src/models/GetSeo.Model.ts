export interface IGetSeoModel{
          Id?: number,
          created: string,
          createdBy: number,
          active: true,
          modified: string,
          modifiedBy: number,
          isValid: boolean,
          validationErrors: {
            items: [
              {
                propertyName: string,
                message: string
              }
            ]
          },
          pageName: string,
          title: string,
          description: string,
          keywords: string,
          ogTitle: string,
          ogType: string,
          ogUrl: string,
          ogImage: string,
          ogDescription: string,
          twitterCard: string,
          twitterSite: string,
          twitterTitle: string,
          twitterDescription: string,
          twitterImage: string
}