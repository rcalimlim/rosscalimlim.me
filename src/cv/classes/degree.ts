export type TDegree = {
  degreeName: string;
  focus: string;
};

export default class DegreeData extends Data<TDegree> {
  private degreeName: string;
  private focus: string;

  constructor(degreeName: string, focus: string) {
    super("DegreeData");
    this.degreeName = degreeName;
    this.focus = focus;
  }

  public read(): TDegree {
    return {
      degreeName: this.degreeName,
      focus: this.focus,
    };
  }
}
