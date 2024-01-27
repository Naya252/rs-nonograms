/**
 * Create element for DOM
 *
 * @param {String} selector html tag
 * @param {String} className class/es for new element
 * @param {Element} parent parent of the new element
 * @return {Element} created element
 *
 */
export function createElement(selector, className, parent) {
  const element = document.createElement(selector);
  element.className = className;
  if (parent) {
    parent.append(element);
  }
  return element;
}

export class BaseClass {
  constructor(tag, className) {
    this.tag = tag;
    this.el = null;
    this.className = className;
  }

  create() {
    this.el = createElement(this.tag, this.className);
  }
}
