const path = require('path');

// 上传文件临时路径
const STATIC_TEMPORARY = path.join(__dirname, '../../data/vue-all/big-file');

exports.upload = async (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        // console.log(fields);
        // console.log(files);
        let filename = fields.filename[0]
        let hash = fields.hash[0]
        let chunk = files.chunk[0]
        let dir = `${STATIC_TEMPORARY}/${filename}`
        // console.log(filename, hash, chunk, dir)
        try {
            if (!fs.existsSync(dir)) fs.mkdirSync(dir)
            const buffer = fs.readFileSync(chunk.path)
            const ws = fs.createWriteStream(`${dir}/${hash}`)
            ws.write(buffer)
            ws.close()

            res.send(`${filename}-${hash} 切片上传成功`)
        } catch (error) {
            console.error(error)
            res.status(500).send(`${filename}-${hash} 切片上传失败`)
        }
    })
}

