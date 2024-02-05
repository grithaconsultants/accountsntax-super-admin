import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';
import { catchErrorHandling, isEmpty } from '../helper';

const loginRegister = async (payload: any, isToken: boolean = true) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await NetworkOps.makePostRequest(endPoints.login, payload, isToken);
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

const addServer = async (payload: any, istoken: any = false) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await NetworkOps.makePostRequest(endPoints.addServer, payload, istoken);
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

const getCompanies = async (apiUrl: any, istoken: any = false) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await NetworkOps.makeGetRequest(apiUrl, istoken);
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

const getCompaniesWithPagination = async (page: number, limit: number, istoken: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await NetworkOps.makeGetRequest(`${endPoints.getCompanies}?page=${page}&limit=${limit}`, istoken);
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


const getCompanyDetailsById = async (companyId: any, istoken: any = false) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await NetworkOps.makeGetRequest(`${endPoints.getCompanyById}/${companyId}`, istoken);
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

const deleteCompany = async (companyID: string, istoken: any = false) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await NetworkOps.makeDeleteRequest(`${endPoints.deleteCompanyById}/${companyID}`, istoken);
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