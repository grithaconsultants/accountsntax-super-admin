
export const ApiHost = "https://apis-dev.accountsntax.com/api/v1";
export const localHost = "http://192.168.1.44:5001/api/v1";
export const adminCode = "ACCTX23048373416";

export const currencyType = ['INR', 'US', 'EUR'];
export const currencySelected = ['INR'];

export const bankType = ['All Banks', 'HDFC', 'Bank Of Baroda'];
export const bankSelected = ['All Banks'];

export const dueDate = ['Days from issue data', 'Days from today'];
export const dueDateSct = ['Days from issue data'];

export const customers = ['customer 1', 'customer 2', 'customer 3'];
export const customersSelected = ['customer 1'];

export const dueDatePriority = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
]

export const selectedDueDatePriority = [
  { value: "low", label: "Low" },
]

export const dueDateCategory = [
  { value: "gst", label: "GST" },
  { value: "itr", label: "ITR" },
  { value: "custom", label: "Custom" }
]

export const selectedDueDateCategory = [
  { value: "gst", label: "GST" },
]

export const companyType = [
  { value: "individual", label: "Individual" },
  { value: "huf", label: "HUF" },
  { value: "partnership", label: "Partnership" },
  { value: "llp", label: "LLP" },
  { value: "company", label: "Company" },
  { value: "trust", label: "Trust" },
  { value: "other", label: "Other" },
]

export const selectedCompanyType = [
  { value: "individual", label: "Individual" }
]


export const durationFilter = [
  { value: "today", label: "Today" },
  { value: "currentMonth", label: "Current Month" },
  { value: "currentQuarter", label: "Current Quarter" },
  { value: "currentFY", label: "Current FY" },
  { value: "previousFY", label: "Previous FY" },
  { value: "customRange", label: "Custom Range" }
]
export const selectedDurationFilter = [
  { value: "currentMonth", label: "Current Month" },
]

export const genderType = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" }
]

export const selectedGenderType = [
  { value: "male", label: "Male" }
]

export const queryTarget = [
  { value: "rm", label: "Regional Manager" },
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" }
]

export const queryTargetSelected = [
  { value: "rm", label: "Regional Manager" },
]

export const addressType = [
  { value: "registered", label: "Registered Address" },
  { value: "factory", label: "Factory Address" },
  { value: "godown", label: "Godown Address" },
  { value: "office", label: "Office Address" }
]

export const selectedAddressType = [
  { value: "registered", label: "Registered Address" },
]

export const accountType = [
  { value: "saving", label: "Saving" },
  { value: "current", label: "Current" },
  { value: "cash_credit", label: "Cash Credit" },
  { value: "overdraft", label: "Overdraft" }
]

export const selectedAccountType = [
  { value: "current", label: "Current" },
]

export const typeOfRegistration = [
  { value: "INCOMETAX", label: "INCOMETAX" },
  { value: "GST", label: "GST" },
  { value: "GST_RETURN", label: "GST_RETURN" },
  { value: "BRN", label: "BRN" },
  { value: "MSME", label: "MSME" },
  { value: "DCMSME", label: "DCMSME" },
  { value: "NIMSME", label: "NIMSME" },
  { value: "UDYAM_REGISTRATION", label: "UDYAM_REGISTRATION" },
  { value: "FSSAI", label: "FSSAI" },
  { value: "TAN", label: "TAN" },
  { value: "PAN", label: "PAN" },
  { value: "MUDRA", label: "MUDRA" },
  { value: "UDYAMIMITRA", label: "UDYAMIMITRA" },
  { value: "PM_SANIDHI", label: "PM_SANIDHI" },
  { value: "SIDBI", label: "SIDBI" },
  { value: "INCOMETAX_LOGIN", label: "INCOMETAX_LOGIN" },
  { value: "INCOMETAX_REGISTER", label: "INCOMETAX_REGISTER" },
  { value: "LINK_ADHAAR", label: "LINK_ADHAAR" },
  { value: "TIN", label: "TIN" },
  { value: "NSDL", label: "NSDL" },
  { value: "IEC", label: "IEC" },
  { value: "UDYOG_ADHAAR", label: "UDYOG_ADHAAR" },
  { value: "NGSP", label: "NGSP" },
  { value: "MCA", label: "MCA" },
  { value: "MCA_LOGIN", label: "MCA_LOGIN" },
  { value: "DSC", label: "DSC" },
  { value: "DIN", label: "DIN" },
  { value: "LLP", label: "LLP" },
  { value: "CIN", label: "CIN" },
  { value: "IPINDIA", label: "IPINDIA" },
  { value: "TRADEMARK_REGISTRATION", label: "TRADEMARK_REGISTRATION" },
  { value: "STARTUP_INDIA", label: "STARTUP_INDIA" },
  { value: "ISTART_RAJASTHAN", label: "ISTART_RAJASTHAN" },
  { value: "TRACES", label: "TRACES" },
  { value: "DGFT", label: "DGFT" },
  { value: "ICEGATE", label: "ICEGATE" },
  { value: "ROC", label: "ROC" },
  { value: "OTHER", label: "OTHER" }
]

export const selectedRegistrationType = [
  { value: "INCOMETAX", label: "INCOMETAX" },
]


export const registrationLinks: any = {
  INCOMETAX: "https://www.incometax.gov.in/iec/foportal/",
  GST: "https://www.gst.gov.in/",
  GST_RETURN: "https://www.gst.gov.in/help/returns",
  BRN: "https://www.nic.in/products/rajasthan-business-register/",
  MSME: "https://msme.gov.in/",
  DCMSME: "https://dcmsme.gov.in/",
  NIMSME: "https://www.nimsme.org/",
  UDYAM_REGISTRATION: "https://udyamregistration.gov.in/Government-India/Ministry-MSME-registration.htm",
  FSSAI: "https://www.fssai.gov.in/",
  TAN: "https://incometaxindia.gov.in/Pages/tan-tds.aspx",
  PAN: "https://incometaxindia.gov.in/Pages/pan.aspx",
  MUDRA: "https://www.mudra.org.in/",
  UDYAMIMITRA: "https://udyamimitra.in/",
  PM_SANIDHI: "https://pmsvanidhi.mohua.gov.in/",
  SIDBI: "https://sidbi.in/en",
  INCOMETAX_LOGIN: "https://eportal.incometax.gov.in/iec/foservices/#/login",
  INCOMETAX_REGISTER: "https://eportal.incometax.gov.in/iec/foservices/#/pre-login/register",
  LINK_ADHAAR: "https://eportal.incometax.gov.in/iec/foservices/#/pre-login/bl-link-aadhaar",
  TIN: "https://www.protean-tinpan.com/services/pan/pan-index.html",
  NSDL: "https://nsdl.co.in/",
  IEC: "https://www.iec.ch/homepage",
  UDYOG_ADHAAR: "https://services.india.gov.in/service/detail/udyog-aadhaar-online-registration-for-msme",
  NGSP: "https://services.india.gov.in/",
  MCA: "https://www.mca.gov.in/content/mca/global/en/home.html",
  MCA_LOGIN: "https://www.mca.gov.in/mcafoportal/login.do",
  DSC: "https://www.mca.gov.in/MinistryV2/acquiredsc.html",
  DIN: "https://www.mca.gov.in/MinistryV2/applyfordin.html#:~:text=The%20concept%20of%20a%20Director,(Amendment)%20Act%2C%202006.",
  LLP: "https://www.mca.gov.in/content/mca/global/en/home.html",
  CIN: "https://www.mca.gov.in/mcafoportal/findCIN.do",
  IPINDIA: "https://ipindia.gov.in/index.htm",
  TRADEMARK_REGISTRATION: "https://ipindia.gov.in/trade-marks.htm",
  STARTUP_INDIA: "https://www.startupindia.gov.in/",
  ISTART_RAJASTHAN: "https://istart.rajasthan.gov.in/",
  TRACES: "https://contents.tdscpc.gov.in/",
  DGFT: "https://www.dgft.gov.in/CP/",
  ICEGATE: "https://www.icegate.gov.in/",
  ROC: "https://www.mca.gov.in/content/mca/global/en/contact-us/roc.html"
}


export const durationType = ['today', 'currentMonth', 'currentQuarter', 'currentFY', 'previousFY', 'customRange'];

export const ALLOWED_IMG = ".jpg, .png, .jpeg";
export const ALLOWED_IMG_AND_FILE = ".jpg, .png, .jpeg, .pdf";
export const ALLOWED_IMG_NAME = "jpg, png, jpeg";
export const CompanyLogoSize = { size: 1000000, label: "Logo", sizeN: "1MB" }; //1mb