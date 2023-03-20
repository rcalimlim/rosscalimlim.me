// type TContact = {
//   email: string;
//   github: ?string;
//   linkedin: ?string;
//   phone: ?string;
//   site: ?URL;
// };

class Contact {
  private email: ?string;
  private github: ?string;
  private linkedin: ?string;
  private phone: ?string;
  private site: ?URL;

  public static create(): TContact {}

  // chainable methods
  public setEmail(email: string): this {
    this.email = email;
    return this;
  }

  public setEmail(email: string) {
    this.email = email;
  }
}
