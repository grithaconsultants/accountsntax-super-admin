
import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';
import ToastComponent from '@/component/Toast/Toast';
import axios from 'axios';
import moment from 'moment-timezone'

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
  const checking: any = localStorage.getItem('userToken');
  if (isEmpty(checking)) {
    window.location.replace('/login');
  }
  else{
    return JSON.parse(checking);
  }
}

// export const getUserProfileDetails = () => {
//   const checking: any = localStorage.getItem('userData'); 
//   if (isEmpty(checking)) {
//     window.location.replace('/login');
//   }
//   else {
//     return JSON.parse(checking).loginData;
//   }
// }

// export const getCompaniesData = () => {
//   const checking: any = localStorage.getItem('companiesData');
//   if (isEmpty(checking)) {
//     window.location.replace('/login');
//   } else {
//     return JSON.parse(checking);
//   }
// }


// export const getSelectedCompanyId = () => {
//   const checking: any = localStorage.getItem('company');
//   if (isEmpty(checking)) {
//     window.location.replace('/login');
//   } else {
//     return JSON.parse(checking)._id;
//   }
// }

// export const getSelectedCompany = () => {
//   const checking: any = localStorage.getItem('company');
//   if (isEmpty(checking)) {
//     window.location.replace('/login');
//   } else {
//     return JSON.parse(checking);
//   }
// }

// export const getCompanyFromLs = () => {
//   const checking: any = localStorage.getItem('company');
//   if (isEmpty(checking)) {
//     window.location.replace('/companies');
//   } else {
//     return JSON.parse(checking);
//   }
// }

// export const getSelectedClient = () => {
//   const checking: any = localStorage.getItem('client');
//   if (isEmpty(checking)) {
//     window.location.replace('/login');
//   } else {
//     return JSON.parse(checking);
//   }
// }

// export const getSelectedCompanyData = (companyId: string) => {
//   const checking: any = localStorage.getItem('companiesData');
//   if (isEmpty(checking)) {
//     window.location.replace('/login');
//   } else {
//     const compArr = JSON.parse(checking);

//     const found = compArr.find((singleData: any) => singleData._id === companyId);

//     if (isEmpty(found)) {
//       window.location.replace('/login');
//     }

//     return found;

//   }
// }

// export const getLedgers = () => {
//   const checking: any = localStorage.getItem('ledgers');
//   if (isEmpty(checking)) {
//     window.location.replace('/login');
//   } else {
//     return JSON.parse(checking);
//   }
// }


// export const getUOM = () => {
//   const checking: any = localStorage.getItem('uom');
//   if (isEmpty(checking)) {
//     window.location.replace('/login');
//   } else {
//     return JSON.parse(checking);
//   }
// }


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

export const filterAllBanks: Function = (valToFilter: any,) => {
  let tempArray = [];
  for (let item of valToFilter) {
    tempArray.push({ label: item.bankName, value: item.bankName });
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


export const toddmmyy = (value: string) => {
  const momentTime: any = moment(value).tz("Asia/Calcutta");
  return momentTime.format('DD-MM-YYYY');
}

export const removeDateRest = (value: string) => {
  if (isEmpty(value)) {
    return "_";
  } else {
    const momentTime: any = value.split("T00:00:00.000Z");
    const toDateFormat: any = moment(momentTime[0]).tz("Asia/Calcutta");
    return toDateFormat.format('DD-MM-YYYY');
  }
}

export const SrPageNumber = (currentPageNo: number, pageSize: number, index: number) => {
  if (isEmpty(currentPageNo) && isEmpty(index)) {
    return "_";
  } else {
    if (currentPageNo == 1) {
      return index + 1;
    } else {
      return ((currentPageNo * pageSize) - pageSize) + (index + 1);
    }
  }
}

export const dateDiffInDays = (value: string) => {
  if (isEmpty(value)) {
    return "_";
  } else {
    const momentTime: any = value.split("T00:00:00.000Z");
    const toDateFormat: any = moment(momentTime[0]).tz("Asia/Calcutta");
    const todate = moment().tz("Asia/Calcutta");
    return todate.diff(toDateFormat, 'days')
  }
}

export const yyyymmTommmYY = (value: string) => {
  if (isEmpty(value)) {
    return "_";
  } else {
    const toDateFormat: any = moment(value).tz("Asia/Calcutta");
    return toDateFormat.format('MMM-YYYY');
  }
}

export const toDebit = (value: any) => {
  if (isEmpty(value)) {
    return "_";
  } else {
    return value < 0 ? decimalTwo((value * -1)) : ""
  }
}

export const toCredit = (value: any) => {
  if (isEmpty(value)) {
    return "_";
  } else {
    return value > 0 ? decimalTwo(value) : ""
  }
}

export const removeFilePath = (value: string) => {

  const fullCompleteName: any = value;
  const findIndex = fullCompleteName.indexOf("/");
  if (findIndex == -1) {
    return value;
  } else {
    const afterSplit: any = value.split("/");
    return afterSplit[afterSplit.length - 1];
  }

}

export const removeplus91 = (value: string) => {
    return (value === '' || value.trim().length === 10) ? value : value.substring(3);
  }



export const decimalTwo = (value: any) => {
  if (isEmpty(value)) {
    return "_";
  } else {
    return Number(value).toFixed(2);
  }
}

export const closingDrOrCr = (value: any) => {
  if (isEmpty(value)) {
    return "_";
  } else {
    return value < 0 ? `${value * -1} Dr` : `${value} Cr`;
  }
}

export const durationFilterHelper = (value: string) => {

  const momentTime: any = moment().tz("Asia/Calcutta");

  if (value === "currentMonth") {
    const dateOne = momentTime.format('YYYY-MM-01');
    const dateTwo = momentTime.endOf('month').format('YYYY-MM-DD');
    return { dateOne, dateTwo };
  }

  if (value === "today") {
    const dateOne = momentTime.format('YYYY-MM-DD');
    const dateTwo = momentTime.add(1, 'days').format('YYYY-MM-DD');
    return { dateOne, dateTwo };
  }

  if (value === "currentQuarter") {
    const dateOne = momentTime.quarter(momentTime.quarter()).startOf('quarter').format('YYYY-MM-DD');
    const dateTwo = momentTime.quarter(momentTime.quarter()).endOf('quarter').format('YYYY-MM-DD');
    return { dateOne, dateTwo };
  }

  if (value === "currentFY") {
    const daterow = momentTime.year();
    const dateOne = `${daterow}-04-01`;
    const dateTwo = `${daterow + 1}-03-31`;
    return { dateOne, dateTwo };
  }

  if (value === "previousFY") {
    const daterow = momentTime.year();
    const dateOne = `${daterow - 1}-04-01`;
    const dateTwo = `${daterow}-03-31`;
    return { dateOne, dateTwo };
  }

}




export const deleteS3F = async (args: any) => {
  return new Promise((resolve, reject) => {

    let apiUrl: string = `${endPoints.signedUrl}?type=${args.type}&fileName=${args.path}`;
    NetworkOps.makeGetRequest(apiUrl, false)
      .then(async (response: any) => {
        // debugLog("Helper ", ' patient details response we got ', response);
        return resolve(response?.data?.data);
      })
      .catch((error: any) => {
        console.log("Helper ", 'error i got in catch', error);
      });

  });
}

export const deleteS3File = async (url: any) => {
  const fileUrl: any = await deleteS3F({ path: url, type: "delete" });
  return fileUrl;
}

export const getS3SignedUrl = async (args: any) => {
  return new Promise((resolve, reject) => {

    let apiUrl: string = `${endPoints.signedUrl}?type=${args.type}&fileName=${args.path}`;
    NetworkOps.makeGetRequest(apiUrl, false)
      .then(async (response: any) => {
        // debugLog("Helper ", ' patient details response we got ', response);
        return resolve(response?.data?.data);
      })
      .catch((error: any) => {
        console.log("Helper ", 'error i got in catch', error);
      });

  });
}

export const uploadFileToS3 = async (args: any) => {
  return new Promise((resolve, reject) => {

    let formatDate = new FormData();
    formatDate.append('file', args.file);

    let fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: args.file,
    };

    // debugLog("Helper ", 's3 url', args.url);
    // debugLog("Helper ", 'upload s3 fetch options', fetchOptions);

    fetch(args.url, fetchOptions)
      .then(async (response) => {
        // debugLog("Helper ", 'response before json', response);
        if (response.status == 200) {
          resolve(response);
          ToastComponent("File Uploaded");
        } else {
          resolve({ error: true, message: "facing technical difficulties" });
        }
      })
      .catch((error) => {
        console.log("Helper ", ' error i got while upload file to s3 ', error);
        resolve({ error: true, message: "facing technical difficulties" });
      });

  });
}

export const getAWSFileUrl = async (url: any) => {
  const fileUrl: any = await getS3SignedUrl({ path: url, type: "get" });
  return fileUrl;
}

export const uploadFile = async (files: any, url: any) => {

  if (files && files.length) {

    // console.log("Helper ", "  calling with ", files, filename, ext, url);

    try {
      const response = await getS3SignedUrl({ path: url, type: "put" });
      // debugLog("Helper ", " response of get signed url ", response);
      try {
        const holdRes = await uploadFileToS3({ url: response, file: files[0] });
        // debugLog("Helper ", " upload api response ", holdRes);
        return url;

      } catch (error) {
        console.log("Helper ", " error we got while uploading file to s3 ", error);
      }

    } catch (error) {
      console.log("Helper ", " error in getting signed url ", error);
    }
  }

}


export const catchErrorHandling = (error : any) => {
  if (isEmpty(error?.data?.msg) == true) {
    return { response: { data: { msg: "Unknown Error !" } }, status: false };
  }else{
    return { response: error, status: false };
  }

}


export const handleWhatsAppIconClick = (clientNumber: string) => {
  const message = 'Hello, this is an automated message.';
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${clientNumber}&text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
  ToastComponent("message sent successfully");
};

export const handleSendEmail = (toemail :string) => {
  const to = toemail;
  const subject = 'Test Email';
  const text = 'This is a test email sent from Next.js!';

  // SendMail(to, subject, text);
};

export const handleSenEMail = async () => {
  const recipient = 'raj.chandra.kumawat@gmail.com';
  const subject = 'Send Email From Microsoft Azure Ad account';
  const body = 'Hello, this is first test email send you to from microsoft azure account ';

  try {
    await axios.post('/api/send-email', {
      recipient: recipient,
      subject: subject,
      body: body,
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};