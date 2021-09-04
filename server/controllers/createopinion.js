/**
 * 处理前端的请求
 */

// knex操作数据库
// eslint-disable-next-line no-unused-vars
const { mysql } = require('../qcloud')

module.exports = async(ctx) => {
    const {opinion, src, wechat, openid} = ctx.request.body
    try {
        await mysql('opinions').insert({
            opinion, src, wechat, openid
        })
      // 向前端传递成功的消息
        ctx.state.data = {
            code: 0,
            msg: ' success '
        }
        console.log('执行成功')
    } catch (error) {
        ctx.state = {
            code: -1,
            data: {
                msg: '添加失败' + error.sqlMessage
            }
        }
    }
}
