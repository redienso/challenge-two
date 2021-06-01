interface AppAttributes {
	name: string;
	contributors: string[];
	version: number;
	apdex: number;
}

export interface AppFromBack extends AppAttributes {
	host: string[];
}

export default class App {
	attrs: AppAttributes;

	constructor(attributes: AppAttributes) {
		this.attrs = attributes;
	}

	compareApdexTo(app: App) {
		return this.attrs.apdex - app.attrs.apdex;
	}

	isEquals(app: App) {
		return this.attrs.name == app.attrs.name;
	}
};
