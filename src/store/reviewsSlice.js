import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "@/api/axiosInstance.js";


//import axiosInstance from "@/api/axiosInstance.js";

export const loadReviewLikes = createAsyncThunk('reviews/loadReviewLikes', async () => {
  // потом тут будет запрос на получение лайков для Отзывов и Ответов с сервера, если юзер авторизован (+ проверка авторизации) 

  const LSstring = localStorage.getItem('reviewLikes')
  if (!LSstring) return null
  return JSON.parse(LSstring)

})

export const updateLikes = createAsyncThunk('reviews/updateLikes', async (params, thunkAPI) => {

  const state = thunkAPI.getState()
  const {newLikesObj: likesFromParams, opinionApiObj} = params

  if (state.user.isAuthenticated) {
    // посылаем информацию о лайках/дизлайках пользователя (включая айди самого пользователя..?) на сервер, 
    // должны обновиться данные как по лайкам отзыва, так и по лайкам конкрю. юзера для этого отзыва 
    // (т.е. то, что я сейчас делаю через два запроса - один к АПИ, другой к LS, будет делаться в одном запросе) 
    //
    // ** При регистрации/авторизации, если были данные о лайках в LS, надо их смержить с данными о лайках с сервера и по новой отправить.
  }

  if (opinionApiObj.type === 'reviewLikes') {
    const resp = await axiosInstance.put('/reviews/opinion', {
      reviewId: opinionApiObj.reviewId,
      likeCount: opinionApiObj.likes,
      dislikeCount: opinionApiObj.dislikes
    })

    if (resp.status !== 200) {
      throw new Error('status !== 200')
    } else {
      // в LS в любом случае сетаем, даже если авторизован (пока так)  
      localStorage.setItem('reviewLikes', JSON.stringify(likesFromParams));
    }
  }
  return {likesFromParams, opinionApiObj}
})

const initialState = {
  likesObject: null,
  isLoading: false,
  reviews: []
}

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setLikes: (state, action) => {
      state.reviewLikes = action.payload
    },
    setReviews: (state, action) => {
      state.reviews = action.payload
    }
  },

  extraReducers: builder => builder
    .addCase(updateLikes.pending, (state) => {
      state.isLoading = 'loading'
    })
    .addCase(updateLikes.fulfilled, (state, action) => {
      state.isLoading = 'success'


      console.log('action.payload = ', action.payload)
      state.likesObject = action.payload.likesFromParams
      
      const obj = state.reviews.find(item => item.reviewId === action.payload.opinionApiObj.reviewId)
      obj.likes = action.payload.opinionApiObj.likes
      obj.dislikes = action.payload.opinionApiObj.dislikes
      
    })
    .addCase(updateLikes.rejected, (state, action) => {
      state.isLoading = 'error'
      console.log('ошибка', action.error.message)
    })


    .addCase(loadReviewLikes.pending, (state) => {
      state.isLoading = 'loading'
    })
    .addCase(loadReviewLikes.fulfilled, (state, action) => {
      state.isLoading = 'success'
      state.likesObject = action.payload
    })
    .addCase(loadReviewLikes.rejected, (state, action) => {
      state.isLoading = 'error'
      console.log('ошибка', action.error.message)
    })
  ,
})

export const {setLikes, setReviews} = reviewsSlice.actions
export const getLikes = (state) => {
  return state.reviews.likesObject
}
export const getReviews = (state) => {
  return state.reviews.reviews
}
export default reviewsSlice.reducer