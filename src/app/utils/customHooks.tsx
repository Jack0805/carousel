'use client'
import {useState, useEffect, useRef} from 'react';

export function useViewportWidth() {
    const isBrowser = typeof window !== 'undefined';
    const [viewportWidth, setViewportWidth] = useState(isBrowser ? window.innerWidth : 0);

    useEffect(() => {

        if (!isBrowser) {
            return;
        }
        const handleResize = () => {
            setViewportWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isBrowser]);

    switch (true) {
        case viewportWidth > 1600:
            return 6;
        case viewportWidth > 1080:
            return 5;
        case viewportWidth > 720:
            return 4;
        default:
            return 3;
    }
}

interface UseAutoFocusState {
    index:number,
}
export function useAutoFocus({index}: UseAutoFocusState) {

    const myDivRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        if (myDivRef.current && index == 0) {
            myDivRef.current.focus();
        }
        const handleClickOutside = (event: MouseEvent) => {
            if (myDivRef.current && !myDivRef.current.contains(event.target as Node) && index == 0) {
                myDivRef.current.focus();
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };

    }, []);

    return {
        myDivRef
    }
}