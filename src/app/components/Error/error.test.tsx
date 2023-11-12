import { render } from '@testing-library/react';
import React from 'react';
import Error from './error'
import '@testing-library/jest-dom';
describe('Error Component', () => {

    it('should render correctly', async () => {
        const { container, getByText } = render(
                <Error errorMessage={'Something is wrong !!'}/>
        );

        const textElement = getByText('Something is wrong !!');

        expect(textElement).toBeInTheDocument();

        expect(container.firstChild).toMatchSnapshot();
    });
})
