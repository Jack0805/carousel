import React, {KeyboardEvent} from 'react';
import {MovieState, setCurrentMovieData} from '../../state/movies/movieSlice'
import withBorder from '../../utils/withborder'
import Link from "next/link";
import {useAutoFocus} from '../../utils/customHooks'
import {OnClickProps} from './carousel'

export interface movieProps {
    movie: MovieState,
    selected: boolean,
    selectedIndex: number,
    handleClick: (props: OnClickProps) => void | null;
    handleKeyPress: (event: KeyboardEvent<HTMLDivElement>) => void;
    index: number | null,
    currentPage: number | null
}
const Movie = (props: movieProps) => {
    const {id, image} = props.movie
    const {myDivRef} = useAutoFocus({index:props.index || 0})
    return (
            <div onClick={() => props.handleClick({movie: props.movie, selectedIndex:props.selectedIndex})} onKeyDown={(e) => props.handleKeyPress(e)} tabIndex={0} ref={myDivRef} style={{ outline: 'none' }}>
                <Link href={{ pathname: '/program', query: { mid:id, selectedIndex: props.selectedIndex, page: props.currentPage, from: 'home' }}}><img className="item-image" src={image}></img></Link>
            </div>
    );
};
export default withBorder(Movie);