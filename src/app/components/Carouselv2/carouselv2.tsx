'use client'
import React, {useEffect, useRef, useState, useCallback, KeyboardEvent, SetStateAction} from 'react';
import './carousel.css';
import {useAppDispatch,useAppSelector} from "@/app/state/hooks";
import {RootState} from "@/app/state/store";
import {fetchMoviesThunk, getNextMoviesOnScreenArr, getPreviousMoviesOnScreenArr} from "@/app/state/movies/movieSlice";
import {CarouselProps} from "../Carousel/carousel"
import {useRouter} from "next/navigation";
import Moviev2 from "@/app/components/Carouselv2/moviev2";


function Carouselv2({endPoint,maxNumberOfItem}:CarouselProps) {
    const [currentPosition, setCurrentPosition] = useState(0)
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [triggerIndexRight,setTriggerIndexRight] = useState<number | null>(-1);
    const [triggerIndexLeft,setTriggerIndexLeft] = useState<number | null>(-1);
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useAppDispatch();
    const movies = useAppSelector((state: RootState) => state.movies.movies);
    const router = useRouter();


    useEffect(() => {
        dispatch(fetchMoviesThunk({endPoint, maxNumberOfItem, errorMessage: 'An unknown error occurred, please try again later'}))
    }, []);

    useEffect(() => {

        const options = {
            root: document.getElementById('root'),
            rootMargin: '10px',
            threshold: 0.01
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (entry.intersectionRect.width < entry.boundingClientRect.width && entry.boundingClientRect.right > window.innerWidth) {
                        const dataKey = entry.target.getAttribute('data-key') as SetStateAction<any>;
                        setTriggerIndexRight(parseInt(dataKey))
                    } else if (entry.intersectionRect.width < entry.boundingClientRect.width && entry.boundingClientRect.left < 0) {
                        const dataKey = entry.target.getAttribute('data-key') as SetStateAction<any>;
                        setTriggerIndexLeft(parseInt(dataKey))
                    } else if (entry.target.getAttribute('data-key') as SetStateAction<any> == movies.length -1 ){
                        setTriggerIndexRight(-1)
                    }

                    const imgElement = entry.target.querySelector('img');
                    if (imgElement) {
                        imgElement.setAttribute('src', entry.target.getAttribute('data-src') as string)
                        imgElement.setAttribute('style', 'opacity: 1;');
                    }

                }
                if (!entry.isIntersecting) {
                    if (entry.intersectionRect.width > 0 && entry.intersectionRect.width < entry.boundingClientRect.width && entry.boundingClientRect.left < 0) {
                        const dataKey = entry.target.getAttribute('data-key') as SetStateAction<any>;
                        setTriggerIndexLeft(parseInt(dataKey))
                    }
                    const imgElement = entry.target.querySelector('img');
                    if (imgElement) {
                        imgElement.setAttribute('src', '')
                        imgElement.setAttribute('style', 'opacity: 0;transition: opacity 1s ease-in-out;')
                    }
                }
            })
        },options)

        const images = document.querySelectorAll(`.carouselv2-item`);

        images.forEach((img) => observer.observe(img))

        return () => {
            observer.disconnect()
        }

    }, [movies]);

    const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
            setTimeout(() => {
                if (selectedIndex != 0) {
                    if ((selectedIndex-1) == triggerIndexLeft) {
                        setSelectedIndex(selectedIndex - 1)
                        setCurrentPosition(((prePosition) => (prePosition - 0.85)));
                        setTriggerIndexRight(triggerIndexLeft + 1)
                    } else {
                        setSelectedIndex(selectedIndex - 1)
                    }
                }
            },150)
        } else if (event.key === 'ArrowRight') {
            setTimeout(() => {
                if ((selectedIndex + 1) != movies.length) {
                    if ((selectedIndex+1) == triggerIndexRight) {
                        setSelectedIndex(selectedIndex + 1)
                        setCurrentPosition(((prePosition) => (prePosition + 0.85)));
                        setTriggerIndexLeft(triggerIndexRight-1)
                    } else {
                        setSelectedIndex(selectedIndex + 1)
                    }
                }
            },100)
        } else if (event.key === 'Enter'){
            router.push(`/program/?mid=${movies[selectedIndex].id}`)
        }
    }

    return(
        <div className="carouselv2-container">
            <div className="carouselv2-track" ref={carouselRef} style={{transform: `translateX(${-currentPosition*100}%)`}}>
                <span className="carouselv2-item-placehodler" />
                {
                    movies.map((item, index) => {
                        return (
                            <Moviev2
                                movie={item}
                                key={index}
                                index={index}
                                selected={index===selectedIndex}
                                selectedIndex={index}
                                currentPage = {0}
                                handleClick = {()=>null}
                                handleKeyPress={handleKeyPress}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Carouselv2;