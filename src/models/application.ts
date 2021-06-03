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

export default class Applitaction implements Comparable<Applitaction> {
  attrs: AppAttributes;

  constructor(attributes: AppAttributes) {
    this.attrs = attributes;
  }

  compareTo(app: Applitaction) {
    return this.compareApdexTo(app);
  }

  private compareApdexTo(app: Applitaction) {
    return this.attrs.apdex - app.attrs.apdex;
  }

  isEquals(app: Applitaction) {
    return this.attrs.name == app.attrs.name;
  }
}
