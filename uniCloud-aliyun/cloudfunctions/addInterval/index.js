'use strict';
const uniID = require('uni-id');
const db = uniCloud.database();
const collection = db.collection('intervals');
exports.main = async (event, context) => {
	const payload = await uniID.checkToken(event.uniIdToken);
	if (payload.code) {
		return payload
	}
	delete event['uniIdToken']
	let res = collection.add(Object.assign(event, {"uid": payload.uid}));
	//返回数据给客户端
	return res
};
