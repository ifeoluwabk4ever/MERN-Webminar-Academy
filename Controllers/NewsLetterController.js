import NewsLetter from '../Models/NewsLetterModel.js';


// @route    GET /webminar/all-news
// @desc    Get all news
// @access  Public
export const getAllNewsLetter = async (req, res) => {
   try {
      let allNewsLetter = await NewsLetter.find().sort({ updatedAt: -1 })

      res.json({
         success: true,
         count: allNewsLetter.length,
         allNewsLetter
      })
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         msg: error.message
      })
   }
}


// @route    POST /webminar/all-news
// @desc    Add news
// @access  Private Admin
export const addNewsLetter = async (req, res) => {
   try {
      let { mainImage, headline, otherImages, author, storyline } = req.body

      if (!mainImage) return res.status(400).json({
         msg: 'News Main Image required'
      })
      if (!headline) return res.status(400).json({
         msg: 'Headline required'
      })
      if (!author) return res.status(400).json({
         msg: 'Author required'
      })
      if (!storyline) return res.status(400).json({
         msg: 'Storyline required'
      })

      let newNewsLetter = new NewsLetter({ mainImage, headline, otherImages, author, storyline })

      await newNewsLetter.save()

      res.json({
         msg: `${headline} uploaded`
      })
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         msg: error.message
      })
   }
}


// @route    PUT /webminar/all-news/:news_slug
// @desc    Edit news
// @access  Private Admin
export const editNewsLetter = async (req, res) => {
   try {
      let { news_slug } = req.params

      let checkParams = await NewsLetter.findOne({ news_slug })

      if (!checkParams) return res.status(400).json({
         msg: `${news_slug} not found`
      })

      let { mainImage, headline, otherImages, author, storyline } = req.body
      if (!mainImage) return res.status(400).json({
         msg: 'News Main Image required'
      })
      if (!headline) return res.status(400).json({
         msg: 'Headline required'
      })
      if (!author) return res.status(400).json({
         msg: 'Author required'
      })
      if (!storyline) return res.status(400).json({
         msg: 'Storyline required'
      })

      await NewsLetter.findOneAndUpdate({ news_slug }, { mainImage, headline, otherImages, author, storyline })
      res.json({
         msg: `'${headline}' updated`
      })

   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         msg: error.message
      })
   }
}


// @route    DELETE /webminar/all-news/:news_slug
// @desc    Delete News
// @access  Private Admin
export const deleteNewsLetter = async (req, res) => {
   try {
      let { news_slug } = req.params
      let findNewsLetter = NewsLetter.findOne({ news_slug })
      if (!findNewsLetter) return res.status(400).json({
         msg: `NewsLetter '${news_slug}' not found`
      })

      NewsLetter.findOneAndDelete({ news_slug })
      res.json({
         msg: `'${findNewsLetter.headline}' deleted`
      })
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         msg: error.message
      })
   }
}