/**
 * The page is one long document; these ids are both the anchor targets and the
 * keys used to look up nav labels in the dictionary, so the two cannot drift.
 */
export const SECTION_IDS = ["about", "projects", "skills", "contact"] as const;

export type SectionId = (typeof SECTION_IDS)[number];
