import axios from 'axios'

//插件模块
const MyHttpServer = {}

MyHttpServer.install = (Vue) => {
    //访问地址链接 
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'
    // 4. 添加实例方法
    Vue.prototype.$http = axios
}
// let baseURL = 'http://localhost:8888/api/private/v1';

export const register = parmas => { return axios.post(`${baseURL}/users/`, parmas) }
export default MyHttpServer