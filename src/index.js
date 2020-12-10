import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>DeepClone!</h1>
<div>
 watch your console!
</div>
`;
const isComplexDataType = (obj) =>
  typeof obj === "object" || (typeof obj === "function" && obj !== null);

const deepClone = function (obj, hash = new WeakMap()) {
  if (hash.has(obj)) return hash.get(obj);
  let type = [Date, RegExp, Set, WeakMap, WeakSet];
  if (type.includes(obj.constructor)) return new obj.constructor(obj);

  let allDesc = Object.getOwnPropertyDescriptors(obj);
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);
  hash.set(obj, cloneObj);

  for (let key of Reflect.ownKeys(obj)) {
    cloneObj[key] =
      isComplexDataType(obj[key]) && typeof obj[key] !== "function"
        ? deepClone(obj[key], hash)
        : obj[key];
  }
  return cloneObj;
};

const obj1 = {
  a: {
    b: [1, 2, 3]
  },
  c: {
    d: {
      e: "f"
    }
  },
  g: Symbol()
};

deepClone(obj1);
