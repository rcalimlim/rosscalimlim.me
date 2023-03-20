type TResume = {
  experience: TExperience[];
};

type TExperience = {
  jobTitle: string;
  location: string;
  start: Date;
  end: ?Date;
  experiences: string[];
};

type TSkill = {
  type: string;
  skills: string[];
};

type TEduction = {
  program: string;
  start: Date;
  end: ?Date;
  degree: string[];
};
