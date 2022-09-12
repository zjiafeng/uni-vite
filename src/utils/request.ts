import {
	REQUEST_BASE_URL,
	REQUEST_TIMEOUT
} from './config'

// request文档：https://uniapp.dcloud.net.cn/api/request/request.html
class Request {

	_request(url:string, options:any) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: `${REQUEST_BASE_URL}${url}`,
				method: (typeof options === 'object' && options.method) || 'GET',
				data: (typeof options === 'object' && options.data) || {},
				timeout: REQUEST_TIMEOUT,
				success: (res) => {
					if (res.statusCode !== 200) {
						return uni.showToast({
							title: '获取数据失败',
							icon: 'error'
						})
					}
					resolve(res) //将promise变为执行成功的状态
				},
				fail: (err) => {
					uni.showToast({
						title: '请求接口失败',
						icon: 'error'
					})
					reject(err)
				}
			})
		})
	}

	get(url:string, options?:any) {
		return this._request(url, options)
	}

	post(url:string, options?:any) {
		return this._request(url, {
			...options,
			method: 'POST'
		})
	}

	// 请求如果不是GET/POST调用此方法
	request(url:string, options:any) {
		return this._request(url, options)
	}
}

export default new Request()
