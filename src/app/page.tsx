'use client'
import React from 'react';
import Carousel from './components/Carousel/carousel'
import {useViewportWidth} from './utils/customHooks'
import {endPoint} from './utils/constants'
import dynamic from "next/dynamic";
import {useAppSelector} from "@/app/state/hooks";
import Error from './components/Error/error'
import {RootState} from "@/app/state/store";

const NavigationWithSSR = dynamic(() => import('./components/SiteNavigation'));
function HomePage() {
    const isError = useAppSelector((state: RootState) => state.movies.isError);
    const errorMessage = useAppSelector((state: RootState) => state.movies.errorMessage);
    const numberOfItem = useViewportWidth();


    return (
        <div className="home">
            <NavigationWithSSR pageActive='home'/>
            {
                isError ? (
                    <Error errorMessage={errorMessage}/>
                ) : (
                    <Carousel endPoint={endPoint} maxNumberOfItem={numberOfItem}></Carousel>
                )
            }
        </div>
    );
}

export default HomePage;