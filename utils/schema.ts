
import * as Yup from "yup";
import {
  emailDataType,
  invalidEmail ,
  fieldMinLength,
  fieldlMaxLength,
  fieldRequired,
  passwordNotMatched,
  integerAllow,
  numberAllow,
  contactLength,
  aadharLength,
  accountLength,
  hsnMinLength,
  hsnMaxLength
} from "./message";

const URLSchema = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i

export const signupSchema: any = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "First Name").replace("%length%", "3"))
    .max(250, fieldlMaxLength.replace("%key%", "First Name").replace("%length%", "250"))
    .required(fieldRequired.replace("%key%", "First Name")),
  lastName: Yup.string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "Last Name").replace("%length%", "3"))
    .max(250, fieldlMaxLength.replace("%key%", "Last Name").replace("%length%", "250"))
    .required(fieldRequired.replace("%key%", "Last Name")),
  email: Yup
    .string()
    .trim()
    .email(emailDataType)
    .max(250, fieldlMaxLength.replace("%key%", "Email").replace("%length%", "250"))
    .required(fieldRequired.replace("%key%", "Email")),
  mobile: Yup
    .number()
    .typeError(numberAllow)
    .integer(integerAllow)
    .min(1000000000, contactLength)
    .max(9999999999, contactLength)
    .required(fieldRequired.replace("%key%", "Contact number")),
  adminCode: Yup.string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "Admin Code").replace("%length%", "3"))
    .max(17, fieldlMaxLength.replace("%key%", "Admin Code").replace("%length%", "17"))
    .required(fieldRequired.replace("%key%", "Admin Code")),
  password: Yup
    .string()
    .trim()
    .min(8, fieldMinLength.replace("%key%", "Password").replace("%length%", "8"))
    .max(12, fieldlMaxLength.replace("%key%", "Password").replace("%length%", "12"))
    .required(fieldRequired.replace("%key%", "Password")),
  confirmPassword: Yup
    .string()
    .trim()
    .oneOf([Yup.ref('password'), ''], passwordNotMatched)
    .required(fieldRequired.replace("%key%", "Confirm Password")),
});

export const resetPWD: any = Yup.object().shape({
  otp: Yup
    .number()
    .typeError(numberAllow)
    .integer(integerAllow)
    .min(100000, "OTP must contain 6 digits.")
    .max(999999, "OTP must contain 6 digits.")
    .required(fieldRequired.replace("%key%", "OTP")),
  password: Yup
    .string()
    .trim()
    .min(8, fieldMinLength.replace("%key%", "Password").replace("%length%", "8"))
    .max(12, fieldlMaxLength.replace("%key%", "Password").replace("%length%", "12"))
    .required(fieldRequired.replace("%key%", "Password")),
  confirmPassword: Yup
    .string()
    .trim()
    .oneOf([Yup.ref('password'), ''], passwordNotMatched)
    .required(fieldRequired.replace("%key%", "Confirm Password")),
});

export const loginSchema: any = Yup.object().shape({

  role: Yup
    .string()
    .trim()
    .oneOf(['client', 'admin'])
    .required(fieldRequired.replace("%key%", "Role")),

  email: Yup
    .string()
    .trim()
    .email(emailDataType)
    .max(250, fieldlMaxLength.replace("%key%", "Email").replace("%length%", "250"))
    .required(fieldRequired.replace("%key%", "Email")),

  password: Yup
    .string()
    .trim()
    .required(fieldRequired.replace("%key%", "Password")),

});


export const mobileSchema: any = Yup.object().shape({
  mobile: Yup
    .number()
    .typeError(numberAllow)
    .integer(integerAllow)
    .min(1000000000, contactLength)
    .max(9999999999, contactLength)
    .required(fieldRequired.replace("%key%", "Contact number"))
});


export const emailSchema: any = Yup.object().shape({
  email: Yup
    .string()
    .typeError(emailDataType)
    .email(invalidEmail)
    .min(1)
    .max(9999999999)
    .required(fieldRequired.replace("%key%", "Email Id"))
});

export const addressOnly: any = Yup.object().shape({
  addresOne: Yup.string()
    .trim()
    .max(500, fieldlMaxLength.replace("%key%", "Address 1").replace("%length%", "500"))
    .required(fieldRequired.replace("%key%", "Address 1")),
  addresTwo: Yup.string()
    .trim()
    .max(500, fieldlMaxLength.replace("%key%", "Address 2").replace("%length%", "500")),
  country: Yup.string()
    .trim()
    .required(fieldRequired.replace("%key%", "Country")),
  state: Yup.string()
    .trim()
    .required(fieldRequired.replace("%key%", "State")),
  city: Yup.string()
    .trim()
    .required(fieldRequired.replace("%key%", "City")),
  zipCode: Yup
    .string()
    .trim()
    .min(5, fieldMinLength.replace("%key%", "Zip Code").replace("%length%", "5"))
    .max(6, fieldlMaxLength.replace("%key%", "Zip Code").replace("%length%", "6"))
    .required(fieldRequired.replace("%key%", "City")),
});

export const bankDetailsOnly: any = Yup.object().shape({

  bankName: Yup.string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "Bank name").replace("%length%", "3"))
    .max(250, fieldlMaxLength.replace("%key%", "Bank name").replace("%length%", "250"))
    .required(fieldRequired.replace("%key%", "Bank name")),
  accountNo: Yup
    .number()
    .typeError(numberAllow)
    .integer(integerAllow)
    .required(fieldRequired.replace("%key%", "Account Number")),
  beniFiciaryName: Yup.string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "Beneficiary name").replace("%length%", "3"))
    .max(1000, fieldlMaxLength.replace("%key%", "Beneficiary name").replace("%length%", "1000"))
    .required(fieldRequired.replace("%key%", "Beneficiary name")),
  ifscCode: Yup.string()
    .trim()
    .min(11, fieldMinLength.replace("%key%", "IFSC code").replace("%length%", "11"))
    .max(11, fieldlMaxLength.replace("%key%", "IFSC code").replace("%length%", "11"))
    .required(fieldRequired.replace("%key%", "IFSC code")),

});

export const pancardOnly: any = Yup.object().shape({
  nameAsPerPan: Yup
    .string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "Name As On Pancard").replace("%length%", "3"))
    .max(250, fieldlMaxLength.replace("%key%", "Name As On Pancard").replace("%length%", "250"))
    .required(fieldRequired.replace("%key%", "Name As On Pancard")),

  panNo: Yup
    .string()
    .trim()
    .min(10, fieldMinLength.replace("%key%", "Pancard Number").replace("%length%", "10"))
    .max(10, fieldlMaxLength.replace("%key%", "Pancard Number").replace("%length%", "10"))
    .matches(new RegExp(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/), 'Please enter the correct Pancard Number')
    .required(fieldRequired.replace("%key%", "Pancard Number")),

  fatherName: Yup.string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "Father Name").replace("%length%", "3"))
    .max(250, fieldlMaxLength.replace("%key%", "Father Name").replace("%length%", "250"))
    .required(fieldRequired.replace("%key%", "Father Name")),

  dob: Yup.string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "DOB").replace("%length%", "3"))
    .max(250, fieldlMaxLength.replace("%key%", "DOB").replace("%length%", "250"))
    .required(fieldRequired.replace("%key%", "DOB")),

});

export const customerSchema: any = Yup.object().shape({

  partyName: Yup.string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "Party Name").replace("%length%", "3"))
    .max(250, fieldlMaxLength.replace("%key%", "Party Name").replace("%length%", "250"))
    .required(fieldRequired.replace("%key%", "Party Name")),
  GSTIN_UIN: Yup.string()
    .trim()
    .min(15, fieldMinLength.replace("%key%", "GSTIN").replace("%length%", "15"))
    .max(15, fieldlMaxLength.replace("%key%", "GSTIN").replace("%length%", "15")),
  nameGSTIN: Yup.string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "Name as Per GSTIN").replace("%length%", "3"))
    .max(250, fieldlMaxLength.replace("%key%", "Name as Per GSTIN").replace("%length%", "250")),
  addresOne: Yup.string()
    .trim()
    .max(500, fieldlMaxLength.replace("%key%", "Address 1").replace("%length%", "500"))
    .required(fieldRequired.replace("%key%", "Address 1")),
  addresTwo: Yup.string()
    .trim()
    .max(500, fieldlMaxLength.replace("%key%", "Address 2").replace("%length%", "500")),
  country: Yup.string()
    .trim()
    .required(fieldRequired.replace("%key%", "Country")),
  state: Yup.string()
    .trim()
    .required(fieldRequired.replace("%key%", "State")),
  city: Yup.string()
    .trim()
    .required(fieldRequired.replace("%key%", "City")),
  // ledgerGroup: Yup.string()
  //   .trim()
  //   .required(fieldRequired.replace("%key%", "Ledger Group")),
  zipCode: Yup
    .string()
    .trim()
    .min(5, fieldMinLength.replace("%key%", "Zip Code").replace("%length%", "5"))
    .max(6, fieldlMaxLength.replace("%key%", "Zip Code").replace("%length%", "6")),
  email: Yup
    .string()
    .trim()
    .email(emailDataType)
    .max(250, fieldlMaxLength.replace("%key%", "Email").replace("%length%", "250")),
  mobile: Yup
    .number()
    .typeError(numberAllow)
    .integer(integerAllow)
    .min(1000000000, contactLength)
    .max(9999999999, contactLength)
    .required(fieldRequired.replace("%key%", "Contact number")),

});

export const itemSchema: any = Yup.object().shape({

  itemName: Yup.string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "Item Name").replace("%length%", "3"))
    .max(1000, fieldlMaxLength.replace("%key%", "Item Name").replace("%length%", "1000"))
    .required(fieldRequired.replace("%key%", "Item Name")),

  // hsn: Yup
  //   .number()
  //   .typeError(numberAllow)
  //   .integer(integerAllow)
  //   .min(100, hsnMinLength)
  //   .max(99999999, hsnMaxLength),

  hsn: Yup
    .string()
    .trim()
    .max(1000, fieldlMaxLength.replace("%key%", "HSN").replace("%length%", "1000")),

  unit: Yup
    .number()
    .typeError(numberAllow)
    .integer(integerAllow)
    .required(fieldRequired.replace("%key%", "Unit")),

  rate: Yup
    .number()
    .typeError(numberAllow)
    .integer(integerAllow),

  openingBalance: Yup
    .string()
    .trim()
    .max(1000, fieldlMaxLength.replace("%key%", "Opening Balance").replace("%length%", "1000")),

  openingRate: Yup
    .string()
    .trim()
    .max(1000, fieldlMaxLength.replace("%key%", "Opening Rate").replace("%length%", "1000"))
    .required(fieldRequired.replace("%key%", "Unit")),

  uom: Yup
    .string()
    .trim()
    .max(1000, fieldlMaxLength.replace("%key%", "UOM").replace("%length%", "1000")),

  description: Yup
    .string()
    .trim()
    .max(5000, fieldlMaxLength.replace("%key%", "Description").replace("%length%", "5000")),

});

export const supplierSchema: any = Yup.object().shape({

  partyName: Yup.string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "Party Name").replace("%length%", "3"))
    .max(250, fieldlMaxLength.replace("%key%", "Party Name").replace("%length%", "250"))
    .required(fieldRequired.replace("%key%", "Party Name")),
  gstin: Yup.string()
    .trim()
    .min(15, fieldMinLength.replace("%key%", "GSTIN").replace("%length%", "15"))
    .max(15, fieldlMaxLength.replace("%key%", "GSTIN").replace("%length%", "15")),
  nameGstin: Yup.string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "Name as Per GSTIN").replace("%length%", "3"))
    .max(250, fieldlMaxLength.replace("%key%", "Name as Per GSTIN").replace("%length%", "250")),
  addresOne: Yup.string()
    .trim()
    .max(500, fieldlMaxLength.replace("%key%", "Address 1").replace("%length%", "500"))
    .required(fieldRequired.replace("%key%", "Address 1")),
  addresTwo: Yup.string()
    .trim()
    .max(500, fieldlMaxLength.replace("%key%", "Address 2").replace("%length%", "500")),
  zipCode: Yup
    .string()
    .trim()
    .min(5, fieldMinLength.replace("%key%", "Zip Code").replace("%length%", "6"))
    .max(6, fieldlMaxLength.replace("%key%", "Zip Code").replace("%length%", "6")),
  mobile: Yup
    .number()
    .typeError(numberAllow)
    .integer(integerAllow)
    .min(1000000000, contactLength)
    .max(9999999999, contactLength)
    .required(fieldRequired.replace("%key%", "Contact number")),
  email: Yup
    .string()
    .trim()
    .email(emailDataType)
    .max(250, fieldlMaxLength.replace("%key%", "Email").replace("%length%", "250")),
  bankName: Yup.string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "Bank name").replace("%length%", "3"))
    .max(250, fieldlMaxLength.replace("%key%", "Bank name").replace("%length%", "250")),
  beneficiaryName: Yup.string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "Beneficiary name").replace("%length%", "3"))
    .max(1000, fieldlMaxLength.replace("%key%", "Beneficiary name").replace("%length%", "1000")),
  accountNumber: Yup
    .number()
    .typeError(numberAllow)
    .integer(integerAllow),
  ifscCode: Yup.string()
    .trim()
    .min(11, fieldMinLength.replace("%key%", "IFSC code").replace("%length%", "11"))
    .max(11, fieldlMaxLength.replace("%key%", "IFSC code").replace("%length%", "11")),


});

export const companySchemaFull: any = Yup.object().shape({

  companyName: Yup
    .string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "Company Name").replace("%length%", "3"))
    .max(500, fieldlMaxLength.replace("%key%", "Company Name").replace("%length%", "500"))
    .required(fieldRequired.replace("%key%", "Company Name")),
  noOfPartners: Yup
    .number()
    .typeError(numberAllow)
    .integer(integerAllow)
    .required(fieldRequired.replace("%key%", "Number of partner")),
  nameAsPerPan: Yup
    .string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "Name As On Pancard").replace("%length%", "3"))
    .max(250, fieldlMaxLength.replace("%key%", "Name As On Pancard").replace("%length%", "250"))
    .required(fieldRequired.replace("%key%", "Name As On Pancard")),
  address: Yup
    .string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "Address").replace("%length%", "3"))
    .max(1000, fieldlMaxLength.replace("%key%", "Address").replace("%length%", "1000"))
    .required(fieldRequired.replace("%key%", "Address")),
  country: Yup.string()
    .trim()
    .required(fieldRequired.replace("%key%", "Country")),
  state: Yup.string()
    .trim()
    .required(fieldRequired.replace("%key%", "State")),
  city: Yup.string()
    .trim()
    .required(fieldRequired.replace("%key%", "City")),
  zipCode: Yup
    .string()
    .trim()
    .min(5, fieldMinLength.replace("%key%", "Zip Code").replace("%length%", "5"))
    .max(6, fieldlMaxLength.replace("%key%", "Zip Code").replace("%length%", "6"))
    .required(fieldRequired.replace("%key%", "Zip Code")),
  tan: Yup
    .string()
    .trim()
    .min(10, fieldMinLength.replace("%key%", "TAN").replace("%length%", "10"))
    .max(10, fieldlMaxLength.replace("%key%", "TAN").replace("%length%", "10"))
    .required(fieldRequired.replace("%key%", "TAN")),
  pan_card: Yup
    .string()
    .trim()
    .min(10, fieldMinLength.replace("%key%", "Pancard Number").replace("%length%", "10"))
    .max(10, fieldlMaxLength.replace("%key%", "Pancard Number").replace("%length%", "10"))
    .matches(new RegExp(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/), 'Please enter the correct Pancard Number')
    .required(fieldRequired.replace("%key%", "Pancard Number")),
  type: Yup
    .string()
    .trim()
    .required(fieldRequired.replace("%key%", "Type")),

});


export const companySchema: any = Yup.object().shape({

  companyName: Yup
    .string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "Company Name").replace("%length%", "3"))
    .max(500, fieldlMaxLength.replace("%key%", "Company Name").replace("%length%", "500"))
    .required(fieldRequired.replace("%key%", "Company Name")),
  // noOfPartners: Yup
  //   .number()
  //   .typeError(numberAllow)
  //   .integer(integerAllow)
  //   .required(fieldRequired.replace("%key%", "Number of partner")),
  // nameAsPerPan: Yup
  //   .string()
  //   .trim()
  //   .min(3, fieldMinLength.replace("%key%", "Name As On Pancard").replace("%length%", "3"))
  //   .max(250, fieldlMaxLength.replace("%key%", "Name As On Pancard").replace("%length%", "250"))
  //   .required(fieldRequired.replace("%key%", "Name As On Pancard")),
  tan: Yup
    .string()
    .trim()
    .min(10, fieldMinLength.replace("%key%", "TAN").replace("%length%", "10"))
    .max(10, fieldlMaxLength.replace("%key%", "TAN").replace("%length%", "10"))
    .required(fieldRequired.replace("%key%", "TAN")),
  pan_card: Yup
    .string()
    .trim()
    .min(10, fieldMinLength.replace("%key%", "Pancard Number").replace("%length%", "10"))
    .max(10, fieldlMaxLength.replace("%key%", "Pancard Number").replace("%length%", "10"))
    .matches(new RegExp(/^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/), 'Please enter the correct Pancard Number')
    .required(fieldRequired.replace("%key%", "Pancard Number")),
  type: Yup
    .string()
    .trim()
    .required(fieldRequired.replace("%key%", "Type")),

});


export const userProfileSchema: any = Yup.object().shape({

  firstName: Yup.string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "First Name").replace("%length%", "3"))
    .max(250, fieldlMaxLength.replace("%key%", "First Name").replace("%length%", "250"))
    .required(fieldRequired.replace("%key%", "First Name")),
  lastName: Yup.string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "Last Name").replace("%length%", "3"))
    .max(250, fieldlMaxLength.replace("%key%", "Last Name").replace("%length%", "250"))
    .required(fieldRequired.replace("%key%", "Last Name")),
  gender: Yup
    .string()
    .trim()
    .oneOf(['male', 'female', 'other'])
    .required(fieldRequired.replace("%key%", "Gender")),
  email: Yup
    .string()
    .trim()
    .email(emailDataType)
    .max(250, fieldlMaxLength.replace("%key%", "Email").replace("%length%", "250"))
    .required(fieldRequired.replace("%key%", "Email")),
  mobile: Yup
    .number()
    .typeError(numberAllow)
    .integer(integerAllow)
    .min(1000000000, contactLength)
    .max(9999999999, contactLength)
    .required(fieldRequired.replace("%key%", "Contact number")),
  address: Yup
    .string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "Address").replace("%length%", "3"))
    .max(1000, fieldlMaxLength.replace("%key%", "Address").replace("%length%", "1000"))
    .required(fieldRequired.replace("%key%", "Address")),
  country: Yup.string()
    .trim()
    .required(fieldRequired.replace("%key%", "Country")),
  state: Yup.string()
    .trim()
    .required(fieldRequired.replace("%key%", "State")),
  city: Yup.string()
    .trim()
    .required(fieldRequired.replace("%key%", "City")),
  zipCode: Yup
    .string()
    .trim()
    .min(5, fieldMinLength.replace("%key%", "Zip Code").replace("%length%", "5"))
    .max(6, fieldlMaxLength.replace("%key%", "Zip Code").replace("%length%", "6"))
    .required(fieldRequired.replace("%key%", "Zip Code")),

});

export const dueDateSchema: any = Yup.object().shape({

  title: Yup.string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "Title").replace("%length%", "3"))
    .max(250, fieldlMaxLength.replace("%key%", "Title").replace("%length%", "250"))
    .required(fieldRequired.replace("%key%", "Title")),
  priority: Yup
    .string()
    .trim()
    .oneOf(['low', 'medium', 'high'])
    .required(fieldRequired.replace("%key%", "Priority")),
  color: Yup
    .string()
    .trim()
    .max(10, fieldlMaxLength.replace("%key%", "Color").replace("%length%", "10")),
  category: Yup
    .string()
    .trim()
    .max(250, fieldlMaxLength.replace("%key%", "Category").replace("%length%", "250"))
    .required(fieldRequired.replace("%key%", "Category")),

  eventDate: Yup
    .string()
    .trim()
    .required(fieldRequired.replace("%key%", "Date")),

  customCategory: Yup
    .string()
    .trim()
    .max(250, fieldlMaxLength.replace("%key%", "Custom Name").replace("%length%", "250")),

  description: Yup
    .string()
    .trim()
    .max(1000, fieldlMaxLength.replace("%key%", "Description").replace("%length%", "1000")),
});

export const querySchema: any = Yup.object().shape({
  title: Yup.string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "Title").replace("%length%", "3"))
    .max(250, fieldlMaxLength.replace("%key%", "Title").replace("%length%", "250"))
    .required(fieldRequired.replace("%key%", "Title")),
  priority: Yup
    .string()
    .trim()
    .oneOf(['low', 'medium', 'high'])
    .required(fieldRequired.replace("%key%", "Priority")),
  target: Yup
    .string()
    .trim()
    .max(250, fieldlMaxLength.replace("%key%", "Target").replace("%length%", "250"))
    .required(fieldRequired.replace("%key%", "Target")),
  description: Yup
    .string()
    .trim()
    .max(1000, fieldlMaxLength.replace("%key%", "Description").replace("%length%", "1000"))
    .required(fieldRequired.replace("%key%", "Description")),
});

export const addMeetingSchema: any = Yup.object().shape({

  title: Yup.string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "Title").replace("%length%", "3"))
    .max(250, fieldlMaxLength.replace("%key%", "Title").replace("%length%", "250"))
    .required(fieldRequired.replace("%key%", "Title")),
  eventDate: Yup
    .string()
    .trim()
    .required(fieldRequired.replace("%key%", "Date")),
  description: Yup
    .string()
    .trim()
    .max(1000, fieldlMaxLength.replace("%key%", "Description").replace("%length%", "1000")),
});


export const partnerAddSchema: any = Yup.object().shape({

  name: Yup.string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "Name").replace("%length%", "3"))
    .max(250, fieldlMaxLength.replace("%key%", "Name").replace("%length%", "250"))
    .required(fieldRequired.replace("%key%", "Name")),
  email: Yup
    .string()
    .trim()
    .email(emailDataType)
    .max(250, fieldlMaxLength.replace("%key%", "Email").replace("%length%", "250"))
    .required(fieldRequired.replace("%key%", "Email")),
  mobile: Yup
    .number()
    .typeError(numberAllow)
    .integer(integerAllow)
    .min(1000000000, contactLength)
    .max(9999999999, contactLength)
    .required(fieldRequired.replace("%key%", "Contact number")),
  dob: Yup.string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "DOB").replace("%length%", "3"))
    .max(250, fieldlMaxLength.replace("%key%", "DOB").replace("%length%", "250"))
    .required(fieldRequired.replace("%key%", "DOB")),
  panNo: Yup
    .string()
    .trim()
    .min(10, fieldMinLength.replace("%key%", "Pancard Number").replace("%length%", "10"))
    .max(10, fieldlMaxLength.replace("%key%", "Pancard Number").replace("%length%", "10"))
    .matches(new RegExp(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/), 'Please enter the correct Pancard Number')
    .required(fieldRequired.replace("%key%", "Pancard Number")),
  dinNo: Yup
    .string()
    .trim()
    .min(10, fieldMinLength.replace("%key%", "DIN Number").replace("%length%", "10"))
    .max(10, fieldlMaxLength.replace("%key%", "DIN Number").replace("%length%", "10")),
  // .required(fieldRequired.replace("%key%", "DIN Number")),
  aadhaarNo: Yup
    .number()
    .typeError(numberAllow)
    .integer(integerAllow)
    .min(100000000000, aadharLength)
    .max(999999999999, aadharLength),
  // .required(fieldRequired.replace("%key%", "Aadhaar number")),
  digitalPassword: Yup.string()
    .trim()
    .max(500, fieldlMaxLength.replace("%key%", "Digital Signature Password").replace("%length%", "500")),
  // .required(fieldRequired.replace("%key%", "Digital Signature Password")),
  digitalExpiryDate: Yup.string()
    .trim()
    .max(500, fieldlMaxLength.replace("%key%", "Digital Signature Expiry").replace("%length%", "500")),
  // .required(fieldRequired.replace("%key%", "Digital Signature Expiry")),
  addLine1: Yup.string()
    .trim()
    .max(500, fieldlMaxLength.replace("%key%", "Address 1").replace("%length%", "500")),
  // .required(fieldRequired.replace("%key%", "Address 1")),
  addLine2: Yup.string()
    .trim()
    .max(500, fieldlMaxLength.replace("%key%", "Address 2").replace("%length%", "500")),
  country: Yup.string()
    .trim(),
  // .required(fieldRequired.replace("%key%", "Country")),
  state: Yup.string()
    .trim(),
  // .required(fieldRequired.replace("%key%", "State")),
  city: Yup.string()
    .trim(),
  // .required(fieldRequired.replace("%key%", "City")),
  zipCode: Yup
    .string()
    .trim()
    .min(5, fieldMinLength.replace("%key%", "Zip Code").replace("%length%", "5"))
    .max(6, fieldlMaxLength.replace("%key%", "Zip Code").replace("%length%", "6")),
  // .required(fieldRequired.replace("%key%", "Zip Code")),

});


export const vaultAddSchema: any = Yup.object().shape({

  username: Yup.string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "Username").replace("%length%", "3"))
    .max(250, fieldlMaxLength.replace("%key%", "Username").replace("%length%", "250")),
  // .required(fieldRequired.replace("%key%", "Username")),

  registrationLink: Yup
    .string()
    .trim()
    .matches(URLSchema, "Enter a valid url")
    .required(fieldRequired.replace("%key%", "Registration Link")),

  password: Yup
    .string()
    .trim()
    .min(8, fieldMinLength.replace("%key%", "Password").replace("%length%", "8"))
    .max(12, fieldlMaxLength.replace("%key%", "Password").replace("%length%", "12")),
  // .required(fieldRequired.replace("%key%", "Password")),
  typeOfregistration: Yup
    .string()
    .trim()
    .required(fieldRequired.replace("%key%", "Type of Registration")),
  registrationNo: Yup
    .string()
    .trim()
    .required(fieldRequired.replace("%key%", "Registration Number")),
  expiryDate: Yup
    .string()
    .trim(),
  // .required(fieldRequired.replace("%key%", "Expiry Date")),

});


export const companyDetials: any = Yup.object().shape({

  name: Yup
    .string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "Company Name").replace("%length%", "3"))
    .max(500, fieldlMaxLength.replace("%key%", "Company Name").replace("%length%", "500"))
    .required(fieldRequired.replace("%key%", "Company Name")),
  email: Yup
    .string()
    .trim()
    .email(emailDataType)
    .max(250, fieldlMaxLength.replace("%key%", "Email").replace("%length%", "250"))
    .required(fieldRequired.replace("%key%", "Email")),
  mobile: Yup
    .number()
    .typeError(numberAllow)
    .integer(integerAllow)
    .min(1000000000, contactLength)
    .max(9999999999, contactLength)
    .required(fieldRequired.replace("%key%", "Contact number")),
  tan: Yup
    .string()
    .trim()
    .min(10, fieldMinLength.replace("%key%", "TAN").replace("%length%", "10"))
    .max(10, fieldlMaxLength.replace("%key%", "TAN").replace("%length%", "10"))
    .required(fieldRequired.replace("%key%", "TAN")),
  type: Yup
    .string()
    .trim()
    .required(fieldRequired.replace("%key%", "Type")),

});

export const addCompanySchema: any = Yup.object().shape({

  companyName: Yup
    .string()
    .trim()
    .min(3, fieldMinLength.replace("%key%", "Company Name").replace("%length%", "3"))
    .max(500, fieldlMaxLength.replace("%key%", "Company Name").replace("%length%", "500"))
    .required(fieldRequired.replace("%key%", "Company Name")),
  pan_card: Yup
    .string()
    .trim()
    .min(10, fieldMinLength.replace("%key%", "Pancard Number").replace("%length%", "10"))
    .max(10, fieldlMaxLength.replace("%key%", "Pancard Number").replace("%length%", "10"))
    .matches(new RegExp(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/), 'Please enter the correct Pancard Number')
    .required(fieldRequired.replace("%key%", "Pancard Number")),
  type: Yup
    .string()
    .trim()
    .required(fieldRequired.replace("%key%", "Type")),
  mobile: Yup
    .number()
    .typeError(numberAllow)
    .integer(integerAllow)
    .min(1000000000, contactLength)
    .max(9999999999, contactLength)
    .required(fieldRequired.replace("%key%", "Contact number")),
  email: Yup
    .string()
    .trim()
    .email(emailDataType)
    .max(250, fieldlMaxLength.replace("%key%", "Email").replace("%length%", "250"))
    .required(fieldRequired.replace("%key%", "Email")),
});