import ResumeData from "./classes/resume";
import ContactData from "./classes/contact";
import ExperienceData from "./classes/experience";
import SkillData, { SkillType } from "./classes/skill";
import EducationData from "./classes/education";
import { HyperlinkData } from "./common";

/**
 * Build resume then output to json file
 */

// **********************************************
// Begin resume
// **********************************************
const resume = new ResumeData();

// **********************************************
// Contact
// **********************************************
const email = new HyperlinkData(
  "ross.calimlim@gmail.com",
  "mailto:ross.calimlim@gmail.com"
);
const ME = new ContactData(
  "Ross",
  "F.",
  "Calimlim",
  "Software Engineer",
  email.read()
)
  .setSummary(
    "Current Backend Software Engineer at Meta. " +
      "Experienced with scalable, cloud-native, " +
      "micro-services, and API design/implementation."
  )
  .setCurrentLocation("Brooklyn, NYC")
  .setSite("rcalimlim.me", "https://rcalimlim.me/")
  .setGithub("rcalimlim", "https://github.com/rcalimlim/")
  .setLinkedin("rcalimlim", "https://www.linkedin.com/in/rcalimlim/")
  .setPhone("+16462701475", "tel:+16462701475")
  .read();

// add contact data
resume.setContact(ME);

// **********************************************
// Experience
// **********************************************
// exp - wayfair
const WAYFAIR = new ExperienceData(
  "Wayfair",
  "Software Engineer",
  "Remote/Brooklyn, NY"
)
  .setStart(new Date(2023, 6))
  .setAsCurrent()
  .addBulletPoint(
    "Design and implement a platform service to standardize Apollo Federation Subgraphs across all teams using TypeScript/Node.js",
  )
  .addBulletPoint(
    "Build Docker-based continuous integration plugins that provide actionable feedback for subgraph developers to fix breaking changes before getting to production"
  )
  .addBulletPoint(
    "Create automated rollback workflows with Bash scripting that trigger based on programmatic thresholds to minimize impact to customers during a production issue"
  )
  .read();

// exp - meta
const META = new ExperienceData(
  "Meta",
  "Software Engineer",
  "Remote/San Francisco, CA"
)
  .setStart(new Date(2022, 4))
  .setEnd(new Date(2023, 4))
  .addBulletPoint(
    "Led the migration of critical components of FB Messaging to a high-performance message sync framework, enabling end-to-end encryption, platform interoperability, and privacy compliance"
  )
  .addBulletPoint(
    "Built a new FB Messaging feature for group member reporting, providing parity with Messenger and supporting a high-priority wellbeing initiative"
  )
  .addBulletPoint(
    "Improved messaging and logging infrastructure by implementing privacy-aware annotations and removing unused, unsafe loggers, in compliance with stringent privacy expectations"
  )
  .addBulletPoint(
    "Spearheaded the development and implementation of a new GraphQL API for message threads, significantly reducing client overhead by shifting compute to the server"
  )
  .read();

// exp - ifit
const IFIT = new ExperienceData("iFIT", "Platform Engineer", "Remote/Logan, UT")
  .setStart(new Date(2020, 9))
  .setEnd(new Date(2022, 1))
  .addBulletPoint(
    "Designed and developed cloud-native, event-based workout runner service to provide new functionality, scalability, and resiliency to end users, as well as enabled full internal and third-party application integration"
  )
  .addBulletPoint(
    "Set team direction, created technical specifications, and delegated development tasks to workout runner team to maintain cohesiveness and improve development velocity"
  )
  .addBulletPoint(
    "Managed a team of four software engineers as initial Tech Lead for workout runner project"
  )
  .read();

// exp - stylust
const STYLUST = new ExperienceData(
  "Stylust",
  "Fullstack Software Engineer",
  "Austin, TX"
)
  .setStart(new Date(2019, 9))
  .setEnd(new Date(2020, 8))
  .addBulletPoint(
    "Designed and developed Node.js REST API as organization’s main platform service, integrating it with third-party messaging/payment vendors and MySQL/PostgreSQL to streamline customer service workflows"
  )
  .addBulletPoint(
    "Built standalone, internal frontend tools with Vue.js/React to phase out legacy system and increase order fulfillment velocity"
  )
  .addBulletPoint(
    "Standardized use of TypeScript across all projects, to more quickly develop bug-free services and applications"
  )
  .read();

// add experiences in order
resume.setExperience([WAYFAIR, META, IFIT, STYLUST]);

// **********************************************
// Skills
// **********************************************
const DEVELOPMENT = new SkillData(SkillType.DEVELOPMENT)
  .addSkill("JavaScript")
  .addSkill("TypeScript")
  .addSkill("PHP")
  .addSkill("Hack")
  .addSkill("C#")
  .addSkill("Java")
  .addSkill("Rust")
  .addSkill("Express")
  .addSkill("node.js")
  .addSkill("RESTful API Development")
  .addSkill("MySQL")
  .addSkill("PostgreSQL")
  .addSkill("MongoDB")
  .read();

const TESTING_AND_DEPLOYMENT = new SkillData(SkillType.TESTING_AND_DEPLOYMENT)
  .addSkill("Serverless")
  .addSkill("AWS Cloud Suite")
  .addSkill("GCP Suite")
  .addSkill("GitHub Actions")
  .addSkill("Travis CI")
  .addSkill("Docker")
  .addSkill("Jest")
  .addSkill("Mocha")
  .addSkill("Chai")
  .addSkill("Enzyme")
  .addSkill("Artillery")
  .read();

const DEVELOPER_TOOLS = new SkillData(SkillType.DEVELOPER_TOOLS)
  .addSkill("git")
  .addSkill("yarn")
  .addSkill("npm")
  .addSkill("Neovim")
  .addSkill("JIRA")
  .addSkill("TDD")
  .addSkill("Unix-likes")
  .addSkill("Agile")
  .addSkill("GitHub")
  .addSkill("Trello")
  .addSkill("Postman")
  .read();

// set skills in order
resume.setSkills([DEVELOPMENT, TESTING_AND_DEPLOYMENT, DEVELOPER_TOOLS]);

// **********************************************
// Education
// **********************************************
const HACK_REACTOR = new EducationData("Hack Reactor")
  .setLocation("Austin, TX")
  .setStart(new Date(2019, 4))
  .setEnd(new Date(2019, 7))
  .addDegree("Certificate", "Advanced Software Engineering Immersive")
  .read();

const BARUCH = new EducationData("Baruch College, CUNY")
  .setLocation("New York City, NY")
  .setStart(new Date(2011, 10))
  .setEnd(new Date(2016, 2))
  .addDegree("Bachelor of Business Administration", "Finance")
  .addDegree("Minor", "Philosophy")
  .read();

// set education in order
resume.setEducation([HACK_REACTOR, BARUCH]);

export default resume;
