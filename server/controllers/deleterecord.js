
const {mysql} = require('../qcloud')

module.exports = async(ctx) => {
    const {openid} = ctx.request.body
    try {
        const res = await mysql('records').where('openid', openid).orderBy('id', 'desc').first()
        if (res) {
            await mysql('records').where('id', res.id).del()
            // eslint-disable-next-line camelcase
            const re_res = await mysql('records').where('openid', openid).select('mark').orderBy('id', 'desc').first()
          // eslint-disable-next-line camelcase
            if (re_res) {
                var mark = re_res.mark
            } else {
              // eslint-disable-next-line no-redeclare
                var mark = 0
            }
        } else {
            // eslint-disable-next-line no-redeclare
            var mark = 0
        }
        // 传递数据给前端
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
                msg: '撤销失败' + error.sqlMessage
            }
        }
    }
}
