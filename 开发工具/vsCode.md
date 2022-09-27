### 关于不能折叠代码的问题

描述：当折叠一段代码时，如果在这个代码后面继续写代码，那么折叠的代码会被自动展开

解决办法：

给要折叠的代码加上`// #region`    `// #endregion`

```javascript
// #region
/* var vm = new Vue({
   el:'.box',
   data(){
       return {
           count:4,
       }
   },

}); */
// #endregion
```

