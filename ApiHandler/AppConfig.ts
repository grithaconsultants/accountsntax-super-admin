import { ApiHost, localHost } from '@/utils/constants';

const BASE_URL: string = ApiHost;

const endPoints: any = {
	sendWhatsapp : `https://graph.facebook.com/v17.0/106566122505895/messages`,
	signedUrl: `${BASE_URL}/aws-presigned`,

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
}

export default endPoints;