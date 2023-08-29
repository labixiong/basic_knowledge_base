// 别的路径访问 改为访问index.html
/**
 * 1. 要是get请求
 * 2. accept头部包含text/html
 * 3. 请求路径不能包含 .
 * 
 * 以上三种情况都满足才进行路径的修改
 */ 
module.exports = async function(ctx, next) {
  if(ctx.method === 'GET' && ctx.headers.accept.includes('text/html') && !ctx.path.includes('.')) {
    ctx.path = '/index.html'
  }
  await next() 
}
