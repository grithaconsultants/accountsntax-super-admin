import { ApiHost, localHost } from '@/utils/constants';

const BASE_URL: string = ApiHost;

const endPoints: any = {
	
	login: `${BASE_URL}/auth/login`,
	signup: `${BASE_URL}/auth/signup`,
	verifyOtp: `${BASE_URL}/auth/otp-verify`,
	resendOTPApi: `${BASE_URL}/auth/send-auth-otp`,
}

export default endPoints;