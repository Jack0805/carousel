import React from 'react';
import {MovieState} from "@/app/state/movies/movieSlice";
import {endPoint} from '../utils/constants'
import Error from '../components/Error/error'

interface ContentProps {
    mid: number
}
const Content = async ({mid}: ContentProps) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endPoint}`) // Server Side component fetch data from local file
        const data = await res.json()
        const movie = data.filter((item:MovieState) => mid === item.id)
        const arr = [movie[0].rating, movie[0].year.toString(), movie[0].genre, movie[0].language]
        return (
            <div className="content-container">
            <span>
                <img className="item-image" src={movie[0].image}></img>
            </span>
                <div className="content-text">
                    <h1>{movie[0].title}</h1>
                    <div className="description">
                        {
                            arr.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <span>{item}</span>
                                        {
                                            index !== arr.length && <span>|</span>
                                        }

                                    </div>
                                )
                            })

                        }
                    </div>
                    <p>{movie[0].description}</p>
                </div>
            </div>
        );
    }catch (e) {
        return (
            <Error errorMessage='An unknown error occurred, please try again later'/>
        )
    }
};

export default Content;