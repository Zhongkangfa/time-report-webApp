文档： [uni.getStorage - uni-app官网 (dcloud.io)](https://uniapp.dcloud.io/api/storage/storage?id=setstorage) 

## 如何存储？（异步）

```javascript
uni.setStorage({
    key: 'types',
    data: context.state.types,
    success: function() {
    	console.log('types存储成功！');
    }
});
```

## 如何获取？（异步）

```javascript
uni.getStorage({
	key: 'types',
	success: (res) => {
		this.$store.commit('setTypes', res.data);
	},
	fail: (err) => {

	}
});
```

