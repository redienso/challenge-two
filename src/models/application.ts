import Guest from "./abstract/guest";
export interface AppAttributes {
  name: string;
  contributors: string[];
  version: number;
  apdex: number;
}

export interface AppFromBack extends AppAttributes {
  host: string[];
}

export default class Application extends Guest<Application> {
  private attrs: AppAttributes;

  constructor(attributes: AppAttributes) {
    super(attributes.name);
    this.attrs = attributes;
  }

  get<K extends keyof AppAttributes>(key: K): AppAttributes[K] {
    return this.attrs[key];
  }

  compareTo(app: Application) {
    return this.compareApdexTo(app);
  }

  private compareApdexTo(app: Application) {
    return this.get("apdex") - app.get("apdex");
  }
}
