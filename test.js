console.log("点击上方绿色运行按钮, 右侧输出 console 信息.");
console.log("不需要额外 IDE, 也不需要使用浏览器调试器");

console.log("====== 1. 简单数组去重 ======");
/**
 * 1. 简单数组去重
 *
 * 示例输入: [1, 3, 1, 2, 3]
 *
 * 示例输出: [1, 3, 2]
 *
 * tips: 不使用 Set
 */

const inputArray = [1, 3, 1, 2, 3, 4, 10];

function unique(input) {
  // code here
  const list = [];
  for (let i = 0; i < input.length; i++) {
    if (!list.includes(input[i])) list.push(input[i]);
  }
  return list;
  // the below one is better
  // return input.filter((item, index) => input.indexOf(item) === index);
}

console.log("result --> " + JSON.stringify(unique(inputArray)));
console.log("want ----> " + JSON.stringify([1, 3, 2, 4, 10]));
console.log("should --> " + true);
console.log(
  "[equal] -> " +
    (JSON.stringify([1, 3, 2, 4, 10]) ===
      JSON.stringify(unique(inputArray) || []))
);

console.log("====== 2. 数组扁平化 ======");
/**
 * 2.数组扁平化
 */

const arr1 = [1, 2, 3, [4, 5], 6, [7, 8, [9, 10, [11, 12, 13], 14]], 15];
const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
console.log("current -> " + JSON.stringify(arr1));

function method(arr) {
  // your code
  // 可以返回其他数组
  let circle = [];
  function loop(list) {
    for (let i = 0; i < list.length; i++) {
      if (Array.isArray(list[i])) {
        loop(list[i]);
      } else {
        circle = circle.concat(list[i]);
      }
    }
  }
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      loop(arr[i]);
    } else {
      circle = circle.concat(arr[i]);
    }
  }
  return circle;
  // the below one is better
  // return arr.reduce((pre, now) => pre.concat(Array.isArray(now) ? method(now) : now), []);
}

console.log("result --> " + JSON.stringify(method(arr1)));
console.log("should --> " + true);
console.log(
  "[equal] -> " + (JSON.stringify(arr2) === JSON.stringify(method(arr1)))
);

console.log("====== 3. fastEqual ======");

/**
 * 3.fastEqual 两个对象快速相等
 *
 * 示例输入: a = { arr: [1, 2], num: 12 } b = { arr: [1, 2], num: 12 }
 *
 * 示例输出: true
 *
 * tips: 不需要考虑太多边界情况, 优先保证执行效率, 输入 a / b 可以是任意数据类型
 */

// findType('') => 'string'
// findType(0) => 'number'
// findType(false) => 'boolean'
// findType({}) => 'object'
// findType([]) => 'array'
// ....
function findType(data) {
  return Object.prototype.toString
    .call(data)
    .split(" ")[1]
    .slice(0, -1)
    .toLowerCase();
}

const a = { arr: [1, 2], num: 12, o: { name: "foo" } };
const b = { arr: [1, 2], o: { name: "foo" }, num: 12 };

function fastEqual(a, b) {
  // code here
  switch (findType(a)) {
    case "object": {
      const a1 = Object.keys(a);
      const b1 = Object.keys(b);
      if (a1.length !== b1.length) return false;
      const l = a1.map(item => b1.includes(item));
      if (l.length !== a1.length) return false;
      for (let i = 0; i < a1.length; i += 1) {
        if (!fastEqual(a[a1[i]], b[a1[i]])) return false;
      }
      break;
    }
    case "array": {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
      }
      break;
    }
    case "boolean":
    case "number":
    case "string": {
      if (a === b) break;
      else return false;
    }
    default:
      return false;
  }
  return true;
}

console.log("should --> " + true);
console.log("[equal] -> " + fastEqual(a, b));
