import Findable from "./findable";
export default abstract class Guest<T extends Findable<T>>
  implements Findable<T>
{
  private _id: string;

  constructor(id: string) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  abstract compareTo(t: T): number;

  isEquals(t: T): boolean {
    return this.id === t.id;
  }
}
