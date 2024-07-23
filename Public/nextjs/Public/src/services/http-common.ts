import axios from "axios";
import { findedLocation, getLocalStorage } from '../components/helper/Helper';

let defaultAPIKey = process.env.NEXT_PUBLIC_PUBLIC_API_KEY ?? '';
let token = getLocalStorage()?.Token;
let userAPIKey = token ? "Bearer " + token : defaultAPIKey;

export const headersNoCache = '"Cache-Control": "no-store, no-cache, must-revalidate"';

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_PUBLIC_API,
  headers: {
    'Accept': 'application/json',
    "Content-type": "application/json",
    "Cache-Control": "no-store, no-cache, must-revalidate",
    "Authorization": userAPIKey,
    "LanguageCode": findedLocation().LanguageCode,
    "CountryCode": findedLocation().CountryCode
  }
});