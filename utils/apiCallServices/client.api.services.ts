import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';
import { catchErrorHandling, isEmpty } from '../helper';


const getAllClients = async (apiUrl: any, istoken: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await NetworkOps.makeGetRequest(apiUrl, istoken);
      if (response?.status == 200 && response?.data?.success == true) {
        return resolve({ response: response, status: true });
      } else {
        return resolve({ response: response, status: false });
      }
    } catch (error: any) {
      return resolve(catchErrorHandling(error));
    }
  });
}

const getClientDetailsById = async (clientId: any, istoken: any = true) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await NetworkOps.makeGetRequest(`${endPoints.getClientById}/${clientId}`, istoken);
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

const deleteClientById = async (clientId: string, istoken: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await NetworkOps.makeDeleteRequest(`${endPoints.deleteClientById}/${clientId}`, istoken);
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

const updateLicenseById = async (clientId: string, istoken: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await NetworkOps.makePutRequest(`${endPoints.updateLicenses}/${clientId}`, istoken);
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


export const ClientsService = {
  getAllClients,
  deleteClientById,
  getClientDetailsById,
  updateLicenseById
}