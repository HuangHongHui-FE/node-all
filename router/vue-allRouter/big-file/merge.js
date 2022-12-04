const path = require('path');
const fs = require('fs');
const { sendFormat } = require('../../../utils/sendFormat')
// 上传文件最终路径
const STATIC_FILES = path.join(__dirname, '../../../data/vue-all/big-file/files')
const STATIC_TEMPORARY = path.join(__dirname, '../../../data/vue-all/big-file/temporary');

//合并切片接口
exports.merge = async (req, res) => {
    console.log('merge---', req.query);
    const { filename } = req.query;
    try {
        let len = 0
        const bufferList = fs.readdirSync(`${STATIC_TEMPORARY}/${filename}`).map((hash, index) => {
            const buffer = fs.readFileSync(`${STATIC_TEMPORARY}/${filename}/${index}`)
            len += buffer.length
            return buffer;
        });
        //合并文件
        const buffer = Buffer.concat(bufferList, len);
        const ws = fs.createWriteStream(`${STATIC_FILES}/${filename}`)
        ws.write(buffer);
        ws.close();

        res.send(sendFormat({data: buffer}));
        // `切片合并完成`
    } catch (error) {
        res.send(sendFormat({status: 500, msg: 'merge.js---'+error}))
    }
}
