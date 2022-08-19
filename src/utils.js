/**
* 检查元素是否存在cls这个名字的class
* @private
*/
export function hasClass(obj, cls) {
  console.log(obj)
  return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
/**
* 为元素添加class
* @private
*/
export function addClass(obj, cls) {
  if (!hasClass(obj, cls)) obj.className += " " + cls;
}
/**
* 删除元素中的class
* @private
*/
export function removeClass(obj, cls) {
  if (hasClass(obj, cls)) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    obj.className = obj.className.replace(reg, ' ');
  }
}