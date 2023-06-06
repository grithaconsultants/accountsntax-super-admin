
import React, { useEffect } from 'react';

import SearchSelect from '@/component/searchselect/searchselect';
import ToastComponent from '@/component/Toast/Toast';

import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';

import { filterAllCity } from '../../utils/helper';

const TAG = "City: ";
const City = (props: any) => {

  const { loading, setLoading, selectedCountry, selectedState, setFieldValue, cityList, setCityList, setSelectedCity } = props;

  useEffect(() => {

    if (selectedCountry?.value && selectedState?.value) {
      fetchCity();
    }

  }, [selectedState]);


  async function fetchCity(): Promise<void> {
    setLoading(true);
    NetworkOps.makeGetRequest(`${endPoints.getCities}?countryCode=${selectedCountry?.value}&stateCode=${selectedState?.value}`, false)
      .then(async (response: any) => {
        setLoading(false);
        if (response?.status == 200 && response?.data?.success == true) {
          setCityList(filterAllCity(response?.data?.data?.city));
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
      option={cityList}
      label="City"
      id="city"
      disabled={loading}
      placeholder="Select City"
      onChangeEvent={(value: any) => { setSelectedCity(value); setFieldValue('city', value.label); }}
    />
  );
}

export default City;