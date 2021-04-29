## 参考

vue官方给出的例子： [树形视图 — Vue.js (vuejs.org)](https://cn.vuejs.org/v2/examples/tree-view.html) 

## 效果对比

before：

![tree_before](https://github.com/Zhongkangfa/time-report-webApp/blob/master/document/image/tree_before.png)

after：

![tree_after](https://github.com/Zhongkangfa/time-report-webApp/blob/master/document/image/tree_after.png)

## 代码领读

### 主要思路

分两种组件，父组件是“Tree”，子组件是“Item”。

我们重点先看子组件——activityItem。

如图，每个节点（色块）就是一个activityItem，由'<li>'包裹。

每个色块主要由两个部分组成： [<u-cell-item> ](https://uviewui.com/components/cell.html) 和'<ul>'，分别代表父节点和子节点。

'<ul>'包裹着一下层子组件。经过测试，如果去掉'<ul>'的包裹，就没有向右的偏移量来区分父子组件。

![上下两个部分](C:\Users\kangfa\Desktop\作品与练习\time-report\document\image\activity-item骨架.png)

现在，让我们一步步编写上面的代码吧。

### 第一步：骨架

```html
<template>
	<view>
		<li>
			<!-- 父节点 -->
			<u-cell-item></u-cell-item>
            
			<!-- 子节点 -->
			<ul></ul>
		</li>
	</view>
</template>
```

### 第二步： 组件的递归使用 

子节点中的元素是该组件（activityItem）本身。
```html
<template>
	<view>
		<li>
			<!-- 父节点 -->
			<u-cell-item></u-cell-item>
            
			<!-- 子节点 -->
			<ul>
                <activity-item></activity-item>
            </ul>
		</li>
	</view>
</template>
```

对于递归组件，请确保提供“name”选项。 请在该组件（activityItem）下提供"name"选项：

```javascript
<script>
	export default {
		name: "activity-item",
		data() {
			return {
                
            }
		}
	}
</script>
```

### 第四步：显示或隐藏子节点(ul元素)

通过点击父节点，让我们可以显示或隐藏紧随其后的子节点列表（ul元素）；

通过**v-show指令**和**点击事件**可以达到我们的想要的效果。

进一步改进：如果该父节点没有子节点列表，就不要考虑show的问题（不要考虑展示不展示的问题），请先直接通过**v-if指令**，进行条件渲染。

```html
<template>
	<view>
		<li>
			<!-- 父节点 -->
			<u-cell-item @click="toggle" ></u-cell-item>
            
			<!-- 子节点 -->
			<ul v-if="isFolder" v-show="isOpen">
                <activity-item></activity-item>
            </ul>
		</li>
	</view>
</template>
```



```javascript
<script>
	export default {
		name: "activity-item",
		data() {
			return {
               isOpen: false 
            }
		},
        computed:{
            isFolder: function(){
                //判断是否有子节点
                //我们先继续走，暂不考虑数据
            }
        },
        methods: {
            toggle:function(){
                if (this.isFolder) {
					this.isOpen = !this.isOpen;
				}
            }
        }
	}
</script>
```

树形视图的主要思路讲解完毕，至于不同层级色彩的变换等细节请看源码。

## 错误提示：

一、

eslint-vue: Custom elements in iteration require 'v-bind:key' directives 

 迭代中的自定义元素需要'v-bind:key'指令 

```html
<li>
    <div>{{ item.name }}</div>
    <ul v-show="isOpen">
        <activityItem v-for="(child, index) in item.children" :item="child" :key="index"></activityItem>
    </ul>
</li>
```

二、

did you register the component correctly? For recursive components, make sure to provide the "name" option.

 您是否正确注册了组件?对于递归组件，请确保提供“name”选项。 

原因：自己写错选项名称。

```
components √
comments ×
```

三、

Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "colorNumber

避免直接修改prop中的变量。
