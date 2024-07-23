import axios from "axios";
import { findedLocation, getLocalStorage } from '../components/helper/Helper';
import { HelperConstant } from '../components/helper/HelperConstant';

let schema = window.location.protocol ?? "https:";

let localAPI = schema + "//localhost:5052/v1/";
let publicAPI = schema + "//dofypublicapiv1.inventsoftlabs.in/v1/";
let productionAPI = schema + "//publicapi.dofy.in/v1/";
let defaultAPIKey = process.env.REACT_APP_PUBLIC_API_KEY ?? '';
let token = getLocalStorage()?.Token;
let userAPIKey = token ? "Bearer " + token : defaultAPIKey;

export const headersNoCache = '"Cache-Control": "no-store, no-cache, must-revalidate"';

export default axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_APP_API,
  headers: {
    'Accept': 'application/json',
    "Content-type": "application/json",
    "Cache-Control": "no-store, no-cache, must-revalidate",
    "Authorization": userAPIKey,
    "LanguageCode": findedLocation().LanguageCode,
    "CountryCode": findedLocation().CountryCode
  }
});