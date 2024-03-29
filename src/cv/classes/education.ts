import { format } from "date-fns";
import { Data, DataError, Nullable } from "../common";
import Degree, { TDegree } from "./degree";

export type TEducation = {
  organization: string;
  location: string;
  start: string;
  end: string;
  isCurrent: boolean;
  degrees: TDegree[];
};

export default class EducationData extends Data<TEducation> {
  private organization: string;
  private location: Nullable<string> = null;
  private start: Nullable<Date> = null;
  private end: Nullable<Date> = null;
  private degrees: TDegree[] = [];
  private isCurrent: boolean = false;

  constructor(organization: string) {
    super("EducationData");
    this.organization = organization;
  }

  /*
   * Get the intended shape for this data.
   *
   * input: none
   * output: TContact
   */
  public read(): TEducation {
    if (this.start === null) {
      throw this.getError("must have a start date");
    }
    if (this.end === null && !this.isCurrent) {
      throw this.getError("must have an end date");
    }
    if (this.degrees.length === 0) {
      throw this.getError("must have at least one degree");
    }
    if (this.location === null) {
      throw this.getError("must have a location");
    }

    const startFormatted = format(this.start, "MMM yyyy");
    const endFormatted =
      this.end === null ? "Current" : format(this.end, "MMM yyyy");
    return {
      organization: this.organization,
      location: this.location,
      start: startFormatted,
      end: endFormatted,
      isCurrent: this.isCurrent,
      degrees: this.degrees,
    };
  }

  public getError(msg: string): DataError {
    return new DataError(this.type, this.organization, msg);
  }

  /*
   * chainable methods
   */
  public setLocation(location: string): this {
    this.location = location;
    return this;
  }

  // TODO: implement mixins for time span data
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

  public addDegree(program: string, focus: string): this {
    this.degrees.push(new Degree(program, focus).read());
    return this;
  }
}
