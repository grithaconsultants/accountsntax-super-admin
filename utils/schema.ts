
import * as Yup from "yup";
import {
  emailDataType,
  fieldMinLength,
  fieldlMaxLength,
  fieldRequired,
  passwordNotMatched,
  integerAllow,
  numberAllow,
  contactLength,
  accountLength,
  hsnMinLength,
  hsnMaxLength
} from "./message";

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
    .trim()
    .email(emailDataType)
    .max(250, fieldlMaxLength.replace("%key%", "Email").replace("%length%", "250"))
    .required(fieldRequired.replace("%key%", "Email")),
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
  // country: Yup.string()
  //   .trim()
  //   .required(fieldRequired.replace("%key%", "Country")),
  // state: Yup.string()
  //   .trim()
  //   .required(fieldRequired.replace("%key%", "State")),
  // city: Yup.string()
  //   .trim()
  //   .required(fieldRequired.replace("%key%", "City")),
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
    .min(10, fieldMinLength.replace("%key%", "Tan").replace("%length%", "10"))
    .max(10, fieldlMaxLength.replace("%key%", "Tan").replace("%length%", "10"))
    .required(fieldRequired.replace("%key%", "Tan")),
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
  tan: Yup
    .string()
    .trim()
    .min(10, fieldMinLength.replace("%key%", "Tan").replace("%length%", "10"))
    .max(10, fieldlMaxLength.replace("%key%", "Tan").replace("%length%", "10"))
    .required(fieldRequired.replace("%key%", "Tan")),
  pan_card: Yup
    .string()
    .trim()
    .min(10, fieldMinLength.replace("%key%", "Pancard Number").replace("%length%", "10"))
    .max(10, fieldlMaxLength.replace("%key%", "Pancard Number").replace("%length%", "10"))
    .matches(new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/), 'Please enter the correct Pancard Number')
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