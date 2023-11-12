import React from 'react';
import withBorder from '../../utils/withborder'
import Link from "next/link";
import {useAutoFocus} from '../../utils/customHooks';
import {movieProps} from '../Carousel/movie'

const Moviev2 = (props: movieProps) => {
    const {id, image} = props.movie
    const {myDivRef} = useAutoFocus({index:props.index || 0})
    return (
                <div className="carouselv2-item" data-key={props.index} data-src={image} onKeyDown={(e) => props.handleKeyPress(e)} tabIndex={0} ref={myDivRef} style={{ outline: 'none' }}>
                    <Link href={{ pathname: '/program', query: { mid:id, from:'tvshows' }}}><img className="c-img" /></Link>
                </div>
    );
};

export default withBorder(Moviev2);