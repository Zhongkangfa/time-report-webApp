'use strict';
const uniID = require('uni-id');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let {
		username,
		password
	} = event;
	username = '128@qq.com';
	password = '12345';
	// username、password验证是否合法的逻辑
	const res = await uniID.register({
		username,
		password
	})
	return res
};
