import axios from "axios";
import { findedLocation, getLocalStorage } from '../components/helper/Helper';
import { HelperConstant } from '../components/helper/HelperConstant';

let schema = window.location.protocol ?? "https:";

const localAPI = schema + "//localhost:5067/v1/";
const adminAPI = "http://dofyadminapi.inventsoftlabs.in/v1";
let productionAPI = "https://adminapi.dofy.in/v1/";

let defaultAPIKey = HelperConstant.defaultAPIKey;
let token = getLocalStorage()?.Token;
let userAPIKey = token ? "Bearer " + token : defaultAPIKey;

export default axios.create({
  baseURL: productionAPI,
  headers: {
    'Accept': 'application/json',
    "Content-type": "application/json",
    "Cache-Control": "no-store, no-cache, must-revalidate",
    "Authorization": userAPIKey,
    "LanguageCode": findedLocation().LanguageCode,
    "CountryCode": findedLocation().CountryCode,
  }
});

