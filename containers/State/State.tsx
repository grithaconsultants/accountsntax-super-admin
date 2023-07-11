
import React, { useEffect } from 'react';

import SearchSelect from '@/component/searchselect/searchselect';
import ToastComponent from '@/component/Toast/Toast';

import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';
import { filterAllState } from '../../utils/helper';

const TAG = "State: ";
const State = (props: any) => {

  const { loading, setLoading, selectedCountry, setFieldValue, stateList, setStateList, selectedState, setSelectedState } = props;

  useEffect(() => {

    if (selectedCountry?.value) {
      fetchState();
    }

  }, [selectedCountry]);

  async function fetchState(): Promise<void> {
    setLoading(true);
    NetworkOps.makeGetRequest(`${endPoints.getStates}?countryCode=${selectedCountry?.value}`, false)
      .then(async (response: any) => {
        setLoading(false);
        if (response?.status == 200 && response?.data?.success == true) {
          setStateList(filterAllState(response?.data?.data?.state));
        } else {
          ToastComponent(response?.data?.msg);
          console.log(TAG, ' error got in else ');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(TAG, ' error i got in catch ', error);
      });
  }


  return (
    <SearchSelect
      option={stateList}
      label="State"
      disabled={loading}
      id="state"
      placeholder="Select State"
      selected={selectedState}
      onChangeEvent={(value: any) => { setSelectedState(value); setFieldValue('state', value.label); }}
    />
  );
}

export default State;