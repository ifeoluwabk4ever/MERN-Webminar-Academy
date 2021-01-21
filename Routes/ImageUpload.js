import express from 'express'
import multer from 'multer'
import fs from 'fs'

const router = express.Router()


const storage = multer.diskStorage({
   // Where to store the files
   destination: (req, file, callback) => {
      callback(null, './Public/Images')
   },
   // Add filename
   filename: (req, file, callback) => {
      callback(null, Date.now() + file.originalname)
   }
})
// Upload Parameters for multer
const upload = multer({
   storage,
   limits: {
      fieldSize: 1024 * 1024
   }
})


const storage2 = multer.diskStorage({
   // Where to store the files
   destination: (req, file, callback) => {
      callback(null, './Public/Uploads')
   },
   // Add filename
   filename: (req, file, callback) => {
      callback(null, Date.now() + file.originalname)
   }
})
// Upload Parameters for multer
const upload2 = multer({
   storage: storage2,
   limits: {
      fieldSize: 1024 * 1024
   }
})



router.route('/upload/profile-picture')
   .post(upload.single('avatar'), async (req, res) => {
      try {
         let file1 = req.file


         if (file1.size > 1024 * 1024) {
            removeTmp(`${file1.destination}/${file1.filename}`)
            return res.status(400).json({
               msg: `File size exceeds limit of 1mb, ${file1.size}...`
            })
         }
         if (file1.mimetype !== 'image/jpeg' && file1.mimetype !== 'image/jpg' && file1.mimetype !== 'image/png') {
            removeTmp(`${file1.destination}/${file1.filename}`)
            return res.status(400).json({
               msg: `File format not supported, ${file1.mimetype}...`
            })
         }

         res.json({
            msg: {
               avatar: file1.filename
            }
         })
      } catch (error) {
         res.status(500).json({
            msg: error.message
         })
      }
   })


router.route('/destroy/profile-picture')
   .post(async (req, res) => {
      let { avatar_path } = req.body

      if (!avatar_path) return res.status(400).json({
         msg: "No image file selected"
      })

      removeTmp(avatar_path)
      res.json({
         msg: "Profile picture deleted"
      })
   })


router.route('/upload/other-news1')
   .post(upload2.single('otherImage1'), async (req, res) => {
      try {
         var file1 = req.file


         if (file1.size > 1024 * 1024) {
            removeTmp(`${file1.destination}/${file1.filename}`)
            return res.status(400).json({
               msg: `File size exceeds limit of 1mb, ${file1.size}...`
            })
         }
         if (file1.mimetype !== 'image/jpeg' && file1.mimetype !== 'image/jpg' && file1.mimetype !== 'image/png') {
            removeTmp(`${file1.destination}/${file1.filename}`)
            return res.status(400).json({
               msg: `File format not supported, ${file1.mimetype}...`
            })
         }


         res.json({
            msg: {
               otherImage1: file1.filename,
            }
         })
      } catch (error) {
         res.status(500).json({
            msg: error.message
         })
      }
   })


router.route('/upload/other-news2')
   .post(upload2.single('otherImage2'), async (req, res) => {
      try {
         var file1 = req.file


         if (file1.size > 1024 * 1024) {
            removeTmp(`${file1.destination}/${file1.filename}`)
            return res.status(400).json({
               msg: `File size exceeds limit of 1mb, ${file1.size}...`
            })
         }
         if (file1.mimetype !== 'image/jpeg' && file1.mimetype !== 'image/jpg' && file1.mimetype !== 'image/png') {
            removeTmp(`${file1.destination}/${file1.filename}`)
            return res.status(400).json({
               msg: `File format not supported, ${file1.mimetype}...`
            })
         }


         res.json({
            msg: {
               otherImage2: file1.filename,
            }
         })
      } catch (error) {
         res.status(500).json({
            msg: error.message
         })
      }
   })


router.route('/upload/other-news3')
   .post(upload2.single('otherImage3'), async (req, res) => {
      try {
         var file1 = req.file


         if (file1.size > 1024 * 1024) {
            removeTmp(`${file1.destination}/${file1.filename}`)
            return res.status(400).json({
               msg: `File size exceeds limit of 1mb, ${file1.size}...`
            })
         }
         if (file1.mimetype !== 'image/jpeg' && file1.mimetype !== 'image/jpg' && file1.mimetype !== 'image/png') {
            removeTmp(`${file1.destination}/${file1.filename}`)
            return res.status(400).json({
               msg: `File format not supported, ${file1.mimetype}...`
            })
         }


         res.json({
            msg: {
               otherImage3: file1.filename,
            }
         })
      } catch (error) {
         res.status(500).json({
            msg: error.message
         })
      }
   })


router.route('/upload/news')
   .post(upload2.single('newsImage'), async (req, res) => {
      try {
         let file1 = req.file


         if (file1.size > 1024 * 1024) {
            removeTmp(`${file1.destination}/${file1.filename}`)
            return res.status(400).json({
               msg: `File size exceeds limit of 1mb, ${file1.size}...`
            })
         }
         if (file1.mimetype !== 'image/jpeg' && file1.mimetype !== 'image/jpg' && file1.mimetype !== 'image/png') {
            removeTmp(`${file1.destination}/${file1.filename}`)
            return res.status(400).json({
               msg: `File format not supported, ${file1.mimetype}...`
            })
         }

         res.json({
            msg: {
               newsImage: file1.filename
            }
         })
      } catch (error) {
         res.status(500).json({
            msg: error.message
         })
      }
   })


router.route('/destroy/news')
   .post(async (req, res) => {
      let { newsImage_path } = req.body

      if (!newsImage_path) return res.status(400).json({
         msg: "No image file selected"
      })

      removeTmp(newsImage_path)
      res.json({
         msg: "News Image deleted"
      })
   })




const removeTmp = filename => {
   fs.unlink(filename, err => {
      if (err) throw err
   })
}

export default router