import {
  Data,
  DataError,
  HyperlinkData,
  Nullable,
  THyperlink,
} from "../baseData";

export type TContact = {
  firstName: string;
  middleName: string;
  lastName: string;
  title: string;
  email: string;
  currentLocation: Nullable<string>;
  phone: Nullable<string>;
  github: Nullable<THyperlink>;
  linkedin: Nullable<THyperlink>;
  site: Nullable<THyperlink>;
};

export default class ContactData extends Data<TContact> {
  private firstName: string;
  private middleName: string;
  private lastName: string;
  private title: string;
  private email: string;
  private currentLocation: Nullable<string> = null;
  private phone: Nullable<string> = null;
  private github: Nullable<THyperlink> = null;
  private linkedin: Nullable<THyperlink> = null;
  private site: Nullable<THyperlink> = null;

  constructor(
    firstName: string,
    middleName: string,
    lastName: string,
    title: string,
    email: string
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
  public setCurrentLocation(currentLocation: string): this {
    this.currentLocation = currentLocation;
    return this;
  }

  public setPhone(phone: string): this {
    this.phone = phone;
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
