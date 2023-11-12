import { render } from '@testing-library/react';
import React from 'react';
import Carousel from "@/app/components/Carousel/carousel";
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

describe('Movies Component', () => {


    it('should render correctly', async () => {
        const mockData = await mockFetch.get()

        const store = mockStore({
            movies: {
                movies: mockData,
                moviesOnScreen: mockData.slice(1,6),
                previousPageState: {
                    selectedIndex: 0,
                    pageNum: 1
                }
            },
        });
        const { container } = render(
            <Provider store={store}>
                <Carousel endPoint={endPoint} maxNumberOfItem={6} />
            </Provider>,
        );
        expect(container.firstChild).toMatchSnapshot();
    });
})
