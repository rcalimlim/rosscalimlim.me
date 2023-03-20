import { Nullable } from "../common.d";

export type TExperience = {
  company: string;
  jobTitle: string;
  location: string;
  start: Date;
  end: Nullable<Date>;
  bulletPoints: string[];
};

export default class ExperienceData extends Data<TExperience> {
  private company: string;
  private jobTitle: string;
  private location: string;
  private start: Nullable<Date> = null;
  private end: Nullable<Date> = null;
  private bulletPoints: string[] = [];
  private isCurrent: boolean = false;

  constructor(company: string, jobTitle: string, location: string) {
    super("ContactData");
    this.company = company;
    this.jobTitle = jobTitle;
    this.location = location;
  }

  /*
   * Get the intended shape for this data.
   *
   * input: none
   * output: TContact
   */
  public read(): TExperience {
    // validations
    if (this.start === null) {
      throw new Error("Experience must have a start date.");
    }
    if (this.end === null && !this.isCurrent) {
      throw new Error("Experience must have an end date if not ongoing.");
    }
    if (this.bulletPoints.length < 3 || this.bulletPoints.length > 6) {
      throw new Error("Experience must have bettwen 3-6 bullet points.");
    }

    return {
      company: this.company,
      jobTitle: this.jobTitle,
      location: this.location,
      start: this.start,
      end: this.end,
      bulletPoints: this.bulletPoints,
    };
  }

  /*
   * chainable methods
   */
  public setStart(start: Date): this {
    this.start = start;
    return this;
  }

  public setEnd(end: Date): this {
    this.end = end;
    return this;
  }

  public setAsCurrent(): this {
    this.isCurrent = true;
    return this;
  }

  public addBulletPoint(bulletPoint: string): this {
    this.bulletPoints.push(bulletPoint);
    return this;
  }
}
