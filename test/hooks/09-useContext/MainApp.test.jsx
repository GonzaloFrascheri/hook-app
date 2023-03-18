import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MainApp } from "../../../src/09-useContext/MainApp";


describe('Pruebas en el componente', () => { 


    test('debe de mostrar el HomePage', () => { 
        
        render(
            <MemoryRouter>
                <MainApp/>
            </MemoryRouter>
            
        );
        
        // screen.debug();
        expect(screen.getByText('HomePage')).toBeTruthy();
     });

     test('debe de mostrar el LoginPage', () => { 
        
        render(
            <MemoryRouter initialEntries={['/login']}>
                <MainApp/>
            </MemoryRouter>
            
        );
        
        expect(screen.getByText('LoginPage')).toBeTruthy();
     });

     test('debe de mostrar el AboutPage', () => { 
        
        render(
            <MemoryRouter initialEntries={['/about']}>
                <MainApp/>
            </MemoryRouter>
            
        );
        
        expect(screen.getByText('AboutPage')).toBeTruthy();
     });

 })