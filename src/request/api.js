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


// 获取所有标签
export const getAllTypes = () => {
    return request({
        url: '/getAllTypes',
        method: 'get'
    })
}
// 获取文章总数
export const getArticlesCount = () => {
    return request({
        url: '/getArticlesCount',
        method: 'get'
    })
}
// 获取文章
export const getArticles = (query) => {
    return request({
        url: '/getArticles',
        method: 'post',
        data: query
    })
}

// 搜索文章
export const findArticles = (query) => {
    return request({
        url: '/findArticles',
        method: 'post',
        data: query
    })
}

// 修改文章基本内容
export const changeArticles = (query) => {
    return request({
        url: '/changeArticles',
        method: 'post',
        data: query
    })
}

// 修改文章基本内容
export const deleteArticles = (query) => {
    return request({
        url: '/deleteArticles',
        method: 'post',
        data: query
    })
}

// 获取某个文章主要内容
export const adminGetArticlesMain = (query) => {
    return request({
        url: '/adminGetArticlesMain',
        method: 'get',
        params: query
    })
}

// 更新某个文章主要内容
export const adminChangeArticlesMain = (query) => {
    return request({
        url: '/adminChangeArticlesMain',
        method: 'post',
        data: query
    })
}

// 新增文章
export const addArticles = (query) => {
    return request({
        url: '/addArticles',
        method: 'post',
        data: query
    })
}