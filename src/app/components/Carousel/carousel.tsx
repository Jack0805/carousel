import React, {useEffect, useState, KeyboardEvent} from 'react';
import {
    fetchMoviesThunk,
    getNextMoviesOnScreenArr,
    getPreviousMoviesOnScreenArr,
    setCurrentMovieData,
    MovieState
} from "@/app/state/movies/movieSlice";
import {RootState} from "@/app/state/store";
import {useAppDispatch,useAppSelector} from "@/app/state/hooks";
import Movie from './movie'
import { useRouter } from "next/navigation";
import './carousel.css'
export interface CarouselProps {
    endPoint: string
    maxNumberOfItem: number
}
export interface OnClickProps {
    movie:  MovieState,
    selectedIndex: number
}
const Carousel = ({endPoint,maxNumberOfItem}:CarouselProps) => {
    const previousPageState = useAppSelector((state: RootState) => state.movies.previousPageState)
    const [selectedIndex, setSelectedIndex] = useState(previousPageState.selectedIndex)
    const moviesOnScreen = useAppSelector((state: RootState) => state.movies.moviesOnScreen);
    const currentPageNumber = useAppSelector((state: RootState) => state.movies.currentPage);
    const numOfPages = useAppSelector((state: RootState) => state.movies.numOfPages);
    const numbOfLastPageMovies = useAppSelector((state: RootState) => state.movies.numbOfLastPageMovies);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if (previousPageState.pageNum == 1 || currentPageNumber == 1 ) {
            dispatch(fetchMoviesThunk({endPoint, maxNumberOfItem, errorMessage: 'An unknown error occurred, please try again later'}))
        }
    }, [maxNumberOfItem]);
    const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
            if (selectedIndex == 0) {
                if (currentPageNumber != 1) {
                    dispatch(getPreviousMoviesOnScreenArr({currentPageNumber, maxNumberOfItem}))
                    setSelectedIndex(maxNumberOfItem -1)
                }
            } else {
                setSelectedIndex(selectedIndex - 1)
            }

        } else if (event.key === 'ArrowRight') {
            if (selectedIndex < maxNumberOfItem - 1) {
                if (currentPageNumber == numOfPages && selectedIndex == numbOfLastPageMovies - 1){


                } else {
                    setSelectedIndex(selectedIndex + 1)
                }
            } else {
                if (currentPageNumber != numOfPages){
                    dispatch(getNextMoviesOnScreenArr({currentPageNumber, maxNumberOfItem}))
                    setSelectedIndex(0)
                }
            }
        } else if (event.key === 'Enter'){
            router.push(`/program/?mid=${moviesOnScreen[selectedIndex].id}&selectedIndex=${selectedIndex}&page=${currentPageNumber}`)
        }
    }

    const handleOnClick = (props:OnClickProps) => {
        setSelectedIndex(props.selectedIndex)
        dispatch(setCurrentMovieData({...props.movie}))
    }

    return (
        <div className="container">
            <div className="carousel">
                {
                    moviesOnScreen.map((movie,idx) => {
                        return (
                            <Movie
                                index={idx}
                                movie={movie}
                                key={movie.id}
                                selected={idx===selectedIndex}
                                selectedIndex={idx}
                                currentPage = {currentPageNumber}
                                handleClick = {handleOnClick}
                                handleKeyPress={handleKeyPress}/>

                        )
                    })
                }
            </div>
        </div>
    );
};

export default Carousel;