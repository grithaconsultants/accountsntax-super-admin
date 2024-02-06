import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';
import { catchErrorHandling, isEmpty } from '../helper';


const getAllClients = async (apiUrl: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await NetworkOps.makeGetRequest(apiUrl, true);
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

const getClientDetailsById = async (clientId: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await NetworkOps.makeGetRequest(`${endPoints.getClientById}/${clientId}`, true);
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

const updateClientById = async (clientId: string, payload : any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await NetworkOps.makePutRequest(`${endPoints.updateClientById}/${clientId}`, payload, true);
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

const deleteClientById = async (clientId: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await NetworkOps.makeDeleteRequest(`${endPoints.deleteClientById}/${clientId}`, true);
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

const updateLicenseById = async (licenseId: string, payload : any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await NetworkOps.makePutRequest(`${endPoints.updateLicensesById}/${licenseId}`, payload, true);
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
  updateClientById,
  getClientDetailsById,
  updateLicenseById
}