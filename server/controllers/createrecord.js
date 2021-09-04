const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {openid, add} = ctx.request.body

    try {
        const res = await mysql('records').where('openid', openid).select('mark').orderBy('id', 'desc').first()
        if (res) {
            var mark = res.mark
        } else {
            // eslint-disable-next-line no-redeclare
            var mark = 0
        }
        mark = mark + add
        console.log('当前分数：', mark)
      // 插入到数据库
        await mysql('records').insert({
            openid, add, mark
        })

        ctx.state.data = {
            code: 0,
            msg: 'success'
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
