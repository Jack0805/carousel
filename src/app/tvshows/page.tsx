'use client'
import React from 'react';
import Carouselv2 from "@/app/components/Carouselv2/carouselv2";
const endpoint = '/data/data.json'
import dynamic from "next/dynamic";
import Error from '../components/Error/error'
import {useAppSelector} from "@/app/state/hooks";
import {RootState} from "@/app/state/store";

const NavigationWithSSR = dynamic(() => import('../components/SiteNavigation'));
function HomePage() {
    const isError = useAppSelector((state: RootState) => state.movies.isError);
    const errorMessage = useAppSelector((state: RootState) => state.movies.errorMessage);
    return (
        <div className="home">
            <NavigationWithSSR pageActive='tvshows'/>
            {
                isError ? (
                    <Error errorMessage={errorMessage}/>
                ) : (
                    <Carouselv2 endPoint={endpoint} maxNumberOfItem={6}></Carouselv2>
                )
            }
        </div>
    );
}

export default HomePage;