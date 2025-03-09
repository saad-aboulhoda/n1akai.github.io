import { header } from "./sections/header.js";
import { contact } from "./sections/contact.js";
import { projects } from "./sections/projects.js";

export function bootstrap() {
  header();
  contact();
  projects();
}
