import { render,act } from '@testing-library/react';
import React from 'react';
import Carouselv2 from "@/app/components/Carouselv2/carouselv2";
import {endPoint} from "@/app/utils/constants";
import {Provider} from "react-redux";
import configureMockStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import mockFetch from '../../utils/jest';
import thunk from 'redux-thunk';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}))
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Tv Shows Component', () => {
    it('should render correctly', async () => {
        const mockData = await mockFetch.get()
        class IntersectionObserverMock {
            observe = jest.fn();
            disconnect = jest.fn();
            constructor(callback: (entries: IntersectionObserverEntry[]) => void) {
                act(() => {
                    callback([
                        {
                            isIntersecting: true,
                            target: document.createElement('div'),
                            intersectionRect: {width: 100, height: 100},
                            boundingClientRect: {width: 200, height: 200, right: 300, left: 100},
                        } as unknown as IntersectionObserverEntry,
                    ]);
                });
            }
        }
        // @ts-ignore
        window.IntersectionObserver = IntersectionObserverMock;

        const store = mockStore({
            movies: {
                movies: mockData,
                moviesOnScreen: [],
                previousPageState: {
                    selectedIndex: 0,
                    pageNum: 1
                }
            },
        });
        const { container } = render(
            <Provider store={store}>
                <Carouselv2 endPoint={endPoint} maxNumberOfItem={6} />
            </Provider>,
        );
        expect(container.firstChild).toMatchSnapshot();
    });
})
