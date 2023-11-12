'use client'
import React, {KeyboardEvent, Suspense, useEffect} from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from "next/dynamic";
import './program.css';
import { useRouter } from "next/navigation";
import {useAutoFocus} from '../utils/customHooks';
import {setPreviousPageState} from '../state/movies/movieSlice';
import {useAppDispatch} from "@/app/state/hooks";

const NavigationWithSSR = dynamic(() => import('../components/SiteNavigation'));
const LoadingSSR = dynamic(() => import('./loading'))
const LazyLoadingComponentSSR = React.lazy(() => {
    return import('./content')
})
const Program = () => {
    const dispatch = useAppDispatch();
    const param = useSearchParams();
    const router = useRouter();
    const {myDivRef} = useAutoFocus({index:0})
    const mid = JSON.parse(param.get('mid') as string);
    const selectedIndex= JSON.parse(param.get('selectedIndex') as string);
    const pageNum = JSON.parse(param.get('page') as string);

    useEffect(() => {
        dispatch(setPreviousPageState({selectedIndex, pageNum}))
    }, []);
    const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Backspace') {
            router.back()
        }
    }

    return (
            <div className='home' ref={myDivRef} onKeyDown={(e) => handleKeyPress(e)} tabIndex={0} style={{ outline: 'none' }}>
                <NavigationWithSSR pageActive="home"/>
                <Suspense fallback={<LoadingSSR />}>
                    <LazyLoadingComponentSSR mid={mid}/>
                </Suspense>
            </div>
    );
};

export default Program;