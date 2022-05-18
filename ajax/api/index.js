/* 批量进行文件导出 */
// . =>API目录的相对路径
// true => 是否查询子目录
// /.js/ => 需要查询的文件的后缀名

const requireApi = require.context('./',true,/.js$/);
// console.log(requireApi.keys());  //获取api文件夹下的所有文件路径


//初始化一个对象
let modules = {};

requireApi.keys().forEach((key,i)=>{
	//如果文件路径等于当前文件，直接退出
	if (key === './index.js') return ;
	
	//复制inserface目录下的所有方法到modules中
	Object.assign(modules,requireApi(key));
})

// console.log(modules);
export default modules;