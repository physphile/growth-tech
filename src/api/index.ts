import axios from 'axios';

export class Api {
	public static getUsers() {
		return axios.get(`${import.meta.env.VITE_API_URL}/users`);
	}

	public static getUser(id: string) {
		return axios.get(`${import.meta.env.VITE_API_URL}/users/${id}`);
	}

	public static createUser(username: string) {
		return axios.post(`${import.meta.env.VITE_API_URL}/create_user`, { user_name: username });
	}

	public static uploadFile(file: File) {}
}
