# 基础

文档： [Vuex 是什么？ | Vuex (vuejs.org)](https://vuex.vuejs.org/zh/) 

## 默认参数/模板

```javascript
const store = new Vuex.Store({
	state: {
		types: [],
		intervals: [],
		authorization: ""
	},
	getters: {
		getLastRecord(state) {
			return state.intervals[0];
		}
  },
  mutations:{
          setTypes(state, types) {
                  state.types = types;
           }
  },
  actions:{
          _downloadIntervals(context, payload){}
  }
```

### 如何在actions选项中的方法访问mutations选项中的方法？

```javascript
context.commit('setTypes', res.data.types); 
```

### 如何在actions选项中的方法访问state选项中的变量？

```javascript
context.state.authorization 
```

### actions选项中的方法如何互相访问？

```javascript
context.dispatch('saveIntervals'); 
```

### 在组件中如何调用vuex的actions选项中的方法？

```javascript
this.$store.dispatch('downloadTypes'); 
```

### 在组件中如何调用vuex的mutations选项中的方法？

```javascript
this.$store.commit('setIntervals', res.data); 
```

### 在组件中如何调用vuex的state选项中的变量？

```javascript
this.$store.state.types 
```

# 坑与细节

### 回调函数中，要注意this的指向

before：

```javascript
initTypes() {
    const that = this;
    uni.getStorage({
    	key: 'types',
    	success: function(res) {
                     console.log("让我看看回调函数中，this是谁？！");
    		console.log(this);//竟然是success函数本身
    		that.$store.commit('setTypes', res.data);
    	},
    	fail(err) {
    		
    	}
    });
},
```

after：使用箭头函数解决

```javascript
initTypes() {
    uni.getStorage({
    	key: 'types',
    	success: (res) => {
                     console.log("让我看看回调函数中，this是谁？！");
    		console.log(this);//指向Vue
          		this.$store.commit('setTypes', res.data);
    	},
    	fail: (err) => {
    		
    	}
    });
},
```

