import request from '@/utils/request'

export default {
	// 获取公用数据
	getGlobalData() {
		return request.get('/wp-json/xm-blog/v1/info')
	},

	// 获取文章列表
	getArticleList(params:any) {
		return request.get('/wp-json/wp/v2/posts', {
			data: {
				per_page: 10,
				_embed: true,
				...params
			}
		})
	},

	// 获取文章详情
	getArticleDetail(id:string|undefined) {
		return request.get(`/wp-json/wp/v2/posts/${id}`)
	},

	// 获取评论列表
	getCommentList(data:any) {
		return request.get('/wp-json/wp/v2/comments', {
			data
		})
	},

	// 更新阅读量
	updateViewCount(id:string|undefined) {
		return request.post('/wp-json/xm-blog/v1/view-count', {
			data: {
				id
			}
		})
	},

	// 点赞
	handlerLikes(articleId:string|number) {
		return request.post('/wp-json/xm-blog/v1/like', {
			data: {
				id: articleId,
				key: 'very_good'
			}
		})
	}
}
