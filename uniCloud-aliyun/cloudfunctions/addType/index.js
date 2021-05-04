'use strict';
const uniID = require('uni-id');
const db = uniCloud.database();
const collection = db.collection('types');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const payload = await uniID.checkToken(event.uniIdToken);
	if (payload.code) {
		return payload
	}
	console.log(payload.uid);
	delete event['uniIdToken']
	// let res = collection.add(Object.assign(event, {"id": 8778}));
	let res = collection.add(Object.assign(event, {"uid": payload.uid}));
	return res
};
