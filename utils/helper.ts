export const debounce = (func: any, wait: any) => {
  let timeout: any;

  return function executedFunction(...args: any) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const isEmpty = (value: any) => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
}

export const getToken = () => {
  const checking: any = localStorage.getItem('userData');
  if (isEmpty(checking)) {
    window.location.replace('/login');
  } else {
    return JSON.parse(checking);
  }
}

export const getUserProfileDetails = () => {
  const checking: any = localStorage.getItem('userData');
  if (isEmpty(checking)) {
    window.location.replace('/login');
  } else {
    return JSON.parse(checking).loginData;
  }
}

export const getCompaniesData = () => {
  const checking: any = localStorage.getItem('companiesData');
  if (isEmpty(checking)) {
    window.location.replace('/login');
  } else {
    return JSON.parse(checking);
  }
}


export const getSelectedCompanyId = () => {
  const checking: any = localStorage.getItem('company');
  if (isEmpty(checking)) {
    window.location.replace('/login');
  } else {
    return JSON.parse(checking)._id;
  }
}

export const getSelectedCompany = () => {
  const checking: any = localStorage.getItem('company');
  if (isEmpty(checking)) {
    window.location.replace('/login');
  } else {
    return JSON.parse(checking);
  }
}

export const getSelectedCompanyData = (companyId: string) => {
  const checking: any = localStorage.getItem('companiesData');
  if (isEmpty(checking)) {
    window.location.replace('/login');
  } else {
    const compArr = JSON.parse(checking);

    const found = compArr.find((singleData: any) => singleData._id === companyId);
    
    if (isEmpty(found)) {
      window.location.replace('/login');
    }

    return found;

  }
}

export const getLedgers = () => {
  const checking: any = localStorage.getItem('ledgers');
  if (isEmpty(checking)) {
    window.location.replace('/login');
  } else {
    return JSON.parse(checking);
  }
}


export const getUOM = () => {
  const checking: any = localStorage.getItem('uom');
  if (isEmpty(checking)) {
    window.location.replace('/login');
  } else {
    return JSON.parse(checking);
  }
}


export const wait = (timeout: any) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}



export const filterAllCountry: Function = (valToFilter: any,) => {
  let tempArray = [];
  for (let item of valToFilter) {
    tempArray.push({ label: item.name, value: item.isoCode });
  }
  return tempArray;
}

export const filterAllState: Function = (valToFilter: any,) => {
  let tempArray = [];
  for (let item of valToFilter) {
    tempArray.push({ label: item.name, value: item.isoCode });
  }
  return tempArray;
}

export const filterAllCity: Function = (valToFilter: any,) => {
  let tempArray = [];
  for (let item of valToFilter) {
    tempArray.push({ label: item.name, value: item.name });
  }
  return tempArray;
}