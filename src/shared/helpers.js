/**
 * Create element for DOM
 *
 * @param {String} selector html tag
 * @param {String} className class/es for new element
 * @param {Element} parent parent of the new element
 * @return {Element} created element
 *
 */
export default function createElement(selector, className, parent) {
  const element = document.createElement(selector);
  element.className = className;
  if (parent) {
    parent.append(element);
  }
  return element;
}
