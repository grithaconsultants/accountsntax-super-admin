import ToastComponent from '@/component/Toast/Toast';
import { ClientsService } from '@/utils/apiCallServices/client.api.services';
import { FETCH_CLIENTS_REQUEST, FETCH_CLIENTS_SUCCESS, FETCH_CLIENTS_FAILURE } from '@/redux/constant';

const TAG = "Company Reducer Action : ";

export const fetchClietnsRequest = () => ({
  type: FETCH_CLIENTS_REQUEST,
});

export const fetchClietnsSuccess = (clientsData: any) => ({
  type: FETCH_CLIENTS_SUCCESS,
  payload: {
    clientsList: clientsData?.clientsList,
    clientDetails: null,
    metaData: clientsData?.metaData,
  },
});

export const fetchClietnsFailure = (error: any) => ({
  type: FETCH_CLIENTS_FAILURE,
  payload: error,
});


export const fetchAllClients = async (dispatch: any, apiUrl: any) => {

  dispatch(fetchClietnsRequest());

  let apidata: any;

  const { response, status }: any = await ClientsService.getAllClients(apiUrl, true);

  if (!status) {
    ToastComponent(response?.data.msg);
    dispatch(fetchClietnsFailure(response));
    return;
  };

  const clientsData: any = {
    clientsList: response?.data?.data?.clients ?? [],
    metaData: response?.data?.data?.meta ?? null,
  };

  dispatch(fetchClietnsSuccess(clientsData));

};