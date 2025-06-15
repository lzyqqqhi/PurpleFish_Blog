# JavaScript 中 bind、call 和 apply 的区别

## 一、核心概念

  * **`bind`** ：创建一个新函数（绑定函数），当其调用时，原函数的 `this` 指定为 `bind` 提供的第一个参数，其余参数作为原函数调用时的前置参数。
  * **`call`** ：立即调用函数，指定 `this` 指向，参数逐个列举。
  * **`apply`** ：立即调用函数，指定 `this` 指向，参数以数组形式传递。

## 二、对比表格

| 方法    | 返回值     | 参数传递                       | 调用时机         | 适用场景示例                                                 |
| ------- | ---------- | ------------------------------ | ---------------- | ------------------------------------------------------------ |
| `bind`  | 新函数     | 可预设多个参数，调用时继续添加 | 创建后可稍后调用 | 为事件监听器创建具有特定上下文和部分预设参数的函数，如 `const handleClick = handler.bind(obj, arg1)` |
| `call`  | 函数返回值 | 参数逐个列举                   | 立即调用         | 已知参数个数和内容，如调用一个对象的方法并改变其上下文：`method.call(newObj, param1, param2)` |
| `apply` | 函数返回值 | 参数为数组                     | 立即调用         | 参数数量不确定或参数本身是数组，如 `Math.max.apply(null, [1, 2, 3])` |

## 三、示例演示

  1. **`bind` 示例**

     * 场景：事件处理函数预设参数
     * ```javascript
       function handleClick(name, event) {
         console.log(`${this.greeting} ${name}, event type: ${event.type}`);
       }
       const greeter = {
         greeting: "Hello"
       };
       const boundHandleClick = handleClick.bind(greeter, "John");
       // 后续可作为事件监听器，例如元素点击时触发
       // element.addEventListener("click", boundHandleClick);
       boundHandleClick({ type: "customEvent" }); // Hello John, event type: customEvent
       ```

  2. **`call` 示例**

     * 场景：借用数组方法处理类数组对象
     * ```javascript
       const arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };
       Array.prototype.join.call(arrayLike, "-"); // a-b-c
       ```

  3. **`apply` 示例**

     * 场景：求数组最大值
     * ```javascript
       const numbers = [5, 2, 9, 1];
       Math.max.apply(null, numbers); // 9
       ```

## 四、创新记忆法

想象三个兄弟：大哥 `bind`，最爱 “拖延”，先不急着干事，先把人（`this`）和部分东西（参数）定下来，等到需要的时候再行动；二哥 `call`，急性子，拿着东西（参数）立刻就去指定的地方（`this` 指向的环境）把事办了；三弟 `apply`，和二哥一样急，不过他喜欢把东西（参数）装在袋子里（数组）一起带走。