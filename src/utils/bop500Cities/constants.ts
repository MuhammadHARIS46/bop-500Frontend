export const CATEGORIES: string[] = [
  "BOP500 | City Index",
  "Cultural Facilities",
  "Heritage Sites",
  "Accessibility To Culture",
  "Culture And Creative Education",
  "Creative Employment",
  "Innovation In Creative Industries",
];

export const indicatorNameMapping = {
  "Public Libraries": "Libraries",
  "Movie Theatres": "Cinemas",
  "HE CCI Establishments": "CCI He",
  "Innovation In Creative Industries": "Creative Innovation",
  "City % of CCI start-ups": "Startups",
};

/**
 * Maps subcategory name with api response.
 * Api response might contains different name
 */
export const getIndicatorNameMapping = (subcategoryName: string): string =>
  indicatorNameMapping[subcategoryName] ?? subcategoryName;
