'use strict';
const uniID = require('uni-id');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		username,
		password
	} = event;
	// username、password验证是否合法的逻辑
	const res = await uniID.login({
		username,
		password,
		queryField: ['username']
	})
	return res;
};
