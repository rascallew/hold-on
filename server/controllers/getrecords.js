
const {mysql} = require('../qcloud')

module.exports = async(ctx) => {
    const {openid, page} = ctx.request.query

    try {
    // 请求数据库
        const records = await mysql('records')
        .where('openid', openid)
        .orderBy('id', 'desc')
        // eslint-disable-next-line no-undef
        .limit(15).offset(Number(page) * 15)
    // 向前端传入records数据
        ctx.state.data = {
            records
        }
    } catch (error) {
        ctx.state = {
            code: -1,
            data: {
                msg: '获取失败' + error.sqlMessage
            }
        }
    }
}
