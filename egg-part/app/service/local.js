const Service = require('egg').Service

module.exports = class extends Service {
  async getProvinces() {
    const key = 'province'
    const provinces = await this.app.redis.get(key)
    if(provinces) {
      console.log('使用了缓存');
      return JSON.parse(provinces)
    }
    const res = await this.app.axios.get(`${this.config.$apiBase}/api/local`)
    this.app.redis.set(key, JSON.stringify(res.data))
    return res.data
  }
}
