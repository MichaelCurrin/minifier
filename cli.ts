import { minify, Language } from "./mod.ts";
import {
  green,
  bold,
  red,
  blue,
} from "https://deno.land/std@0.84.0/fmt/colors.ts";

const { args } = Deno;

switch (args[0]) {
  case "--help":
  case "-H":
    console.log(
      "  <file-location> minifies the given file from the file location"
    );
    Deno.exit(1);
    break;
  case undefined:
  case "--version":
  case "-V":
    console.log("minifier v1.1.0");
    Deno.exit(1);
    break;
}

const [fileName, ...rest] = args;

function msg(emoji: string, message: string) {
  return `${emoji} ${message}`;
}

if (rest.length > 0) {
  console.error(msg("❌", "Too many arguments passed in."));
  Deno.exit();
}

const fileContents = await Deno.readTextFile(fileName).catch((err) => {
  console.error(msg("❌", `Cannot find ${bold(red(fileName))}.`));
  Deno.exit();
});
const fileNameParts = fileName.split(".");
const fileNameEnding = fileNameParts[fileNameParts.length - 1].toLowerCase();

await Deno.writeTextFile(
  fileName,
  minify(fileNameEnding.toLowerCase() as Language, fileContents)
);

console.log(
  msg(
    "✅",
    `Successfully minified ${bold(green(fileName))}! (${blue(
      `${performance.now().toFixed(0)}ms`
    )})`
  )
);
