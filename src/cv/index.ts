import ResumeData from "./resume";
import ContactData from "./classes/contact";
import ExperienceData from "./classes/experience";

// **********************************************
// Begin resume
// **********************************************
const resume = new ResumeData();

// **********************************************
// Contact
// **********************************************
const ME = new ContactData(
  "Ross Calimlim",
  "Software Engineer",
  "ross.calimlim@gmail.com"
)
  .setCurrentLocation("Jersey City, NJ")
  .setGithub("rcalimlim")
  .setLinkedin("rcalimlim")
  .setPhone("(646) 270-1475")
  .read();
resume.setContact(ME);

// **********************************************
// Experience
// **********************************************
const META = new ExperienceData(
  "Meta",
  "Software Engineer",
  "Remote/San Francisco, CA"
)
  .setStart(new Date(2022, 4))
  .setAsCurrent()
  .addBulletPoint("")
  .read();

const IFIT = new ExperienceData("iFIT", "Platform Engineer", "Remote/Logan, UT")
  .setStart(new Date(2020, 9))
  .setEnd(new Date(2022, 1))
  .addBulletPoint("")
  .read();
resume.setExperience([META, IFIT]);
