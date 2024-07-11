import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://frec.pl", // replace this with your deployed domain
  author: "Filip Rec",
  desc: "My contribution to the Internet pollution",
  title: "frec.pl",
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "GitHub",
    href: "https://github.com/zefj",
    linkTitle: `See my GitHub profile`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/filiprec/",
    linkTitle: `Add me on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:filiprec@outlook.com",
    linkTitle: `Drop me an email`,
    active: true,
  },
];
