export type Nullable<T> = T | null;

export abstract class Data<TReturn> {
  protected type: string;

  constructor(type: string) {
    this.type = type;
  }

  public getTypeName(): string {
    return this.type;
  }

  public abstract read(): TReturn;

  public abstract getError(msg: string): DataError;
}

export type THyperlink = {
  displayText: string;
  url: string;
};

export class HyperlinkData extends Data<THyperlink> {
  private displayText: string;
  private url: string;

  constructor(displayText: string, url: string) {
    super("HyperlinkData");
    this.displayText = displayText;
    this.url = url;
  }

  public read(): THyperlink {
    return {
      displayText: this.displayText,
      url: this.url,
    };
  }

  public getError(msg: string): DataError {
    return new DataError(this.type, "hyperlink", msg);
  }
}

export class DataError extends Error {
  constructor(type: string, identifier: string, msg: string) {
    super(`[${type}] "${identifier}": ${msg}`);
  }
}
