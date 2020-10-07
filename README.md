# xiachufang-to-pdf

将下厨房菜谱打印页面保存成pdf

## 在网页版收藏夹列表中获取菜谱标号

```js
Array.from($('.normal-recipe-list li .image-link').map((i, e) => (/(\d+)/.exec(e.href)[1])));
```
