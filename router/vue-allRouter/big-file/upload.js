const path = require('path');
const multiparty = require('multiparty')
const fs = require('fs')

const {sendFormat} = require('../../../utils/sendFormat')
// 上传文件临时路径
const STATIC_TEMPORARY = path.join(__dirname, '../../../data/vue-all/big-file/temporary');

exports.upload = async (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        // console.log('upload---', fields, files);
        let filename = fields?.filename[0]
        let hash = fields?.hash[0]
        let chunk = files?.chunk[0]
        let dir = `${STATIC_TEMPORARY}/${filename}`
        // console.log(filename, hash, chunk, dir)
        try {
            if (!fs.existsSync(dir)) fs.mkdirSync(dir)
            const buffer = fs.readFileSync(chunk.path)
            const ws = fs.createWriteStream(`${dir}/${hash}`)
            ws.write(buffer)
            ws.close()

            res.send(sendFormat({msg: `${filename}-${hash} 切片上传成功`}))
        } catch (error) {
            console.error(error)
            res.send(sendFormat({msg: `${filename}-${hash} 切片上传失败`, status: 500}))
        }
    })
}

