export const START_DATE = new Date(2021, 12, 31, 18);
export const END_DATE = new Date(2022, 1, 1, 2);
const NOW = new Date();
export const FIRS_LOADED_PAGE =
  START_DATE < NOW && END_DATE > NOW ? "specials" : "appetisers";
export const IS_SPACILALS_BUTTON_ACTIVE =
  START_DATE < NOW && END_DATE > NOW ? true : false;
