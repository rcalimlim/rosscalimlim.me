import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import resume from "../src/cv/resumeBuilder";

const scriptName = "WriteResumeToJson";
const outputPath = "./dist/files";
const outputFileName = "resume.json";
const log = (msg: string) => console.log(`[${scriptName}] ${msg}`);

try {
  // mk output folder
  log(`checking existence: ${outputPath}`);
  const filePathExists = existsSync(join(outputPath));
  if (!filePathExists) {
    log(`making folder ${outputPath}`);
    mkdirSync(join(outputPath));
  }

  // output json resume
  log("writing json to file");
  const rawStrResume = JSON.stringify(resume.read(), null, 2) + "\n";
  writeFileSync(join(outputPath, outputFileName), rawStrResume);
} catch (e) {
  console.error(`[${scriptName}] failed with: ${e}`);
}
