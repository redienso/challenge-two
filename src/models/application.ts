import Comparable from "./comparable";

export interface AppAttributes {
  name: string;
  contributors: string[];
  version: number;
  apdex: number;
}

export interface AppFromBack extends AppAttributes {
  host: string[];
}

export default class Application implements Comparable<Application> {
  attrs: AppAttributes;

  constructor(attributes: AppAttributes) {
    this.attrs = attributes;
  }

  compareTo(app: Application) {
    return this.compareApdexTo(app);
  }

  private compareApdexTo(app: Application) {
    return this.attrs.apdex - app.attrs.apdex;
  }

  isEquals(app: Application) {
    return this.attrs.name == app.attrs.name;
  }
}
