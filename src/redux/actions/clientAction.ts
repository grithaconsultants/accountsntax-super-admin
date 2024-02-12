import ToastComponent from '@/component/Toast/Toast';
import { ClientsService } from '@/utils/apiCallServices/client.api.services';
import { FETCH_CLIENTS_REQUEST, FETCH_CLIENTS_SUCCESS, FETCH_CLIENTS_FAILURE, CLIENT_DETAILS_UPDATE } from '@/redux/constant';
import { isEmpty } from '@/utils/helper';

const TAG = "Company Reducer Action : ";

export const fetchClietnsRequest = (payload: any) => ({
  type: FETCH_CLIENTS_REQUEST,
  payload: payload
});

export const fetchClietnsSuccess = (payload: any) => ({
  type: FETCH_CLIENTS_SUCCESS,
  payload: payload
});

export const fetchClietnsFailure = (payload: any) => ({
  type: FETCH_CLIENTS_FAILURE,
  payload: payload,
});

export const fetchAllClients = async (dispatch: any, payload: any, apiUrl: any) => {

  const { clientID, clientsList, metaData, clientDetails }: any = payload;

  dispatch(fetchClietnsRequest(payload));

  const { response, status }: any = await ClientsService.getAllClients(apiUrl);

  if (!status) {
    dispatch(fetchClietnsFailure({ ...payload, error: response }));
    return;
  };

  const clientsData: any = {
    clientID: clientID,
    clientsList: response?.data?.data?.clients ?? clientsList,
    clientDetails: clientDetails,
    metaData: response?.data?.data?.meta ?? metaData,
  };

  dispatch(fetchClietnsSuccess(clientsData));
};


export const fetchClientDetails = async (dispatch: any, payload: any, router: any = undefined) => {

  const { clientID, clientsList, metaData, clientDetails }: any = payload;

  try {

    dispatch(fetchClietnsRequest(payload));

    const { response, status }: any = await ClientsService.getClientDetailsById(clientID);
    if (!status) {
      dispatch(fetchClietnsFailure({ ...payload, error: response }));
      return;
    };

    const resData = response?.data?.data ? response?.data?.data : null;
    if (!isEmpty(resData)) {
      const clientsData: any = {
        clientID: clientID,
        clientsList: clientsList,
        metaData: metaData,
        clientDetails: resData ?? clientDetails
      };

      dispatch(fetchClietnsSuccess(clientsData));
      
      if (router !== undefined) {
        router.push('/clients/details');
      }

    }
  } catch (error: any) {
    ToastComponent(error ? error.message : "Something went wrong");
  }

};


export const updateClientDetails = async (dispatch: any, payload: any, apiData: any) => {

  const { clientID, clientsList, metaData, clientDetails }: any = payload;
  try {
    dispatch(fetchClietnsRequest(payload));

    const { response, status }: any = await ClientsService.updateClientById(clientID, apiData);
    if (!status) {
      dispatch(fetchClietnsFailure({ ...payload, error: response }));
      return;
    };

    const resData = response?.data?.data ? response?.data?.data : null;
    if (!isEmpty(resData)) {
      const clientsData: any = {
        clientID: clientID,
        clientsList: clientsList,
        metaData: metaData,
        clientDetails: resData ?? clientDetails
      };

      dispatch(fetchClietnsSuccess(clientsData));
    }
  } catch (error: any) {
    ToastComponent(error ? error.message : "Something went wrong");
  }
};