import type socialIcons from "@assets/socialIcons";
import type { SearchItem } from "@components/Search";
import type { CollectionEntry } from "astro:content";

export type Site = {
  website: string;
  author: string;
  desc: string;
  title: string;
  ogImage?: string;
  lightAndDarkMode: boolean;
  postPerPage: number;
  scheduledPostMargin: number;
};

export type SocialObjects = {
  name: keyof typeof socialIcons;
  href: string;
  active: boolean;
  linkTitle: string;
}[];

export type Post = CollectionEntry<"blog"> | SearchItem;
