import crypto from 'crypto'
import multer from 'multer'
import { resolve } from 'path'

export default {
  tmpFolder: resolve(__dirname, '..', '..', 'tmp'),
  upload(folder: string): { storage: multer.StorageEngine } {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename: (req, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString('hex')
          const fileName = `${fileHash}-${file.originalname}`

          return callback(null, fileName)
        },
      }),
    }
  },
}
