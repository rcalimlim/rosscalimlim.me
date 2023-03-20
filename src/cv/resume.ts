import { Data, DataError, Nullable } from "./baseData";
import { TContact } from "./classes/contact";
import { TEducation } from "./classes/education";
import { TExperience } from "./classes/experience";
import { TSkill } from "./classes/skill";

export type TResume = {
  contact: TContact;
  education: TEducation[];
  experience: TExperience[];
  skills: TSkill[];
};

// TODO: pull out magic numbers into config file (maybe yaml)
//       or just keep them in each file
export default class ResumeData extends Data<TResume> {
  private contact: Nullable<TContact> = null;
  private education: TEducation[] = [];
  private experience: TExperience[] = [];
  private skills: TSkill[] = [];

  constructor() {
    super("ResumeData");
  }

  public read(): TResume {
    // validations
    if (this.contact === null) {
      throw this.getError("contact info must be set");
    }
    if (this.education.length === 0) {
      throw this.getError(
        "education section must have at least one education item"
      );
    }
    if (this.experience.length < 2 || this.experience.length > 4) {
      throw this.getError("experience section must have 3 or 4 items");
    }
    if (this.skills.length < 1) {
      throw this.getError("skill section must have at least 1 skill type.");
    }

    return {
      contact: this.contact,
      education: this.education,
      experience: this.experience,
      skills: this.skills,
    };
  }

  public getError(msg: string): DataError {
    return new DataError(this.type, "resume", msg);
  }

  /**
   * chainable methods
   */
  public setContact(contact: TContact): this {
    this.contact = contact;
    return this;
  }

  public setEducation(education: TEducation[]): this {
    this.education = education;
    return this;
  }

  public setExperience(experience: TExperience[]): this {
    this.experience = experience;
    return this;
  }

  public setSkills(skills: TSkill[]): this {
    this.skills = skills;
    return this;
  }
}
