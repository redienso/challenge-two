import Comparable from "./comparable";

interface AppAttributes {
  name: string;
  contributors: string[];
  version: number;
  apdex: number;
}

export interface AppFromBack extends AppAttributes {
  host: string[];
}

export default class App implements Comparable<App> {
  attrs: AppAttributes;

  constructor(attributes: AppAttributes) {
    this.attrs = attributes;
  }

  compareTo(app: App) {
    return this.compareApdexTo(app);
  }

  private compareApdexTo(app: App) {
    return this.attrs.apdex - app.attrs.apdex;
  }

  isEquals(app: App) {
    return this.attrs.name == app.attrs.name;
  }
}
