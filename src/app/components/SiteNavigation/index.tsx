import React from 'react';
import Link from "next/link";
import {useAppDispatch} from "@/app/state/hooks";
import {initializeHomePage} from '../../state/movies/movieSlice'

interface SiteNavigatonProps {
    pageActive: string
}
const SiteNavigation = ({pageActive}: SiteNavigatonProps) => {
    const dispatch = useAppDispatch()
    const handleOnclick = () => {
        dispatch(initializeHomePage())
    }
    return (
        <div className="banner">
            <svg xmlns="http://www.w3.org/2000/svg" width="40%" height="40%" viewBox="0 0 785.70001 236.10001"><g id="ARTWORK"><path d="M753.8 172.4c-20.3 0-31.7 11.4-31.7 30.4 0 19.2 11.4 30.1 31.7 30.1 20 0 31.9-10.9 31.9-30.1 0-19-11.9-30.4-31.9-30.4zM649.4 52.8c-18.9 0-35.5 6.1-48.3 16.9V56.2h-74.4v115.5c-4.1 1.4-8.3 2.4-12.4 2.4-7.1 0-8.4-6.4-8.4-13.2V56.2h-74.3v16.2c-10.1-11.5-24.7-19.3-44.9-19.3-46.6 0-79 38.2-79 91.9 0 4.7.3 9.3.9 13.8-.2 0-.3.1-.5.1l-7.4 4.5c-10.5 5.5-19.1 7.9-29.2 7.9-10.1 0-15.5-4.4-15.5-16.2v-41.9h50v-57h-50V13h-74.4l.1 123.3c-7.3-18.3-25.2-31.8-57.2-41.9L87.3 82.6c-9.8-3-12.8-5.7-12.8-10.8 0-7.4 6.8-12.5 20.3-12.5 21.3 0 50.7 10.8 69.3 22.6l-.4-68.1C143.8 6.1 130.4 0 98 0 36.2 0 0 32.4 0 75.7c0 33.1 16.6 51.7 54 62.8L95.5 150c9.1 2.7 14.9 6.8 14.9 12.5 0 7.4-6.8 14.5-20.6 14.5-22.3 0-50.3-10.8-69.2-23.6L3.4 216.2c15.5 8.4 50.3 19.9 85.1 19.9 51 0 84.2-22.8 93.9-56.6 4.7 37.5 28.1 56.6 64.3 56.6 29.7 0 55.1-7.4 74.3-18.9l9.2-6.4c13.9 15.7 33.4 24.9 56.4 24.9 22.3 0 39.5-10.5 50.3-24.3 7.8 17.9 24 24.7 45.6 24.7 17.5 0 33.4-2.6 44.2-5.5v2.2H601v-106c4.1-3 9.8-5.4 18.6-5.4 11.1 0 18.9 6.1 18.9 22.3v89.1h74.3V125.4s.4-28.6-11.1-44.9c-10.1-16.9-27.3-27.7-52.3-27.7zM431.6 164.9c-7.4 5.4-15.9 7.1-23 7.1-15.5 0-25.3-10.1-25.3-27 0-17.6 9.5-27.7 25.3-27.7 7.8 0 17.6 2.7 23 7.1v40.5z" id="path7" fill="#fff"/></g></svg>
            <div className="menu">
                <Link href='/' className='link' onClick={handleOnclick}><h2 className="bold-header" data-testid="home-menu" style={{color: pageActive == 'home' ? 'white':'#606060'}}>Home</h2></Link>
                <Link href='/tvshows' className='link'><h2 className="bold-header" style={{color: pageActive == 'tvshows' ? 'white':'#606060'}}>TV Shows</h2></Link>
                <h2 className="bold-header">Movies</h2>
            </div>
        </div>
    );
};
export default SiteNavigation;