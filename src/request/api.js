import request from './axios';



// 1. Get请求
export const getUserTask1 = () => {
    return request({
        url: '/getuser_info',
        method: 'get'
    })
}
// 2. POST请求
export const getPhoneCode = (query) => {
    return request({
        url: '/user/messageCode',
        method: 'post',
        data: query
    })
}

// 3. Get请求（路由中带参数）
export const getUserTask = (query) => {
    return request({
        url: '/getuser_info',
        method: 'get',
        params: query
    })
}
// 4. POST请求（路由中带参数）
export const login1 = (query1, query2) => {
    return request({
        url: '/task/query',
        method: 'post',
        data: query1,
        params: query2
    })
}



// 登陆
export const login = (query) => {
    return request({
        url: '/doLogin',
        method: 'post',
        data: query
    })
}

// 获取标签总数
export const getTypesCount = (query) => {
    return request({
        url: '/getTypesCount',
        method: 'get',
        params: query
    })
}

// 获取标签内容
export const getTypes = (query) => {
    return request({
        url: '/getTypes',
        method: 'get',
        params: query
    })
}

// 修改标签内容
export const changeTypes = (query) => {
    return request({
        url: '/changeTypes',
        method: 'post',
        data: query
    })
}

// 删除标签内容
export const deleteTypes = (query) => {
    return request({
        url: '/deleteTypes',
        method: 'post',
        data: query
    })
}

// 增加标签
export const addTypes = (query) => {
    return request({
        url: '/addTypes',
        method: 'post',
        data: query
    })
}