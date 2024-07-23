import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/Store";

interface FilterIds {
  productId: any;
  BrandId: any;
  ModelId: any;
  CityId: any;
  PromoCode: any;
  FromDate: any;
  ToDate: any;
  CompletedStartDate: any;
  CompletedEndDate: any;
  OffsetStart: number,
  RowsPerPage: number
}

type routerPage = "ProductId" | "BrandId" | "ModelId" | "CityId" | "PromoCode" | "FromDate" | "ToDate" | "OffsetStart" | "RowsPerPage" | "CompletedStartDate" | "CompletedEndDate";

const initialState: FilterIds = {
  productId: 0,
  BrandId: null,
  ModelId: null,
  CityId: null,
  PromoCode: null,
  FromDate: null,
  ToDate: null,
  CompletedStartDate: null,
  CompletedEndDate: null,
  OffsetStart: 0,
  RowsPerPage: 10
};

const FilterGetId = createSlice({
  name: 'FilterId',
  initialState,
  reducers: {
    FilterDataId: (state, action: PayloadAction<{ payload: any, type: routerPage }>) => {
      switch (action.payload.type) {
        case "ProductId": {
          state.productId = action.payload.payload;
          return state;
        }
        case "BrandId": {
          state.BrandId = action.payload.payload;
          return state;
        }
        case "ModelId": {
          state.ModelId = action.payload.payload;
          return state;
        }
        case "CityId": {
          state.CityId = action.payload.payload;
          return state;
        }
        case "PromoCode": {
          state.PromoCode = action.payload.payload;
          return state;
        }
        case "FromDate": {
          state.FromDate = action.payload.payload;
          return state;
        }
        case "ToDate": {
          state.ToDate = action.payload.payload;
          return state;
        }
        case "CompletedStartDate": {
          state.CompletedStartDate = action.payload.payload;
          return state;
        }
        case "CompletedEndDate": {
          state.CompletedEndDate = action.payload.payload;
          return state;
        }
        case "OffsetStart": {
          state.OffsetStart = action.payload.payload;
          return state;
        }
        case "RowsPerPage": {
          state.RowsPerPage = action.payload.payload;
          return state;
        }
        default: return state;
      }
    },
  }
}
);

export const { FilterDataId } = FilterGetId.actions;
export const FilterProductId = (state: RootState) => state.FilterDataReducers;
export default FilterGetId.reducer;
