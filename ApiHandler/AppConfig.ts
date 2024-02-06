import { ApiHost, localHost } from '@/utils/constants';

const BASE_URL: string = ApiHost;

const endPoints: any = {
	sendWhatsapp : `https://graph.facebook.com/v17.0/106566122505895/messages`,
	signedUrl: `${BASE_URL}/aws-presigned`,

	login: `${BASE_URL}/auth/super/login`,

	getAdmins: `${BASE_URL}/super-admin/admin-list`,
	getClients: `${BASE_URL}/super-admin/clients-list`,
	getUsers: `${BASE_URL}/super-admin/users`,
	getCompanies: `${BASE_URL}/super-admin/companies-list`,
	getLicenses: `${BASE_URL}/super-admin/licenses`,
	getCompanyById: `${BASE_URL}/super-admin/company-detail`,
	getClientById: `${BASE_URL}/super-admin/client-detail`,

	adServer: `${BASE_URL}/super-admin/add-server`,
	userPasswordChange: `${BASE_URL}/users/change-password`,

	updateClientById: `${BASE_URL}/super-admin/update-client`,
	updateLicensesById: `${BASE_URL}/super-admin/update-license`,
}

export default endPoints;