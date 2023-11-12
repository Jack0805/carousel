import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface MovieState {
    id: number,
    title: string,
    description: string,
    type: string,
    image: string,
    rating: string,
    genre: string,
    year: number,
    language: string
}

interface actionState {
    maxNumberOfItem: number,
    currentPageNumber: number,
}

interface ThunkActionState {
        maxNumberOfItem: number,
        movies:MovieState[]
}

interface settingState {
    endPoint: string,
    maxNumberOfItem: number,
    errorMessage: string
}
export interface MoviesState {
    movies: MovieState[],
    moviesOnScreen: MovieState[],
    isError: boolean,
    errorMessage: string,
    numOfPages: number,
    numbOfLastPageMovies: number,
    currentPage: number,
    currentMovieData: MovieState,
    previousPageState: SetPreviousPageState,
}

const initialState: MoviesState = {
    movies: [],
    moviesOnScreen: [],
    isError: false,
    errorMessage: '',
    numOfPages: 0,
    numbOfLastPageMovies: 0,
    currentPage: 1,
    currentMovieData: {
        id: 0,
        title: '',
        description: '',
        type: '',
        image: '',
        rating: '',
        genre: '',
        year: 2000,
        language: ''
    },
    previousPageState: {
        selectedIndex: 0,
        pageNum: 1
    }
}

interface SetPreviousPageState {
    selectedIndex: number,
    pageNum: number
}

const moviesSlice = createSlice({
    name: 'Movies',
    initialState,
    reducers: {
        initializeHomePage: (state) => {
            state.currentPage = 1
            state.previousPageState = {selectedIndex: 0, pageNum: 1}
        },
        setPreviousPageState: (state, action: PayloadAction<SetPreviousPageState>) => {
            state.previousPageState = action.payload
            state.currentPage = action.payload.pageNum
        },
        setCurrentMovieData: (state, action:PayloadAction<MovieState>) => {
            state.currentMovieData = action.payload
        },
        getNextMoviesOnScreenArr: (state, action: PayloadAction<actionState>) => {
            if (action.payload.currentPageNumber < state.numOfPages) {
                state.moviesOnScreen  = state.movies.slice(action.payload.currentPageNumber*action.payload.maxNumberOfItem,(action.payload.currentPageNumber+1)*action.payload.maxNumberOfItem);
                state.currentPage = state.currentPage + 1
            } else {
                state.moviesOnScreen = state.movies.slice(-state.numbOfLastPageMovies)
            }
        },
        getPreviousMoviesOnScreenArr: (state,action: PayloadAction<actionState>) => {
            if (action.payload.currentPageNumber - 1 === 1) {
                state.moviesOnScreen = state.movies.slice(0,action.payload.maxNumberOfItem)
                state.currentPage = 1
            } else {
                state.moviesOnScreen  = state.movies.slice((action.payload.currentPageNumber-2)*action.payload.maxNumberOfItem,(action.payload.currentPageNumber-1)*action.payload.maxNumberOfItem);
                state.currentPage = state.currentPage - 1
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMoviesThunk.pending, (state) => {
                // could do extra business logic here while loading
            })
            .addCase(fetchMoviesThunk.fulfilled, (state, action) => {
                state.movies = action.payload?.movies || []
                const max = action.payload?.maxNumberOfItem || 0
                state.numOfPages = Math.floor(state.movies.length / max)
                if (state.movies.length % max != 0) {
                    state.numOfPages = Math.floor(state.movies.length / max) + 1
                    state.numbOfLastPageMovies = state.movies.length % max
                } else {
                    state.numOfPages = Math.floor(state.movies.length / max || 0)
                    state.numbOfLastPageMovies = 6
                }
                state.moviesOnScreen = action.payload?.movies.slice(0,(action.payload?.maxNumberOfItem || 6)) || []
                state.isError = false
            })
            .addCase(fetchMoviesThunk.rejected, (state, action) => {
                state.isError = true
                state.errorMessage = action.error.message || "unknown error"
            })
    }
})

export const fetchMoviesThunk = createAsyncThunk(
    'movies/fetchMoviesThunk',
    async (settings:settingState) => {
        try {
            const res = await fetch(settings.endPoint);
            const data = await res.json();
            return {
                movies: data as MovieState[] ,
                maxNumberOfItem: settings.maxNumberOfItem
            } as ThunkActionState
        } catch (e) {
            throw new Error(settings.errorMessage);
        }
    }
)

export const {
    getNextMoviesOnScreenArr,
    getPreviousMoviesOnScreenArr,
    setCurrentMovieData,
    setPreviousPageState,
    initializeHomePage
} = moviesSlice.actions
export default moviesSlice.reducer