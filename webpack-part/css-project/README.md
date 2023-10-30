# css工程化

css的问题：类名冲突的问题、重复样式

## 解决类名冲突

### BEM

Block Element Modifier

一个完整的BEM类名：block__element_modifier，例如：banner__dot_selected，可以表示：轮播图中，处于选中状态的小圆点

三个部分的具体含义为：

- **Block**：页面中的大区域，表示最顶级的划分，例如：轮播图(```banner```)、布局(```layout```)、文章(```article```)等等
- **element**：区域中的组成部分，例如：轮播图中的横幅图片(```banner__img```)、轮播图中的容器（```banner__container```）、布局中的头部(```layout__header```)、文章中的标题(```article_title```)
- **modifier**：可选。通常表示状态，例如：处于展开状态的布局左边栏（```layout__left_expand```）、处于选中状态的轮播图小圆点(```banner__dot_selected```)

在某些大型工程中，如果使用BEM命名法，还可能会增加一个前缀，来表示类名的用途，常见的前缀有：

- **l**: layout，表示这个样式是用于布局的
- **c**: component，表示这个样式是一个组件，即一个功能区域
- **u**: util，表示这个样式是一个通用的、工具性质的样式
- **j**: javascript，表示这个样式没有实际意义，是专门提供给js获取元素使用的

### css in js

核心思想：用一个js对象来描述样式，而不是css样式表

```js
const styles = {
  background: '#f40',
  color: 'red'
}
```

至于样式如何应用到页面，不在负责范围内，只是提供了一种思想，可以采用任何一种形式应用到页面中

优点：

- 绝无冲突的可能
- 更加灵活
- 应用面更广
- 书写不便
- 在页面中增加了大量冗余内容

### css module

开启了css module后，css-loader会将样式中的类名进行转换，转换为一个唯一的hash值

使用：将css-loader modules配置为true

如果仅使用css-loader的话，使用时类文件时在locals属性中会找到对应的类名

如果有style-loader的话，使用时会默认到处locals对象

```js
// webpack.config.js
module: {
  rules: [
    { test: /\.css$/, use: ['style-loader', {
      loaders: 'css-loader',
      options: {
        // 开启css module
        // modules: true,
        // 如果需要单配置自定义类名，需要将modules属性值修改为一个对象
        modules: {
          localIdentName: '[path][name][local]-[hash:5]'
        }
      }
    }] },
  ]
}

// 或者直接使用path的方式开启css-module, 如下：
{ test: /\.css$/, use: ['style-loader', 'css-loader?modules'] }
```

某些类名是全局的、静态的，不需要进行转换，仅需要在类名位置使用一个特殊的语法即可：

```css
:global(.main) {
  color: '#f40';
}
```

用`:global`进行包裹，就不会进行转换，开启css-module后，类名默认用`:local`包裹


### 预编译器less

安装 `npm i -D less`, 安装好了之后可以直接使用lessc进行编译less文件

运行`npx lessc index.less index.css` 就可以得到一个编译后的css文件

基本使用：

> [中文链接（非官方）](https://less.bootcss.com/#%E6%A6%82%E8%A7%88)

- 变量
- 混合
- 嵌套
- 运算
- 函数 - [函数手册](https://less.bootcss.com/functions/)
- 作用域
- 注释
- 导入 


### 在webpack中使用less

### postcss

集中处理css工程化中的出现的问题，类似于一个编译器，将样式源码编译成最终的css代码

1. postcss-preset-env
2. postcss-apply 类似于less的mixin，可以定义样式代码片段
    ```css
    :root {
      --center: {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .center {
      @apply --center;
    }
    ```

3. postcss-color-function



### 抽离css文件

之前采用style-loader将css内容添加到页面的style元素中

而实际的开发中则希望css是一个单独的文件

可以使用 `mini-css-extract-plugin` 库来抽离css文件

```js
// webpack.config.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader?modules"]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin() //负责生成css文件
  ]
}
```

同output.filename的含义一样，即根据chunk生成的样式文件名

配置生成的文件名，例如`[name].[contenthash:5].css`

默认情况下，每个chunk对应一个css文件(即entry对象中的key为css文件名)
