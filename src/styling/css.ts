// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw#building_an_identity_tag
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const css = (strings: TemplateStringsArray, ...values: any[]) =>
  String.raw({ raw: strings }, ...values);

/**
 * To get CSS autocomplete in css tagged template literal:
 *
 * WebStorm:
 * Settings | Editor | Language Injections
 * Click on the little import button and select `CSS_template_literal.xml` file.
 */
