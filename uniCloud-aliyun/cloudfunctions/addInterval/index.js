'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection('intervals');
	let res = collection.add(event)
	console.log("event等于data吗？", event);
	//返回数据给客户端
	return event
};
