
import React, { useEffect } from 'react';

import SearchSelect from '@/component/searchselect/searchselect';

import ToastComponent from '@/component/Toast/Toast';

import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';
import { filterAllCountry } from '../../utils/helper';


const TAG = "Country: ";
const Country = (props: any) => {

  const { loading, setLoading, countryList, setCountryList, selectedCountry, setSelectedCountry, setFieldValue } = props;

  useEffect(() => {

    if (!countryList.length) {
      fetchAllCountry();
    }

  }, [0]);

  async function fetchAllCountry(): Promise<void> {
    setLoading(true);
    NetworkOps.makeGetRequest(endPoints.getAllCountry, false)
      .then(async (response: any) => {
        setLoading(false);
        if (response?.status == 200 && response?.data?.success == true) {
          setCountryList(filterAllCountry(response?.data?.data?.country));
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
      option={countryList}
      label="Country"
      disabled={loading}
      placeholder="Select Country"
      id="country"
      selected={selectedCountry}
      onChangeEvent={(value: any) => { setSelectedCountry(value); setFieldValue('country', value.label) }}
    />
  );
}

export default Country;