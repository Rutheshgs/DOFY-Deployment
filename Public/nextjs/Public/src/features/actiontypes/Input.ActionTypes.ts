export enum ActionType {
    PRODUCT_ID = "PRODUCT_ID",
    BRAND_ID = 'BRAND_ID',
    SERIES_ID = 'SERIES_ID',
    MODEL_ID = 'MODEL_ID',
    ADDRESS_ID = "ADDRESS_ID",
    COLOUR_ID = "COLOUR_ID",
    VARIANT_ID = "VARIANT_ID"
}

interface getBrandByDeviceID {
    type: ActionType.PRODUCT_ID;
    payload: number;
}

interface getModelByBrandId {
    type: ActionType.BRAND_ID;
    payload: number;
}

interface getSeriesByModelId {
    type: ActionType.MODEL_ID;
    payload: number;
}

interface getVariantBySeriesId {
    type: ActionType.MODEL_ID;
    payload: number;
}

interface getColourBySeriesId {
    type: ActionType.COLOUR_ID;
    payload: number;
}

interface getAddressId {
    type: ActionType.ADDRESS_ID;
    payload: number;
}

export type Action = getBrandByDeviceID | getModelByBrandId | getSeriesByModelId | getVariantBySeriesId | getAddressId | getColourBySeriesId;
