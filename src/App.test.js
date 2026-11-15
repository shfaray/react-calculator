import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('calculator', () => {
    test('enters digits and deletes the last digit', () => {
        const { container } = render(<App />);

        fireEvent.click(screen.getByRole('button', { name: '1' }));
        fireEvent.click(screen.getByRole('button', { name: '2' }));
        expect(container.querySelector('p')).toHaveTextContent('12');

        fireEvent.click(screen.getByRole('button', { name: 'Del' }));
        expect(container.querySelector('p')).toHaveTextContent('1');
    });

    test.each([
        ['+', '5', '3', '8'],
        ['-', '5', '3', '2'],
        ['*', '5', '3', '15'],
        ['/', '6', '3', '2'],
    ])('calculates %s', (operator, left, right, result) => {
        const { container } = render(<App />);

        fireEvent.click(screen.getByRole('button', { name: left }));
        fireEvent.click(screen.getByRole('button', { name: operator }));
        fireEvent.click(screen.getByRole('button', { name: right }));
        fireEvent.click(screen.getByRole('button', { name: '=' }));

        expect(container.querySelector('p')).toHaveTextContent(result);
    });

    test('evaluates chained operations in sequence', () => {
        const { container } = render(<App />);

        fireEvent.click(screen.getByRole('button', { name: '2' }));
        fireEvent.click(screen.getByRole('button', { name: '+' }));
        fireEvent.click(screen.getByRole('button', { name: '3' }));
        fireEvent.click(screen.getByRole('button', { name: '*' }));
        fireEvent.click(screen.getByRole('button', { name: '4' }));
        fireEvent.click(screen.getByRole('button', { name: '=' }));

        expect(container.querySelector('p')).toHaveTextContent('20');
    });

    test('clear resets the display and any pending operation', () => {
        const { container } = render(<App />);

        fireEvent.click(screen.getByRole('button', { name: '7' }));
        fireEvent.click(screen.getByRole('button', { name: '+' }));
        fireEvent.click(screen.getByRole('button', { name: 'C' }));

        expect(container.querySelector('p')).toBeEmptyDOMElement();

        fireEvent.click(screen.getByRole('button', { name: '2' }));
        fireEvent.click(screen.getByRole('button', { name: '=' }));
        expect(container.querySelector('p')).toHaveTextContent('2');
    });
});
