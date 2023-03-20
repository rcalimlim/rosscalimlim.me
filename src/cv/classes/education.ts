import { Nullable } from "../common.d";
import Degree, { TDegree } from "./degree";

export type TEducation = {
  program: string;
  start: Date;
  end: Nullable<Date>;
  degrees: TDegree[];
};

export default class EducationData extends Data<TEducation> {
  private program: string;
  private start: Nullable<Date> = null;
  private end: Nullable<Date> = null;
  private degrees: TDegree[] = [];
  private isCurrent: boolean = false;

  constructor(program: string) {
    super("EducationData");
    this.program = program;
  }

  /*
   * Get the intended shape for this data.
   *
   * input: none
   * output: TContact
   */
  public read(): TEducation {
    if (this.start === null) {
      throw new Error("Education must have a start date.");
    }
    if (this.end === null && !this.isCurrent) {
      throw new Error("Education must have an end date if not ongoing.");
    }
    if (this.degrees.length === 0) {
      throw new Error("Education must have at least one degree");
    }

    return {
      program: this.program,
      start: this.start,
      end: this.end,
      degrees: this.degrees,
    };
  }

  /*
   * chainable methods
   */

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
