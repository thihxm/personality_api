declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    user: {
      id: string
    }
    files: {
      badge_image: Multer.File[]
      profileImage_flor: Multer.File[]
      profileImage_diab: Multer.File[]
      profileImage_cora: Multer.File[]
      profileImage_estr: Multer.File[]
      [fieldname: string]: Multer.File[]
    }
  }
}
