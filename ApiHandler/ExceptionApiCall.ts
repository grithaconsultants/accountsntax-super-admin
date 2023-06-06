import axios from 'axios';

import { ApiHost } from '../utils/constants';

export const API: any = axios.create({
  baseURL: ApiHost,
  responseType: "json"
});