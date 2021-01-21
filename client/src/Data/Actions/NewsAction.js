import axios from 'axios'
import { toast } from 'react-toastify'
import { GET_NEWS, DELETE_NEWS, NEWS_LOADING, GET_NEWS_FAIL, DELETE_NEWS_FAIL, UPDATE_NEWS_FAIL, UPDATE_NEWS, ADD_NEWS, ADD_NEWS_FAIL } from './ActionTypes'



export let getNews = () => async dispatch => {
   try {
      let res = await axios.get(`/webminar/all-news`)
      dispatch({
         type: GET_NEWS,
         payload: res.data.allNewsLetter
      })
      // console.log(res.data.allNews);
   } catch (error) {
      dispatch({ type: GET_NEWS_FAIL })
   }
}

export let addNews = ({ mainImage, headline, otherImages, author, storyline }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   let body = JSON.stringify({ mainImage, headline, otherImages, author, storyline })
   try {
      dispatch(setItemLoading())
      let res = await axios.post(`/webminar/all-news`, body, config)
      dispatch({
         type: ADD_NEWS,
         payload: res.data
      })
      dispatch(getNews())
      console.log(res.data);
      toast.success(res.data.msg)
   } catch (error) {
      let errors = error.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: ADD_NEWS_FAIL })
   }
}


export let editNews = ({ news_slug, mainImage, headline, otherImages, author, storyline }) => async dispatch => {
   try {
      dispatch(setItemLoading())
      let body = JSON.stringify({ mainImage, headline, otherImages, author, storyline })

      let res = await axios.put(`/webminar/all-news/${news_slug}`, body)
      dispatch({
         type: UPDATE_NEWS,
         payload: res.data
      })
      dispatch(getNews())
      console.log(res.data);
      toast.success(res.data.msg)
   } catch (error) {
      let errors = error.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: UPDATE_NEWS_FAIL })
   }
}

export let deleteNews = news_slug => async dispatch => {
   try {
      dispatch(setItemLoading())
      let res = await axios.delete(`/webminar/all-news/${news_slug}`)
      dispatch({
         type: DELETE_NEWS,
         payload: news_slug
      })
      toast.success(res.data.msg)
      dispatch(getNews())
   } catch (error) {
      let errors = error.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: DELETE_NEWS_FAIL })
   }
}

export let setItemLoading = () => {
   return {
      type: NEWS_LOADING
   }
}