import type socialIcons from "@assets/socialIcons";
import type { CollectionEntry } from "astro:content";

export type Site = {
  website: string;
  author: string;
  desc: string;
  title: string;
  ogImage?: string;
  scheduledPostMargin: number;
};

export type SocialObjects = {
  name: keyof typeof socialIcons;
  href: string;
  active: boolean;
  linkTitle: string;
}[];

export type Post = CollectionEntry<"posts">;
