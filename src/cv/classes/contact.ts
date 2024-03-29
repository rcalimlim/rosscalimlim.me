import {
  Data,
  DataError,
  HyperlinkData,
  Nullable,
  THyperlink,
} from "../common";

export type TContact = {
  firstName: string;
  middleName: string;
  lastName: string;
  title: string;
  email: THyperlink;
  summary: Nullable<string>;
  currentLocation: Nullable<string>;
  phone: Nullable<THyperlink>;
  github: Nullable<THyperlink>;
  linkedin: Nullable<THyperlink>;
  site: Nullable<THyperlink>;
};

export default class ContactData extends Data<TContact> {
  private firstName: string;
  private middleName: string;
  private lastName: string;
  private title: string;
  private email: THyperlink;
  private summary: Nullable<string> = null;
  private currentLocation: Nullable<string> = null;
  private phone: Nullable<THyperlink> = null;
  private github: Nullable<THyperlink> = null;
  private linkedin: Nullable<THyperlink> = null;
  private site: Nullable<THyperlink> = null;

  constructor(
    firstName: string,
    middleName: string,
    lastName: string,
    title: string,
    email: THyperlink
  ) {
    super("ContactData");
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.title = title;
    this.email = email;
  }

  /*
   * Get the intended shape for this data.
   *
   * input: none
   * output: TContact
   */
  public read(): TContact {
    return {
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      title: this.title,
      summary: this.summary,
      email: this.email,
      currentLocation: this.currentLocation,
      github: this.github,
      linkedin: this.linkedin,
      phone: this.phone,
      site: this.site,
    };
  }

  public getError(msg: string): DataError {
    return new DataError(this.type, "contact", msg);
  }

  /**
   * chainable methods
   */
  public setSummary(summary: string): this {
    this.summary = summary;
    return this;
  }

  public setCurrentLocation(currentLocation: string): this {
    this.currentLocation = currentLocation;
    return this;
  }

  public setPhone(displayName: string, url: string): this {
    this.phone = new HyperlinkData(displayName, url).read();
    return this;
  }

  public setGithub(displayName: string, url: string): this {
    this.github = new HyperlinkData(displayName, url).read();
    return this;
  }

  public setLinkedin(displayName: string, url: string): this {
    this.linkedin = new HyperlinkData(displayName, url).read();
    return this;
  }

  public setSite(displayName: string, url: string): this {
    this.site = new HyperlinkData(displayName, url).read();
    return this;
  }
}
