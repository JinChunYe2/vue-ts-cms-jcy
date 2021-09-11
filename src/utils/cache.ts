class LocalCache {
    // 上传
    setCache(key: string, value: any) {
        // 服务器一般接受的形式为字符串，所以转换成字符串
        window.localStorage.setItem(key, JSON.stringify(value))
    }

    // 获取
    getCache(key: string) {
        const value = window.localStorage.getItem(key)
        if (value) {
            // 服务器一般发送回字符串数据，我们解析成正常数据
            return JSON.parse(value)
        }
    }

    // 删除
    deleteCache(key: string) {
        window.localStorage.removeItem(key)
    }

    // 清空
    clearCache() {
        window.localStorage.clear()
    }
}

export default new LocalCache()
