import { Data, DataError, Nullable } from "../common";
import { format } from "date-fns";

export type TExperience = {
  company: string;
  jobTitle: string;
  location: string;
  start: string;
  end: string;
  isCurrent: boolean;
  bulletPoints: string[];
};

export default class ExperienceData extends Data<TExperience> {
  private company: string;
  private jobTitle: string;
  private location: string;
  private start: Nullable<Date> = null;
  private end: Nullable<Date> = null;
  private isCurrent: boolean = false;
  private bulletPoints: string[] = [];

  constructor(company: string, jobTitle: string, location: string) {
    super("ExperienceData");
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
      throw this.getError("must have a start date");
    }
    if (this.end === null && !this.isCurrent) {
      throw this.getError("must have an end date if not ongoing");
    }
    if (this.bulletPoints.length < 3 || this.bulletPoints.length > 6) {
      throw this.getError("must have between 3-6 bullet points");
    }

    const startFormatted = format(this.start, "MMM yyyy");
    const endFormatted =
      this.end === null ? "Current" : format(this.end, "MMM yyyy");
    return {
      company: this.company,
      jobTitle: this.jobTitle,
      location: this.location,
      start: startFormatted,
      end: endFormatted,
      isCurrent: this.isCurrent,
      bulletPoints: this.bulletPoints,
    };
  }

  public getError(msg: string): DataError {
    return new DataError(this.type, this.company, msg);
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
