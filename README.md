## css-part

### 盒模型
1. 普通盒模型
  普通盒模型的宽高只包含内容
2. 怪异盒模型
  怪异盒模型的宽高包含内边距,内容和边框

### 选择器
1. 标签选择器
  ```css
  tag {
    border: 1px solid red;
  }
  ```

  tag是标签名称 例如:div p ul li等

2. 类选择器

  ```css
  <div class="className"></div>

  .className {
    border: 1px solid red;
  }
  ```

  className是类名, 例如上方的div类名是className  以 . 开头

3. id选择器

  ```css
  <div id="idName"></div>
  #idName { xxx }
  ```

  `#` 开头 idName就是id名称


4. 属性选择器

  - [attr] --> input[type] 匹配带有一个名为type的input元素
  - [attr=value] --> input[type="text"] 匹配一个type属性值为text的input元素
  - [attr~=value] --> p[class~='special'] 匹配类里面包含special类的p元素
  - [attr|=value] --> div[lang|="zh"] 匹配lang属性为zh或zh后紧随一个连字符的div元素
  - [attr^=value] --> li[class^="box-"] 匹配一个开头为value子字符串的类的li元素
  - [attr$=value] --> li[class$="-box"] 匹配一个结尾为value子字符串的类的li元素
  - [attr*=value] --> li[class*="box"] 匹配一个包含value子字符串(任意位置)的类的li元素- 

5. 后代选择器

  ```html
    <div class="box">
      <div class="item1"></div>
      <div class="item2"></div>
      <div class="item3"></div>
    </div>

    .box .item1 {
      xxx
    }

  ```

  中间以空格隔开

6. 子代关系选择器
  ```html

    <div class="box">
      <div class="item1"></div>
      <div class="item2"></div>
      <div class="item3"></div>
    </div>

    <!-- 中间以 > 间隔 -->
    .box > .item1 {
      xxx
    }

    <!-- 如果直接写标签,就是所有标签都生效 -->
    .box > div {
      xxx
    }

  ```

7. 临近兄弟选择器

```html
  <div class="box">
    <div class="item1"></div>
    <div class="item2"></div>
    <div class="item3"></div>
  </div>  

  <!-- 无论是直接写类名还是写标签名,都只对第一个兄弟生效(即div.item2),如果改成div.item3是不生效的 -->
  .item1 + .item2 {
    xxx
  }

  .item1 + div {
    xxx
  }

```

8. 通用兄弟选择器

  ```html
  <div class="box">
    <div class="item1"></div>
    <div class="item2"></div>
    <div class="item3"></div>
  </div>  

  <!-- 这里怎么写都会生效,只要有这个兄弟  写div.item3也会生效 -->
  .item1 ~ .item2 {
    xxx
  }

  .item1 ~ div {
    xxx
  }
  ```

### 伪类和伪元素

- 伪类

  单冒号开头,某种特定状态下的元素

  常见的伪类(这里省略冒号):  hover/active/link/visited/focus/first/first-child/first-of-type/last-child/last-of-type/is/not/nth-of-type/nth-child/nth-last-child/nth-last-of-type...

- 伪元素

  双冒号开头,用于在文档中插入虚构的元素  :: 双冒号开头,为了保持向后兼容,也支持早期的单冒号开头的伪元素

  常见的伪元素(省略双冒号):  after/before/first-line/first-letter

### 哪些属性可以继承, 哪些不可以

- 可以继承的属性

  文本类/文本类/表格布局属性/列表属性/光标属性/元素可见性

  1. 所有元素都可继承

    visibility/cursor

  2. 子元素可继承

    letter-spacing/word-spacing/white-space/line-height/color/font/font-size/font-family/font-style/font-weight/font-variant/color/text-decoration/text-transfrom/direction/text-indent/text-align

  3. 列表元素可继承

    list-style/list-style-type/list-style-position/list-style-image

  4. 表格元素可继承

    border-collapse


- 不可以继承的属性

  宽高/布局类

  display/margin/padding/border/background/width/min-width/max-width/height/max-height/min-height/overflow/position/top/bottom/left/right/z-index/float/clear/table-layout/vertical-align/page-bread-before/page-bread-after/unicode-bidi


对于不可继承的属性如果希望子元素跟父元素保持一致,可以设置属性值为inherit, inherit关键字用于显式地指定继承性，可用于任何继承性/非继承性属性。

```css
border: inherit;
```

### LVHA

a标签有四种状态: 链接访问前/链接访问后/鼠标滑过/激活,分别对应四种伪类: link/visited/hover/active

- 当链接未访问时

  鼠标滑过标签,满足link和hover,要改变标签颜色,就必须将hover放在link后

  当鼠标点击激活标签时,同时满足link hover active,要显示标签激活时的样式,必须将active声明放到link和hover之后

  所以得出顺序 LVHA
- 当链接访问时 link和visited调换顺序即可

### display都有哪些值

> [参考]https://developer.mozilla.org/zh-CN/docs/Web/CSS/display

- none
- block
- inline
- inline-block
- flex
- grid
- table
- inline-table
- list-item

extends:

flex布局与grid布局都很强大,但是flex布局是轴线布局,只能指定项目针对轴线的位置,可以看作是一维布局.
grid布局则是将容器划分成行和列,产生单元格,然后指定项目所在单元格,可以看作是二维布局.grid布局远比flex布局强大

1. flex布局 -- /display/flex.html
    ```html
      <!--
        注释来源: 阮一峰大佬flex教程 https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html
        
        容器属性: flex-direction, flex-wrap, flex-flow, justify-content, align-items, align-content

        flex-direction -- 决定主轴的方向 row | row-reverse | column | column-reverse
          row -- 默认值,主轴为水平方向,起点在左端
          row-reverse -- 主轴为水平方向,起点在右端
          column -- 主轴为垂直方向,起点在上沿
          column-reverse -- 主轴为垂直方向,起点在下沿

        flex-wrap -- 默认情况下,都排在一条线上,但是如果排不下,如何换行  nowrap | wrap | wrap-reverse
          nowrap -- 默认 不换行
          wrap -- 换行,第一行在上方
          wrap-reverse -- 换行,第一行在下方

        flex-flow -- flex-direction和flex-wrap的简写形式
          row nowrap -- 默认值

        justify-content -- 项目在主轴上的对齐方式
          flex-start -- 默认值,左对齐
          flex-end -- 右对齐
          center -- 居中
          space-between -- 两端对齐,项目之间的间隔都相等
          space-around -- 每个项目两侧的间隔相等,所以项目之间的间隔比项目与边框的间隔大一倍
          space-evenly -- 每个间隔都相等

        align-items -- 定义项目在交叉轴上如何对齐,交叉轴默认垂直方向轴
          flex-start -- 交叉轴的起点对齐
          flex-end -- 交叉轴的终点对齐
          center -- 交叉轴的中点对齐
          baseline -- 项目第一行的文字的基线对齐
          stretch -- 默认值, 如果项目未设置高度或设为auto,将占满整个容器的高度

        align-content -- 定义了多根轴线的对齐方式,如果项目只有一根轴线,该属性不起作用
          flex-start -- 与交叉轴的起点对齐
          flex-end -- 与交叉轴的终点对齐
          center -- 与交叉轴的中点对齐
          space-between -- 与交叉轴两端对齐,轴线之间的间隔平均分布
          space-around -- 每根轴线两侧的间隔都相等.所以轴线之间的间隔比轴线与边框的间隔大一倍
          stretch -- 默认值,轴线将占满整个交叉轴


        项目属性: order, flex-grow, flex-shirk, flex-basis, flex, align-self

        order -- 定义项目的排列顺序,数值越小,排列越靠前,默认为0
        flex-grow -- 定义项目的放大比例,默认为0,如果存在剩余空间,也不放大
                      如果所有项的flex-grow属性值都为1,则它们等分剩余空间(如果有的话), 如果一个项目的属性值为2,其他项目都为1,则前者占据的剩余空间将比其他项多一倍
        flex-shirk -- 定义项目的缩小比例,默认为1,即如果空间不足,该项目将缩小  
                      如果所有项的flex-shirk属性值都为1,当空间不足时,都将等比例缩小.如果一个项目的flex-shirk属性为0,其他项目都为1,则空间不足时,前者不缩小
                      负值无效
        flex-basis -- 定义在分配多余空间之前,项目占据的主轴空间.浏览器根据这个属性,计算主轴是否有多余空间,默认值为auto,即项目的有本来大小
                      它可以设为跟width或height属性一样的值(比如350px),则项目将占据固定空间
        flex -- flex-grow, flex-shirk, flex-basis的简写,默认为 0 1 auto, 后两个属性可选
          auto(1 1 auto)
          none(0 0 auto)
          建议优先使用这个属性,而不是单独写三个分离的属性,因为浏览器会推算相关值

        align-self -- 允许单个项目有与其他项目不一样的对齐方式,可覆盖align-items属性,默认值为auto,表示继承父元素的align-items属性,如果没有父元素,则等同于stretch
          auto, flex-start, flex-end, center, baseline, stretch

          除了auto,其他都与align-items属性完全一致

      -->
    ```
2. grid布局 -- /display/grid.html
  
