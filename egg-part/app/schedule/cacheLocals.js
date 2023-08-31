// app/schedule/cacheLocals
const Subscription = require("egg").Subscription;

module.exports = class extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: "1m", // 1 分钟间隔
      type: "all", // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    console.log("更新缓存");
    // const key = "province";
    // const resp = await this.app.axios.get(`${this.config.$apiBase}/api/local`);
    // //缓存
    // this.app.redis.set(key, JSON.stringify(resp.data));
  }
};
