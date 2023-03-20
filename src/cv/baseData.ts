abstract class Data<TReturn> {
  private type: string;

  constructor(type: string) {
    this.type = type;
  }

  public getTypeName(): string {
    return this.type;
  }

  public abstract read(): TReturn;
}
