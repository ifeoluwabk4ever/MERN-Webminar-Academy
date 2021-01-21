import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody } from 'reactstrap'
import { connect } from 'react-redux'
import { DotLoader, MoonLoader } from 'react-spinners'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaTimes } from 'react-icons/all'


import { addNews } from '../../Data/Actions/NewsAction'


const AddNews = ({ addNews, isValid, isValidAuth, isLoading }) => {

   let [data, setData] = useState({
      headline: '',
      storyline: '',
      author: ''
   })
   // let [modal, setCard] = useState(false)
   let [callbackAddNews, setCallbackAddNews] = useState(false)

   let { headline, storyline, author } = data

   let textChange = name => e => {
      setData({ ...data, [name]: e.target.value })
   }

   const [images, setImages] = useState(false)
   const [showOtherImages, setShowOtherImages] = useState(false)
   let [loading, setLoading] = useState(false)
   let [otherLoading, setOtherLoading] = useState({
      loading1: '',
      loading2: '',
      loading3: ''
   })
   let [otherNewsImage, setOtherNewsImage] = useState({
      otherImage1: '',
      otherImage2: '',
      otherImage3: ''
   })
   let [otherImages, setOtherImages] = useState({
      otherImages1: false,
      otherImages2: false,
      otherImages3: false
   })
   let [newsImage, setNewsImage] = useState('')

   let { otherImage1, otherImage2, otherImage3 } = otherNewsImage
   let { otherImages1, otherImages2, otherImages3 } = otherImages
   let { loading1, loading2, loading3 } = otherLoading
   let styleUpload = {
      display: images ? "block" : "none"
   }
   let styleUpload1 = {
      display: otherImages1 ? "block" : "none"
   }
   let styleUpload2 = {
      display: otherImages2 ? "block" : "none"
   }
   let styleUpload3 = {
      display: otherImages3 ? "block" : "none"
   }

   let handleNewsImageUpload = async e => {
      e.preventDefault()

      try {
         let file = e.target.files[0]
         if (!file) return toast.error("No Image file included...")
         if (file.size > 1024 * 1024) return toast.error("File size too large, ~= 1mb...")
         if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') return toast.error("File format unaccepted...")

         newsImage = new FormData()
         newsImage.append('newsImage', file)

         setLoading(true)
         const res = await axios.post(`/webminar/upload/news`, newsImage, {
            headers: {
               'content-type': 'multipart/form-data'
            }
         })
         setLoading(false)
         setImages(res.data.msg);
         setNewsImage(res.data.msg.newsImage)
      } catch (error) {
         toast.error(error.response.data.msg)
      }
   }

   let handleNewsImageDestroy = async () => {
      try {
         setLoading(true)
         let res = await axios.post(`/webminar/destroy/news`, { newsImage_path: `./Public/Uploads/${newsImage}` })

         setLoading(false)
         setImages(false)
         toast.warning(res.data.msg)
         setNewsImage('')
      } catch (error) {
         toast.error(error.response.data.msg)
      }
   }

   let handleOtherNewsImageUpload = async (e, newstype, loadingtype, imagetype) => {
      e.preventDefault()

      try {
         let file = e.target.files[0]
         if (!file) return toast.error("No Image file included...")
         if (file.size > 1024 * 1024) return toast.error("File size too large, ~= 1mb...")
         if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') return toast.error("File format unaccepted...")

         var value = newstype === 'otherImage1' ? otherImage1 : newstype === otherImage2 ? 'otherImage2' : newstype === 'otherImage3' ? otherImage3 : ''

         console.log(value);

         value = new FormData()
         value.append(newstype, file)

         setOtherLoading({
            ...otherLoading,
            [loadingtype]: true
         })
         var res
         if (newstype === 'otherImage1') {

            res = await axios.post(`/webminar/upload/other-news1`, value, {
               headers: {
                  'content-type': 'multipart/form-data'
               }
            })
         }
         if (newstype === 'otherImage2') {

            res = await axios.post(`/webminar/upload/other-news2`, value, {
               headers: {
                  'content-type': 'multipart/form-data'
               }
            })
         }
         if (newstype === 'otherImage3') {

            res = await axios.post(`/webminar/upload/other-news3`, value, {
               headers: {
                  'content-type': 'multipart/form-data'
               }
            })
         }
         setOtherLoading({
            ...otherLoading,
            [loadingtype]: false
         })
         setOtherImages({
            ...otherImages,
            [imagetype]: res.data.msg
         });
         setOtherNewsImage({
            ...otherNewsImage,
            [newstype]: newstype === 'otherImage1' ? res.data.msg.otherImage1 : newstype === 'otherImage2' ? res.data.msg.otherImage2 : newstype === 'otherImage3' ? res.data.msg.otherImage3 : ''
         })
      } catch (error) {
         toast.error(error.response.data.msg)
      }
   }

   let handleOtherNewsImageDestroy = async (newstype, loadingtype, imagetype) => {
      try {
         setOtherLoading({
            ...otherLoading,
            [loadingtype]: true
         })
         var value = newstype === 'otherImage1' ? otherImage1 : newstype === otherImage2 ? 'otherImage2' : newstype === 'otherImage3' ? otherImage3 : ''
         let res = await axios.post(`/webminar/destroy/news`, { newsImage_path: `./Public/Uploads/${value}` })


         setOtherLoading({
            ...otherLoading,
            [loadingtype]: false
         })
         setOtherImages({
            ...otherImages,
            [imagetype]: false
         });
         toast.warning(res.data.msg)
         setOtherNewsImage({
            ...otherNewsImage,
            [newstype]: ''
         })
      } catch (error) {
         toast.error(error.response.data.msg)
      }
   }

   let handleSubmit = async e => {
      e.preventDefault()
      addNews({ headline, storyline, mainImage: newsImage, otherImages: [otherImage1, otherImage2, otherImage3], author })
      setCallbackAddNews(true)
   }
   let clearDefault = () => {
      setData({
         ...data,
         headline: '',
         storyline: '',
         author: ''
      })
      setNewsImage('')
      setOtherNewsImage({
         ...otherNewsImage,
         otherImage1: '',
         otherImage2: '',
         otherImage3: ''
      })
      setOtherImages({
         ...otherImages,
         otherImages1: false,
         otherImages2: false,
         otherImages3: false
      })
      setImages(false)
      setShowOtherImages(false)
   }

   useEffect(() => {
      if (isValid && isValidAuth && callbackAddNews) {
         clearDefault()
      }
   }, [isValidAuth, callbackAddNews])

   return (
      <div>
         <Card className="my-5 mx-5">
            <CardHeader className="list-group-item-success"><h3>Add News Form</h3></CardHeader>
            <CardBody>
               <div>
                  <div className="upload col-4 mx-auto position-relative p-2 mb-3">
                     <input
                        className="upload-file"
                        type="file"
                        id="file_up"
                        name="file"
                        onChange={handleNewsImageUpload}
                     />
                     {
                        loading ?
                           <div className="file_img d-flex align-items-center justify-content-center">
                              <DotLoader color="#198754" size={24} />
                           </div>
                           : <div className="file_img" style={styleUpload}>
                              <img src={images ? `/Uploads/${newsImage}` : ''} alt="profile_picture" />
                              <div className="faTimes" onClick={handleNewsImageDestroy}>
                                 <FaTimes color="red" size={20} />
                              </div>
                           </div>
                     }
                  </div>
                  <div className="d-flex justify-content-end mb-3">
                     <button className="btn btn-outline-success"
                        onClick={() => setShowOtherImages(!showOtherImages)}>Others</button>
                  </div>
                  {showOtherImages &&
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                        <div className="upload upload3 col-4 mx-auto position-relative p-2 mb-3">
                           <input
                              className="upload-file upload-file3"
                              type="file"
                              id="file_up"
                              name="file"
                              onChange={e => handleOtherNewsImageUpload(e, 'otherImage1', 'loading1', 'otherImages1')}
                           />
                           {
                              loading1 ?
                                 <div className="file_img d-flex align-items-center justify-content-center">
                                    <DotLoader color="#198754" size={24} />
                                 </div>
                                 : <div className="file_img" style={styleUpload1}>
                                    <img src={otherImages1 ? `/Uploads/${otherImage1}` : ''} alt="profile_picture" />
                                    <div className="faTimes" onClick={() => handleOtherNewsImageDestroy('otherImage1', 'loading1', 'otherImages1')}>
                                       <FaTimes color="red" size={20} />
                                    </div>
                                 </div>
                           }
                        </div>
                        <div className="upload upload3 col-4 mx-auto position-relative p-2 mb-3">
                           <input
                              className="upload-file upload-file3"
                              type="file"
                              id="file_up"
                              name="file"
                              onChange={e => handleOtherNewsImageUpload(e, 'otherImage2', 'loading2', 'otherImages2')}
                           />
                           {
                              loading2 ?
                                 <div className="file_img d-flex align-items-center justify-content-center">
                                    <DotLoader color="#198754" size={24} />
                                 </div>
                                 : <div className="file_img" style={styleUpload2}>
                                    <img src={otherImages2 ? `/Uploads/${otherImage2}` : ''} alt="profile_picture" />
                                    <div className="faTimes" onClick={() => handleOtherNewsImageDestroy('otherImage2', 'loading2', 'otherImages2')}>
                                       <FaTimes color="red" size={20} />
                                    </div>
                                 </div>
                           }
                        </div>
                        <div className="upload upload3 col-4 mx-auto position-relative p-2 mb-3">
                           <input
                              className="upload-file upload-file3"
                              type="file"
                              id="file_up"
                              name="file"
                              onChange={e => handleOtherNewsImageUpload(e, 'otherImage3', 'loading3', 'otherImages3')}
                           />
                           {
                              loading3 ?
                                 <div className="file_img d-flex align-items-center justify-content-center">
                                    <DotLoader color="#198754" size={24} />
                                 </div>
                                 : <div className="file_img" style={styleUpload3}>
                                    <img src={otherImages3 ? `/Uploads/${otherImage3}` : ''} alt="profile_picture" />
                                    <div className="faTimes" onClick={() => handleOtherNewsImageDestroy('otherImage3', 'loading3', 'otherImages3')}>
                                       <FaTimes color="red" size={20} />
                                    </div>
                                 </div>
                           }
                        </div>
                     </div>
                  }
               </div>
               <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                     <input
                        type="text"
                        className="form-control text-black"
                        id="headline"
                        placeholder="Headline"
                        value={headline}
                        onChange={textChange("headline")}
                     />
                     <label htmlFor="headline">Headline:</label>
                  </div>
                  <div className="form-floating mb-3">
                     <input
                        type="text"
                        className="form-control text-black"
                        id="author"
                        placeholder="Author"
                        value={author}
                        onChange={textChange("author")}
                     />
                     <label htmlFor="author">Author:</label>
                  </div>
                  <div className="form-floating mb-3">
                     <textarea
                        type="text"
                        className="form-control text-black"
                        id="storyline"
                        placeholder="Storyline"
                        value={storyline}
                        style={{
                           resize: 'none',
                           height: '20rem'
                        }}
                        onChange={textChange('storyline')}
                     ></textarea>
                     <label htmlFor="storyline">Main News:</label>
                  </div>
                  {
                     isLoading ?
                        <div className="my-3">
                           <MoonLoader size={32} color='#198754' />
                        </div>
                        :
                        <button
                           type="submit"
                           className="btn btn-success my-3 px-4 text-capitalize"
                        >Add news</button>
                  }
               </form>
            </CardBody>
         </Card>
      </div>
   )
}



const mapStateToProps = state => ({
   isValid: state.mainNews.isValid,
   isValidAuth: state.mainNews.isValidAuth,
   isLoading: state.mainNews.isLoading,
})

export default connect(mapStateToProps, { addNews })(AddNews)
