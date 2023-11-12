import React, {ComponentType, useRef, useEffect} from 'react';
import {movieProps} from "@/app/components/Carousel/movie";

const withBorder = <P extends movieProps>(Component: ComponentType<P>) => {
    return (props: P)  => (
        <div
            className={props.selected ? 'image-container-with-border':'image-container-without-border'}
        >
            <Component {...props}/>
        </div>
    );
};

export default withBorder;