const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {openid} = ctx.request.query

    try {
        const res = await mysql('records').where('openid', openid).select('mark').orderBy('id', 'desc').first()
        if (res) {
            var mark = res.mark
        } else {
            // eslint-disable-next-line no-redeclare
            var mark = 0
        }
        ctx.state.data = {
            code: 0,
            msg: 'success',
            mark: mark
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
