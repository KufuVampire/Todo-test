export class StorageService {
	static getItem(key: string, initial: unknown = null) {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : initial;
	}

	static setItem(key: string, value: unknown) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	static removeItem(key: string) {
		localStorage.removeItem(key);
	}
}
