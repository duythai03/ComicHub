import { ENDPOINT } from "@/constants/Endpoint";
import axios from "axios";

const publicRequest = axios.create({
	baseURL: ENDPOINT.BASE_URL_V1,
	headers: {
		"Content-Type": "application/json",
	},
});

export default publicRequest;
