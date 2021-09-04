/**
 * 处理前端的请求
 */

// knex操作数据库
// eslint-disable-next-line no-unused-vars
const { mysql } = require('../qcloud')

module.exports = async(ctx) => {
    const {id, note} = ctx.request.body
    try {
        await mysql('records').where('id', id).update('note', note)
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
                msg: '修改失败' + error.sqlMessage
            }
        }
    }
}
