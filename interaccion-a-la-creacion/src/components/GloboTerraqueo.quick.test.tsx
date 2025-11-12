// Pruebas rápidas para GloboTerraqueo
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GloboTerraqueo from './GloboTerraqueo';

describe('GloboTerraqueo - Pruebas rápidas', () => {
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <GloboTerraqueo />
      </BrowserRouter>
    );
  };

  test('renderiza el título del módulo', () => {
    renderComponent();
    expect(screen.getByText(/Globo Terráqueo Interactivo/i)).toBeInTheDocument();
  });

  test('muestra botón para volver al inicio', () => {
    renderComponent();
    const backButton = screen.getByText(/Volver al Inicio/i);
    expect(backButton).toBeInTheDocument();
    expect(backButton.closest('a')).toHaveAttribute('href', '/');
  });

  test('lista al menos un país visible en la UI', () => {
    renderComponent();
    expect(screen.getByText(/Colombia/i)).toBeInTheDocument();
  });
});