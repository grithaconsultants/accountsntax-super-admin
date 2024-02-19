import moment from 'moment-timezone';
import dayjs from 'dayjs';
import nodemailer from 'nodemailer';
import axios from 'axios';
import { json2csv } from 'json-2-csv';
import { read, writeFileXLSX, utils } from "xlsx";
import jsPDF from 'jspdf';
import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';
import ToastComponent from '@/component/Toast/Toast';

export const handleWhatsAppIconClick = (clientNumber: string) => {
  const message = 'Hello, this is an automated message.';
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${clientNumber}&text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
  ToastComponent("message sent successfully");
};

export const handleSendEmail = (toemail: string) => {
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

export const formateDueDateList = (List: any) => {
  let list: any = [];
  if (List) {
    for (let item of List) {
      list.push([{ ...item, colorName: getColorName(item?.colorCode) }]);
    }
    return list;
  }
}

export async function getColorName(value: string) {
  let colorName: string = "-";
  let colorCode: string = "";
  if (value) {
    colorCode = value.startsWith('#') ? value.slice(1) : value;
    if (colorCode.length === Number(6)) {
      try {
        const response: any = await axios.get(`http://www.thecolorapi.com/id?hex=${colorCode}`)
        if (response && response?.data?.name?.value) {
          colorName = response?.data?.name?.value;
          // console.log("this is color name" ,colorName)
        }
      } catch (error) {
        console.error('Error fetching color name:', error);
      }
    }
  }

  return colorName;
}

// export async function getColorName(value :string):Promise<string>{
//   let colorName :string = "-";
//   let colorCode :string = "";
//   if(value){
//     colorCode = value.startsWith('#') ? value.slice(1) : value ;
//     if(colorCode.length === Number(6)){
//       try {
//         await axios.get(`http://www.thecolorapi.com/id?hex=${colorCode}`
//         ).then(async (response: any) => {
//           if(response && response?.data?.name?.value){
//             colorName= response?.data?.name?.value;
//             console.log("this is color name" ,colorName)
//           } 
//         });         
//       } catch (error) {
//         console.error('Error fetching color name:', error);
//       }
//     }
//   }

//   return colorName
// }



export const generateVoucherTitle = (value: any) => {
  let voucherTitle = "";
  if (value === 'Sales') {
    voucherTitle = "Tax Invoice";
  } else if (value === 'Sales Order') {
    voucherTitle = "Sales Order";
  } else if (value === 'Purchase') {
    voucherTitle = "Purchase Invoice";
  } else if (value === 'Purchase Order') {
    voucherTitle = "Purchase Order";
  } else if (value === 'Receipt') {
    voucherTitle = "Receipt Note";
  } else if (value === 'Payment') {
    voucherTitle = "Payment Advise";
  } else if (value === 'Journal') {
    voucherTitle = "Journal Voucher";
  }
  return voucherTitle;
}


export const getUpdateInvoiceType = (value: any) => {
  let voucherType = "";
  if (value === '1') {
    voucherType = "sales";
  } else if (value === '2') {
    voucherType = "performa";
  } else if (value === '3') {
    voucherType = "salesOrder";
  } else if (value === '4') {
    voucherType = "quotation";
  } else {
    voucherType = "creditNote";
  }
  return voucherType
}


export const getUpdatePurchaseType = (value: any) => {
  let voucherType = "";
  if (value === '1') {
    voucherType = "purchaseInvoice";
  } else if (value === '2') {
    voucherType = "purchaseOrders";
  } else {
    voucherType = "debits";
  }
  return voucherType;
}

export const getUpdatePaymentsType = (value: any) => {
  let voucherType = "";
  if (value === '1') {
    voucherType = "paymentInvoices";
  } else if (value === '2') {
    voucherType = "receipts";
  } else {
    voucherType = "contras";
  }
  return voucherType;
}

export const setItemAmount = (item: any) => {

  // console.log(typeof item?.quantity, typeof item?.rate);

  let amount = 0;
  if (item?.quantity && item?.rate) {
    if (item?.discount) {
      amount = Number(item?.quantity * item?.rate)
    } else {
      amount = item?.quantity * item?.rate * (1 - Number(item?.discount / 100))
    }
  } else {
    amount = Number(item?.amount)
  }

  return Number(amount);
}


export const setBillLedgerSelected = (value: any, List: any) => {
  let ledgerSelected: any = {}
  if (value) {
    const filterList = List.filter((i: any) => i?.label === value?.label)
    ledgerSelected = { ...filterList[0] }
  }

  return ledgerSelected
}

export const getCountryValue = (country: any, countryList: any) => {
  const filteredCountry = countryList.filter((i: any) => i?.label === country)
  return filteredCountry[0]
}


export const setTypeOFRegistration = (value: any, list: any) => {
  let typeOFRegistration
  const filteredType: any = list.filter((i: any) => i.value === value)
  if (filteredType.length > 0) {
    typeOFRegistration = filteredType[0].value;
  } else {
    typeOFRegistration = "OTHER";
  }
  return typeOFRegistration;
}

export const setMonthName = (value: string): string => {
  const month: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let year, monthCode, date, monthName;
  const dataArr = value.split('-');
  [year, monthCode, date] = dataArr;
  if (monthCode[0] === '0') {
    monthCode = monthCode[1];
  }
  monthName = `${month[parseInt(monthCode) - 1]}-${year.slice(2)}`;
  return monthName;
}


export const setDateRange = (value: string): any => {
  let dateObj = {}
  const dataArr = value.split('-');
  const [year, monthCode, date] = dataArr;
  const Month31 = ['01', '03', '05', '07', '08', '10', '12'];
  const Month30 = ['04', '06', '09', '11'];

  if (Month31.includes(monthCode)) {
    Object.assign(dateObj, { fromDate: `${year}-${monthCode}-01` });
    Object.assign(dateObj, { toDate: `${year}-${monthCode}-31` });
  }
  else if (Month30.includes(monthCode)) {
    Object.assign(dateObj, { fromDate: `${year}-${monthCode}-01` });
    Object.assign(dateObj, { toDate: `${year}-${monthCode}-30` });
  }
  else if (parseInt(year) % 4 === 0) {
    Object.assign(dateObj, { fromDate: `${year}-${monthCode}-01` });
    Object.assign(dateObj, { toDate: `${year}-${monthCode}-29` });
  }
  else {
    Object.assign(dateObj, { fromDate: `${year}-${monthCode}-01` });
    Object.assign(dateObj, { toDate: `${year}-${monthCode}-28` });
  }
  return dateObj;
}


export const getTotalValue = (data: any, key: any) => {
  const total: any = data.reduce((total: any, item: any) => total + item[key], 0);
  return Number(total).toFixed(2);
}


export const ret_ifEmpty = (value: any): any => {
  if (isEmpty(value)) {
    return "_";
  } else {
    return value;
  }
}

export const formateMobileNo = (value: any) => {
  let fromateMobile = ""
  if ((value.length === 13) && (value[0] === "+")) {
    fromateMobile = value.substring(3)
  } else if (value.length === 12) {
    fromateMobile = value.substring(2);
  } else {
    fromateMobile = value
  }

  // return  fromateMobile ?  `+91-${fromateMobile.slice(0, 5)}-${fromateMobile.slice(5)}` : null
  return fromateMobile ? `+91-${fromateMobile}` : null

}

export const decimalTwo = (value: any): any => {
  if (isEmpty(value)) {
    return "_";
  } else {
    return Number(value).toFixed(2);
  }
}

export const noDecimal = (value: any): any => {
  if (isEmpty(value)) {
    return "_";
  } else {
    return Number(value).toFixed(0);
  }
}

export const getToken = () => {
  const checking: any = localStorage.getItem('userToken');
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



// get custome
export const formatedCustomer = (List: any, value: any) => {
  let filterCustomer = List.filter((i: any) => i?.label === value)
  // for (let item of List) {
  //   if(item?.label === value){
  //     filterCustomer = { lable : item?.label , value : item?.value}
  //   }
  // }
  return filterCustomer[0]
}
//date oprations

export const toddmmyy = (value: string) => {
  const momentTime: any = moment(value).tz("Asia/Calcutta");
  return momentTime.format('DD-MM-YYYY');
}

export const removeDateRest = (value: string) => {
  if (isEmpty(value)) {
    return "_";
  } else if (value.includes('T')) {
    const momentTime: any = value.split("T00:00:00.000Z");
    const toDateFormat: any = moment(momentTime[0]).tz("Asia/Calcutta");
    return toDateFormat.format('DD-MM-YYYY');
  } else {
    return value
  }
}

export const addDateRest = (value: string) => {
  if (isEmpty(value)) {
    return "";
  } else {
    return `${value}T00:00:00.000Z`;
  }
}

export const getNoOfDays = () => {

  let noOfDays;
  const getData: any = localStorage.getItem('tallyOnCloudset')
  const parsed: any = JSON.parse(getData)
  if (parsed) {
    const todate = dayjs(dayjs(), 'DD-MM-YYYY').format('DD-MM-YYYY')
    const endDate = parsed?.endDate
    noOfDays = endDate.diff(todate, 'days')
  }

  return noOfDays

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

export const calcRemainingDays = (startDate: string, period: number) => {
  if (!isEmpty(startDate)) {
    let formateDate;
    if (startDate.includes('T')) {
      const momentTime: any = startDate.split("T00:00:00.000Z");
      formateDate = momentTime[0];
    } else {
      formateDate = startDate;
    }
    const toDateFormat: any = moment(formateDate).tz("Asia/Calcutta");
    const todate = moment().tz("Asia/Calcutta");
    const remainingDays = period - Number(todate.diff(toDateFormat, 'days'));
    if (remainingDays > 0) {
      return remainingDays;
    }
  }
  return 0;
}


export const yyyymmTommmYY = (value: string) => {
  if (isEmpty(value)) {
    return "_";
  } else {
    const toDateFormat: any = moment(value).tz("Asia/Calcutta");
    return toDateFormat.format('MMM-YYYY');
  }
}

export const ddmmyyyyToyyyymmdd = (val: string) => {
  return isEmpty(val) ? "" : dayjs(val, 'DD-MM-YYYY').format('YYYY-MM-DD');
}


export const yyyymmddToddmmyyyy = (val: string) => {
  return isEmpty(val) ? "" : dayjs(val, 'YYYY-MM-DD').format('DD-MM-YYYY');
}

//date oprations


export const generateAddressLine = (value: any) => {
  if (isEmpty(value)) {
    return "_";
  } else {
    return ` ${value?.addLine1} ${value?.addLine2} ${value?.city} ${value?.state} ${value?.pincode} `;
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












export const dutyTaxLedgerType = (voucherData: any) => {
  let list = [];
  for (let item of voucherData) {
    list.push({ value: item?.mst_ledgers?.name, label: item?.mst_ledgers?.name });
  }
  list.splice(0, 0, { label: 'Add Ledger', value: 'Add Ledger' });
  // list.splice(0, 0, { label: 'Select Ledger', value: 'Select Ledger' });
  return list;
}

export const generateItemType = (voucherData: any) => {
  let list = [];
  for (let item of voucherData) {
    list.push({ value: item?._id, label: item?.name });
  }
  list.splice(0, 0, { label: 'Add Item', value: 'Add Item' });
  return list;
}

export const mstLedgerNameAndId = (voucherData: any) => {
  let list = [];
  for (let item of voucherData) {
    list.push({ value: item?._id, label: item?.mst_ledgers?.name });
  }
  list.splice(0, 0, { label: 'Add Ledger', value: 'Add Ledger' });
  return list;
}

export const mstLedgerNameAndIdNew = (voucherData: any) => {
  let list = [];
  for (let item of voucherData) {
    list.push({ value: item?._id, label: item?.mst_ledgers?.name });
  }
  list.splice(0, 0, { label: 'Add Ledger', value: 'Add Ledger' });
  return list;
}

export const generateVoucherType = (voucherData: any) => {
  let tempArray = [];
  for (let item of voucherData) {
    tempArray.push({ value: item?._id, label: item?.name });
  }
  // tempArray.splice(0, 0, { label: 'Add New Voucher Type', value: 'Add New Voucher Type' });
  // tempArray.splice(0, 0, { label: 'Select Voucher Type', value: 'Select Voucher Type' });
  return tempArray;
}


export const filterAllCountry: Function = (valToFilter: any,) => {
  let tempArray = [];
  for (let item of valToFilter) {
    // tempArray.push({ label: item.name, value: item.isoCode });
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

export const filterGodown: Function = (valToFilter: any,) => {
  let tempArray = [];
  for (let item of valToFilter) {
    tempArray.push({ label: item.name, value: item.guid });
  }
  return tempArray;
}

export const filterCustomer: Function = (valToFilter: any,) => {
  let tempArray = [];
  for (let item of valToFilter) {
    tempArray.push({ label: item?.mst_ledgers?.name, value: item?._id })
    // tempArray.push({ label: item?.mst_ledgers?.name, value: "SDWDSD" });
  }
  tempArray.splice(0, 0, { label: 'Add Party', value: 'Add Party' });
  // tempArray.splice(0, 0, { label: 'Select Party', value: 'Select Party' });
  return tempArray;
}

export const generateVoucherName = (voucherData: any) => {
  let tempArray = [];
  for (let item of voucherData) {
    tempArray.push({ value: item?._id, label: item?.name });
  }
  tempArray.splice(0, 0, { label: 'Select Voucher Name', value: 'Select Voucher Name' });
  return tempArray;
}

export const generateCurrencyType = (voucherData: any) => {
  let list = [];
  for (let item of voucherData) {
    list.push({ value: item?.symbol, label: item?.formalname });
  }
  return list;
}

export const generateStockGroup = (stockGroups: any) => {
  let empArr: any = [];
  stockGroups.map((item: any, index: any) => {
    empArr.push({
      value: item?._id,
      label: underscorIfEmpty(item?.name)
    });
  });
  empArr.splice(0, 0, { label: 'Primary', value: 'primary' });
  return empArr;
}

export const generateUOM = (uomList: any) => {
  let empArr: any = [];
  uomList.map((item: any, index: any) => {
    empArr.push({
      value: item._id,
      label: underscorIfEmpty(item?.name)
    });
  });
  empArr.splice(0, 0, { label: 'Not Applicable', value: 'Not Applicable' });
  return empArr;
}














export const generateAddressType = (addressData: any) => {
  let list: any = [];
  if (addressData && Array.isArray(addressData)) {
    for (let item of addressData) {
      list.push({
        value: item?._id,
        label: `${item?.type ? `${item?.type} :` : "-"}
        ${item?.addLine1 ? item?.addLine1 : ""},
        ${item?.addLine2 ? item?.addLine2 : ""},
        ${item?.city ? item?.city : ""},
        ${item?.state ? item?.state : ""},
        ${item?.country ? item?.country : ""},
        ${item?.pincode ? item?.pincode : ""}`
      });
    }
    list.splice(0, 0, { label: 'Add Address', value: 'Add Address' });
    return list;
  } else if (addressData) {
    return {
      value: 'apiAddress',
      label: `${addressData?.type ? `${addressData?.type} :` : "-"} ${addressData?.addLine1 ? addressData?.addLine1 : ""}, ${addressData?.addLine2 ? addressData?.addLine2 : ""}, ${addressData?.city ? addressData?.city : ""}, ${addressData?.state ? addressData?.state : ""}, ${addressData?.country ? addressData?.country : ""}, ${addressData?.pincode ? addressData?.pincode : ""}`
    }
  } else {
    return list;
  }
}

export const generateBankType = (bankData: any) => {
  let list: any = [];
  if (bankData && Array.isArray(bankData)) {
    for (let item of bankData) {
      list.push({
        value: item?._id,
        label: `${item?.bankName ? item?.bankName.toUpperCase() : "-"} - ${item?.accountNo ? item?.accountNo : "-"}`
      });
    }

    list.splice(0, 0, { label: 'Add Bank', value: 'Add Bank' });

    return list;
  } else if (bankData) {
    return {
      value: 'apiBank',
      label: `${bankData?.bankName ? bankData?.bankName.toUpperCase() : "-"} - ${bankData?.accountNo ? bankData?.accountNo : "-"}`
    }
  } else {
    return list;
  }
}

export const filterSelectItem = (List: any, value: any) => {
  for (let item of List) {
    if (item?.label === value) {
      // const itemIdenx = List.indexOf(item)
      // console.log("this is fiter voucher details " , List , {label : List[itemIdenx]?.label , value : List[itemIdenx]?.value} )
      // return {label : List[itemIdenx]?.label , value : List[itemIdenx]?.value}
      return item
    }
  }
}



export const removeplus91 = (value: string) => {
  if ((value.length === 13) && (value[0] === "+")) {
    return value.substring(3)
  } else if (value.length === 12) {
    return value.substring(2);
  }
  return value;
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
    const monthrow = momentTime.month();
    if (monthrow > 2) {
      const dateOne = `${daterow}-04-01`;
      const dateTwo = `${daterow + 1}-03-31`;
      return { dateOne, dateTwo };
    } else {
      const dateOne = `${daterow - 1}-04-01`;
      const dateTwo = `${daterow}-03-31`;
      return { dateOne, dateTwo };
    }
  }

  if (value === "previousFY") {
    const daterow = momentTime.year();
    const monthrow = momentTime.month();
    if (monthrow > 2) {
      const dateOne = `${daterow - 1}-04-01`;
      const dateTwo = `${daterow}-03-31`;
      return { dateOne, dateTwo };
    } else {
      const dateOne = `${daterow - 2}-04-01`;
      const dateTwo = `${daterow - 1}-03-31`;
      return { dateOne, dateTwo };
    }
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

export const miltiPer = (num: any, amount: any) => {
  return num * amount / 100;
}

export const calcOther = (toCalc: any) => {
  let val = 0;
  if (!isEmpty(toCalc) && !isEmpty(toCalc.length) && toCalc.length > 0) {
    for (let item of toCalc) {
      val = val + (isEmpty(item.amount) ? 0 : Number(item.amount))
    }
  }
  return Number(decimalTwo(Number(val)));
}

export const calcTotal = (finalData: any): any => {
  let val = 0;
  val = val + (isEmpty(finalData?.allData?.amount) ? 0 : Number(finalData?.allData?.amount));
  if (finalData?.taxType == "CGST & SGST") {
    val = val + (isEmpty(finalData?.allData?.cgst.amount) ? 0 : Number(finalData?.allData?.cgst.amount));
    val = val + (isEmpty(finalData?.allData?.sgst.amount) ? 0 : Number(finalData?.allData?.sgst.amount));
  } else {
    val = val + (isEmpty(finalData?.allData?.igst?.amount) ? 0 : Number(finalData?.allData?.igst?.amount));
  }
  val = val - (isEmpty(finalData?.allData?.discount?.amount) ? 0 : Number(finalData?.allData?.discount?.amount));
  val = val + (isEmpty(finalData?.allData?.freight?.amount) ? 0 : Number(finalData?.allData?.freight?.amount));
  val = val + calcOther(finalData?.otherData);
  return Number(decimalTwo(Number(val)));
}


export function flattenInvoiceData(invoice: any) {
  const flattenedData = {
    ...invoice,
    items: [],
    otherLedger: []
  };

  invoice.items.forEach((item: any) => {
    const flatItem = { ...invoice, ...item };
    delete flatItem.items;
    flattenedData.items.push(flatItem);
  });

  invoice.otherLedger.forEach((ledger: any) => {
    const flatLedger = { ...invoice, ...ledger };
    delete flatLedger.otherLedger;
    flattenedData.otherLedger.push(flatLedger);
  });

  return flattenedData;
}

export const schemaManualEr = (error: any) => {
  const firstCut: any = String(error).split('ValidationError: ');
  return firstCut[1].split(".");
}

export const logoutProcess = (router: any) => {
  localStorage.clear();
  sessionStorage.clear();
  router.push('/login');
}

export const catchErrorHandling = (error: any) => {
  if (isEmpty(error?.data?.msg) == true) {
    return { response: { data: { msg: "Unknown Error!" } }, status: false };
  } else {
    return { response: error, status: false };
  }
}

export const inFormatOfLabelAndVal = (calledWith: any) => {
  return [
    {
      value: calledWith?._id,
      label: calledWith?.name
    }
  ]
}

export const underscorIfEmpty = (value: any) => {
  if (isEmpty(value) == true) {
    return "_";
  } else {
    return value;
  }
}

export const emptyArrIfEmpty = (value: any) => {
  if (isEmpty(value) == true) {
    return [];
  } else {
    return value;
  }
}

export const nullIfEmpty = (value: any) => {
  if (isEmpty(value) == true) {
    return null;
  } else {
    return value;
  }
}

export const sizeCalculator = (sizeToProcess: any) => {

  // console.log('sizeToProcess ', sizeToProcess);

  if (sizeToProcess <= 1024) {
    sizeToProcess = sizeToProcess + 'bytes';
  } else if (sizeToProcess / 1024 < 1024) {
    sizeToProcess = parseInt('' + sizeToProcess / 1024 + '') + 'kb';
  } else if (sizeToProcess / 1024 > 1024) {
    sizeToProcess = parseFloat('' + sizeToProcess / (1024 * 1024) + '').toFixed(2) + 'mb';
  }

  return sizeToProcess;
}



export const numberToWords = (number: any) => {
  const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const teens = ['', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  const convertLessThanOneThousand = (num: any): string => {
    if (num === 0) {
      return '';
    } else if (num < 10) {
      return units[num];
    } else if (num < 20) {
      return teens[num - 10];
    } else if (num < 100) {
      return tens[Math.floor(num / 10)] + ' ' + convertLessThanOneThousand(num % 10);
    } else {
      return units[Math.floor(num / 100)] + ' hundred ' + convertLessThanOneThousand(num % 100);
    }
  }

  if (number === 0) {
    return 'zero';
  } else {
    let result = '';
    let crore = Math.floor(number / 10000000);
    let lakh = Math.floor((number % 10000000) / 100000);
    let thousand = Math.floor(((number % 10000000) % 100000) / 1000);
    let remainder = number % 1000;

    if (crore) {
      result += convertLessThanOneThousand(crore) + ' crore ';
    }

    if (lakh) {
      result += convertLessThanOneThousand(lakh) + ' lakhs ';
    }

    if (thousand) {
      result += convertLessThanOneThousand(thousand) + ' thousand ';
    }

    if (remainder) {
      result += convertLessThanOneThousand(remainder);
    }

    return result.trim();
  }
}


export const getReqPermission = (clientDetails: any, permissionType: string) => {
  let permission: any;
  const filcterPermission = clientDetails?.permissions.filter((permission: any) => permission.feature == permissionType);
  permission = !isEmpty(filcterPermission) ? filcterPermission[0] : null;
  return permission;
}