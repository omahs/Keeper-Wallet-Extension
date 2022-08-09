/* eslint-disable */
/// <reference types='codeceptjs' />

declare namespace CodeceptJS {
  interface SupportObject {
    I: I;
  }
  interface Methods extends WebDriver {}
  interface CustomLocators {
    shadowLocator: {
      shadow: string | string[];
    };
  }
  interface I extends WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}