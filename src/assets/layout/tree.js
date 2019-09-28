/**
 * @Author: Firmiana
 * @Date: 2019-05-29 00:31:44
 * @Last Modified by: Firmiana
 * @Last Modified time: 2019-09-29 00:36:46
 * @Desc: 侧边栏菜单
 */
export default {
	menuTree: [
		{
			icon: 'pie_chart',
			'icon-alt': 'pie_chart',
			text: '统计总览',
			model: true,
			pageIndex: 'home',
			page: 'summary'
		},
		{
			icon: 'people',
			'icon-alt': 'people',
			text: '用户管理',
			model: false,
			pageIndex: 'user',
			children: [{ icon: '', model: false, text: '用户列表', page: 'test1' }]
		},
		// {
		// 	icon: 'business_center',
		// 	'icon-alt': 'business_center',
		// 	text: '矿工管理',
		// 	model: false,
		// 	pageIndex: 'miner',
		// 	page: 'minerManage'
		// },
		// {
		// 	icon: 'monetization_on',
		// 	'icon-alt': 'monetization_on',
		// 	text: '资产管理',
		// 	model: false,
		// 	pageIndex: 'asset',
		// 	children: [
		// 		{ icon: '', model: false, text: '操作记录', page: 'assetManage' },
		// 		{ icon: '', model: false, text: '资产记录', page: 'assetRecord' }
		// 	]
		// },
		// {
		// 	icon: 'attach_money',
		// 	'icon-alt': 'attach_money',
		// 	text: '提现审核',
		// 	model: false,
		// 	pageIndex: 'check',
		// 	children: [{ icon: '', model: false, text: '审核列表', page: 'checkRechange' }]
		// },
		// {
		// 	icon: 'volume_up',
		// 	'icon-alt': 'volume_up',
		// 	text: '公告管理',
		// 	model: false,
		// 	pageIndex: 'notice',
		// 	children: [{ icon: '', model: false, text: '公告列表', page: 'noticeList' }]
		// },
		// {
		// 	icon: 'remove_from_queue',
		// 	'icon-alt': 'remove_from_queue',
		// 	text: '开屏管理',
		// 	model: false,
		// 	pageIndex: 'open',
		// 	children: [{ icon: '', model: false, text: '开屏列表', page: 'openImage' }]
		// }
	]
}
