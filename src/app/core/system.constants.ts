export const SYSTEM_CONSTANTS = {
  PRODUCT_DETAIL_URL: 'https://pokeapi.co/api/v2/pokemon/',
  POKEMON_LIST_URL: 'https://pokeapi.co/api/v2/pokemon/?limit=',
  DELAY_TIME: 0,
  ALERT_FADE_OUT_TIME: 3000,
  FADE_IN_CLASS: 'show',
  SUCCESS_CLASS: 'alert-success',
  ERROR_CLASS: 'alert-danger',
  REGEX_FOR_ALPHANUMERIC: /^[a-zA-Z0-9_s]*$/,
  REGEX_FOR_PHONE: /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/,
  REGEX_FOR_DECIMAL: /^\d+\.\d{2}$/,
  REGEX_FOR_IMG_URL: '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?',
  PAGE_NOT_FOUND_IMAGE_URL:
    'http://p.w3layouts.com/demos/oops-404/web/images/404-1.png',
};
export const VALIDATION_MSG = {
  MIN_LENGTH_ERROR: 'Minimum 3 characters required!',
  POKEMON_NOT_FOUND_ERROR: 'No pokemon found with respective search.',
  PAGE_NOT_FOUND_ERROR_MSG: 'OOPS! - Could not Find it',
  MIN_LENGTH_ERROR_FOR_NAME: 'Min length is 3 for name',
  REQUIRED_ERROR_FOR_NAME: 'Name is required!',
  PATTERN_ERROR_FOR_NAME: 'Please enter alphanumeric value for name',
  MIN_LENGTH_ERROR_FOR_DESCRIPTION: 'Min length is 3 for description',
  REQUIRED_ERROR_FOR_DESCRIPTION: 'Description is required!',
  PATTERN_ERROR_FOR_DESCRIPTION:
    'Please enter alphanumeric value for description',
  REQUIRED_ERROR_FOR_PRICE: 'price is required!',
  PATTERN_ERROR_FOR_PRICE: 'Please enter 2 decimal for price',
  MAX_LENGTH_ERROR_FOR_PHONE: 'Max length is 10 for phone',
  REQUIRED_ERROR_FOR_PHONE: 'phone is required!',
  PATTERN_ERROR_FOR_PHONE: 'Please enter valid phone number',
  VALID_IMAGE_URL: 'Please enter valid URL',
  IMAGE_URL_REQUIRED: 'imageURL is required!',
  REQUIRED_CATEGORY: 'Category is required!',
  MAX_LENGTH_ERROR_FOR_ADD_NEW_PRODUCT: 'You can not add more then 5 product',
};
export const STATIC_CONSTANTS = {
  MIN_LENGTH_FOR_SEARCH: 3,
  MIN_LENGTH_FOR_NAME: 3,
  MIN_LENGTH_FOR_DESCRIPTION: 3,
  MAX_LENGTH_FOR_PHONE: 10,
  MAX_LENGTH_FOR_ADD_NEW_PRODUCT_FORM: 5,
};
