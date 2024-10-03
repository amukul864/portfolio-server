declare namespace NodeJS {
	export interface ProcessEnv {
		MONGODB_CONNECTION_STRING: string;
		PORT?: number;
		USER_MAIL: string;
		MAIL_SERVICE: string;
		MAIL_PASSWORD: string;
		PRIVATE_KEY: string;
		NODE_ENV: "development" | "production";
		CLIENT_URL: string;
	}
}
