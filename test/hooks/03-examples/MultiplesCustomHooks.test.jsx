import { fireEvent, render, screen } from "@testing-library/react"
import { MultiplesCustomHooks } from "../../../src/03-examples/MultiplesCustomHooks"
import { useCounter } from "../../../src/hooks";
import { useFetch } from "../../../src/hooks/useFetch";


jest.mock('../../../src/hooks/useFetch');
jest.mock('../../../src/hooks/useCounter');

describe('Pruebas en MultiplesCustomHooks', () => { 
    
    const mockIncrement = jest.fn();

    useCounter.mockReturnValue({
        counter: 1,
        increment: mockIncrement
    });

    beforeEach( () => {
        jest.clearAllMocks();
    })


    test('debe de mostrar el componente por defecto', () => { 
        
        useFetch.mockReturnValue({
            data: null,
            isLoading: true,
            hasError: null
        });

        render(<MultiplesCustomHooks/>);
        
        expect(screen.getByText('Loading...'))
        expect(screen.getByText('Breakingbad Quotes'))

        const nextButton = screen.getByRole('button', { name: 'Next quote'})
        expect(nextButton.disabled).toBeTruthy();//evalua el estado inicial del componente
        
       
     });

    test('debe de mostrar un Quote', () => { 
        
        useFetch.mockReturnValue({
            data: [{ author: 'Gonzalo', quote: 'Hola Mundo' }],
            isLoading: false,
            hasError: null
        });     

        render(<MultiplesCustomHooks/>);
        expect(screen.getByText('Hola Mundo')).toBeTruthy();
        expect(screen.getByText('Gonzalo')).toBeTruthy();

        const nextButton = screen.getByRole('button', { name: 'Next quote'})
        expect(nextButton.disabled).toBeFalsy();

    });

    
     test('debe de llamar la función de incrementar', () => { 
        
        
        useFetch.mockReturnValue({
            data: [{ author: 'Gonzalo', quote: 'Hola Mundo' }],
            isLoading: false,
            hasError: null
        }); 

        render( <MultiplesCustomHooks /> );
        const nextButton = screen.getByRole('button', { name: 'Next quote'})
        fireEvent.click(nextButton);

        expect(mockIncrement).toHaveBeenCalled();

      })


 })