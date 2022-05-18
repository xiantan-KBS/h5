export default ({name,data={}})=>{
	return new Promise((resolve,reject)=>{
		// console.log(data.isLoading);
		const loading = data.isLoading;
		data.isLoading && delete data.isLoading;
		!loading && uni.showLoading({
			title:'loading...',
		})
		uniCloud.callFunction({
			name,
			data,
			success({result}) {
				// console.log(result.data)
				if (result.code === 0) {
					resolve(result.data);
				} else{
					uni.showToast({
						icon:"none",
						title:result.msg
					})
				}
			},
			fail(err) {
				reject(err)
			},
			complete(){
			!loading &&	uni.hideLoading();
			}
		})
	})
}