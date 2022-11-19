const colorCodeMapping = {
  Museums: "#F6BE0A",
  Cinemas: "#C10A50",
  Libraries: "#037D86",
  "Opera Houses": "#DADBDC",
  "Concert Halls": "#ACACAE",
  "Theme Parks": "#83B859",
  "World Heritage Sites": "#fcc0d3",
  "CITY % OF CCI START-UPS": "#b23ffd",
  "% FTE CCIs Jobs In City": "#5A1846",
  Startups: "#b23ffd",
};
/**
 *
 * Takes active city indicator and returns respective color code
 * @returns color code for active sub-category(city indicator)
 */
export const getColorCode = (indicatorName: string, isPaid: boolean) =>
  isPaid
    ? colorCodeMapping[indicatorName] ?? "#4c4a4e"
    : "rgba(255, 255, 255, 0.5)";
