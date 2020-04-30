const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

aws.config.update({
    // secretAccessKey: process.env.AWSAccessKey,
    // accessKeyId: process.env.AWSAccessKeyId,
    AWSAccessKeyId:"AKIAJ4LMGGJ2Q3OITMYA",
    AWSSecretKey:"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"
})

const s3 = new aws.S3()

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'vue-amazon-clone-v1',
        acl: 'public-read',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname })
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload