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

export default class Application implements Guest<Application> {
  private attrs: AppAttributes;

  constructor(attributes: AppAttributes) {
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

  isEquals(app: Application) {
    return this.get("name") == app.get("name");
  }
}
