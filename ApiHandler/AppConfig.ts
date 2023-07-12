import { ApiHost, localHost } from '@/utils/constants';

const BASE_URL: string = ApiHost;

const endPoints: any = {

	signedUrl: `${BASE_URL}/aws-presigned`,

	// signup: `${BASE_URL}/auth/signup`,
	login: `${BASE_URL}/auth/super/login`,
	verifyOtp: `${BASE_URL}/auth/otp-verify`,
	resendOTPApi: `${BASE_URL}/ auth/send-auth-otp`,

	forgotPassword: `${BASE_URL}/auth/forgot-password`,
	resetPassword: `${BASE_URL}/auth/reset-password`,

	getAdmins :`${BASE_URL}/super-admin/admin-list`,
	getClients :`${BASE_URL}/super-admin/clients-list`,
	getCompanies :`${BASE_URL}/super-admin/companies-list`,
	getCompanyById: `${BASE_URL}/super-admin/company-detail`,
	getClientById: `${BASE_URL}/super-admin/client-detail`,

	sendWhatsapp : `https://graph.facebook.com/v17.0/106566122505895/messages`


	// addCompany: `${BASE_URL}/clients/add-company`,
	// getCompanies: `${BASE_URL}/clients/companies`,
	// getCompanyById: `${BASE_URL}/clients/get-company-details`,
	// updateCompany: `${BASE_URL}/clients/update-company`,



	// addPartner: `${BASE_URL}/clients/add-partner`,
	// updatePartner: `${BASE_URL}/clients/update-partner`,
	// deletePartner: `${BASE_URL}/clients/delete-partner`,

	// addPasswordVault: `${BASE_URL}/clients/add-password-vault`,
	// updatePasswordVault: `${BASE_URL}/clients/update-password-vault`,
	// deletePasswordVault: `${BASE_URL}/clients/delete-password-vault`,


	// getLedgers: `${BASE_URL}/clients/ledger-groups`,
	// getuoms: `${BASE_URL}/clients/uoms`,

	// getCustomers: `${BASE_URL}/clients/customers`,
	// addCustomerApi: `${BASE_URL}/clients/add-customer`,

	// getSupplier: `${BASE_URL}/clients/suppliers`,
	// addSupplier: `${BASE_URL}/clients/add-supplier`,

	// getItems: `${BASE_URL}/clients/items`,
	// addItems: `${BASE_URL}/clients/add-item`,

	// getAllCountry: `${BASE_URL}/get-country`,
	// getStates: `${BASE_URL}/get-state`,
	// getCities: `${BASE_URL}/get-city`,
	// getBanks: `${BASE_URL}/banks`,

	// getItemWiseSales: `${BASE_URL}/clients/sales-itemwise`,


	//mis
	// salesMonthly: `${BASE_URL}/mis/sales-monthly`,
	// salesByInvoice: `${BASE_URL}/mis/sales-by-invoice`,
	// salesRegister: `${BASE_URL}/mis/sales-register`,
	// salesCustomerwise: `${BASE_URL}/mis/sales-customerwise`,
	// salesItemwise: `${BASE_URL}/mis/sales-itemwise`,


	//receivable
	// salesReceipt: `${BASE_URL}/mis/sales-receipt`,
	// accountLedger: `${BASE_URL}/mis/account-ledger`,
	// receivableByTally: `${BASE_URL}/mis/receivable-by-tally`,
	// receivableFifo: `${BASE_URL}/mis/receivable-fifo`,

	//expenses
	// vendorWise: `${BASE_URL}/mis/expenses-vendorwise`,
	// categoryWise: `${BASE_URL}/mis/expenses-categorywise`,
	// expenseRegister: `${BASE_URL}/mis/expenses-register`,
	// expensePerformance: `${BASE_URL}/mis/expenses-performance`,

	//payables
	// payablesExpenses: `${BASE_URL}/mis/expenses-register`,
	// payablesPayments: `${BASE_URL}/mis/expenses-payment`,

	// voucherDetails: `${BASE_URL}/mis/voucher-details`,


}

export default endPoints;