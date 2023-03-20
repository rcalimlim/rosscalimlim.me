import { Nullable } from "../common.d";

export type TContact = {
  name: string;
  title: string;
  email: string;
  currentLocation: Nullable<string>;
  github: Nullable<URL>;
  linkedin: URL;
  phone: Nullable<string>;
  site: Nullable<URL>;
};

export default class ContactData extends Data<TContact> {
  private name: string;
  private title: string;
  private email: string;
  private currentLocation: Nullable<string> = null;
  private github: Nullable<string> = null;
  private linkedin: Nullable<string> = null;
  private phone: Nullable<string> = null;
  private site: Nullable<URL> = null;

  constructor(name: string, title: string, email: string) {
    super("ContactData");
    this.name = name;
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
    // validations
    if (this.linkedin === null) {
      throw new Error("Linkedin profile URL is required.");
    }

    return {
      name: this.name,
      title: this.title,
      email: this.email,
      currentLocation: this.currentLocation,
      github: this.github,
      linkedin: this.linkedin,
      phone: this.phone,
      site: this.site,
    };
  }

  /**
   * chainable methods
   */
  public setCurrentLocation(currentLocation: string): this {
    this.currentLocation = currentLocation;
    return this;
  }

  public setGithub(github: string): this {
    this.github = github;
    return this;
  }

  public setLinkedin(linkedin: string): this {
    this.linkedin = linkedin;
    return this;
  }

  public setPhone(phone: string): this {
    this.phone = phone;
    return this;
  }

  public setSite(site: URL): this {
    this.site = site;
    return this;
  }
}
