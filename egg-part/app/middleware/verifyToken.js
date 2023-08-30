module.exports = (options, app) => {
  
  return async function (ctx, next) {
    // 能不能进入首页
    // const token = ctx.cookies.get('token')
    // if(!token) {
    //   ctx.redirect('/login')
    //   ctx.cookies.set('token', '')
    //   return
    // }

    // // 有token
    // const res = await app.axios.get(`${app.config.$apiBase}/api/user/whoami`, {
    //   headers: {
    //     authorization: `Bearer ${token}`
    //   }
    // })

    // // 有token的情况下，获取用户个人信息
    // // 查看token是否被篡改过
    // if(res.data.code) {
    //   ctx.redirect('/login')
    //   ctx.cookies.set('token', '')
    //   return
    // }

    // // ctx.state.user = res.data.data
    // ctx.locals.user = res.data.data

    // await next()


    // 抽离逻辑之后，将接口请求放到service/user.js文件中
    // 你能不能进入首页
    const token = ctx.cookies.get("token");
    const user = await ctx.service.user.whoAmI(token);
    if (!user) {
      ctx.redirect("/login");
      ctx.cookies.set('token', '')
      return;
    }
    ctx.locals.user = user;
    await next();
  }
}
