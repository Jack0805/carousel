import { render } from '@testing-library/react';
import React from 'react';
import SiteNavigation from "@/app/components/SiteNavigation/index";
import '@testing-library/jest-dom';
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import {Provider} from "react-redux";

// jest.mock('@/app/state/hooks', () => ({
//     useAppDispatch: jest.fn()
// }))
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('Error Component', () => {

    it('render the component', () => {
        const store = mockStore({
            movies: {}
        });
        const { container } = render(
            <Provider store={store}>
                <SiteNavigation pageActive='home'/>
            </Provider>,
        );
        expect(container.firstChild).toMatchSnapshot();
    });
    it('checks the color style active home menu',  () => {
        const store = mockStore({
            movies: {}
        });
        const { getByTestId } = render(
            <Provider store={store}>
                <SiteNavigation pageActive='home'/>
            </Provider>,
        );

        const element = getByTestId('home-menu');

        const styles = window.getComputedStyle(element);
        const color = styles.color;
        expect(color).toBe('white');
    });
})