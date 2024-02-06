import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';
import { catchErrorHandling, isEmpty } from '../helper';

const loginRegister = async (payload: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await NetworkOps.makePostRequest(endPoints.login, payload, false);
      if (response?.status == 200 && response?.data?.success == true) {
        return resolve({ response: response, status: true });
      } else {
        return resolve({ response: response, status: false });
      }
    } catch (error) {
      return resolve(catchErrorHandling(error));
    }
  });
}

const addServer = async (payload: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await NetworkOps.makePostRequest(endPoints.addServer, payload, true);
      if (response?.status == 200 && response?.data?.status == true) {
        return resolve({ response: response, status: true });
      } else {
        return resolve({ response: response, status: false });
      }
    } catch (error: any) {
      return resolve(catchErrorHandling(error));
    }
  });
}

const getCompanies = async (apiUrl: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await NetworkOps.makeGetRequest(apiUrl, true);
      if (response?.status == 200 && response?.data?.status == true) {
        return resolve({ response: response, status: true });
      } else {
        return resolve({ response: response, status: false });
      }
    } catch (error: any) {
      return resolve(catchErrorHandling(error));
    }
  });
}

const getCompaniesWithPagination = async (page: number, limit: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await NetworkOps.makeGetRequest(`${endPoints.getCompanies}?page=${page}&limit=${limit}`, true);
      if (response?.status == 200 && response?.data?.status == true) {
        return resolve({ response: response, status: true });
      } else {
        return resolve({ response: response, status: false });
      }
    } catch (error) {
      return resolve(catchErrorHandling(error));
    }
  });
}


const getCompanyDetailsById = async (companyId: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await NetworkOps.makeGetRequest(`${endPoints.getCompanyById}/${companyId}`, true);
      if (response?.status == 200 && response?.data?.success == true) {
        return resolve({ response: response, status: true });
      } else {
        return resolve({ response: response, status: false });
      }
    } catch (error) {
      return resolve(catchErrorHandling(error));
    }
  });
}

const deleteCompany = async (companyID: StringConstructor) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await NetworkOps.makeDeleteRequest(`${endPoints.deleteCompanyById}/${companyID}`, true);
      if (response?.status == 200 && response?.data?.success == true) {
        return resolve({ response: response, status: true });
      } else {
        return resolve({ response: response, status: false });
      }
    } catch (error) {
      return resolve(catchErrorHandling(error));
    }
  });
}


export const CommonService = {
  loginRegister,
  addServer,
  getCompanies,
  deleteCompany,
  getCompaniesWithPagination,
  getCompanyDetailsById
}