export type TSkill = {
  skillType: SkillType;
  skills: string[];
};

enum SkillType {
  DEVELOPMENT = "Development",
  TESTING_AND_DEPLOYMENT = "Testing and Deployment",
  DEVELOPER_TOOLS = "Developer Tools",
}

export default class SkillData extends Data<TSkill> {
  private skillType: SkillType;
  private skills: string[] = [];

  constructor(skillType: SkillType) {
    super("SkillData");
    this.skillType = skillType;
  }

  /*
   * Get the intended shape for this data.
   *
   * input: none
   * output: TContact
   */
  public read(): TSkill {
    // validations
    if (this.skills.length === 0) {
      throw new Error("Must have at least one skill for this type.");
    }

    return {
      skillType: this.skillType,
      skills: this.skills,
    };
  }

  /*
   * chainable methods
   */

  /**
   * Adds a skills to the skill list in order.
   *
   * input: string
   * output: this
   */
  public addSkill(skill: string): this {
    this.skills.push(skill);
    return this;
  }
}
