// Pruebas rápidas para Simetría
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Simetria from './Simetria';

describe('Simetría - Pruebas rápidas', () => {
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <Simetria />
      </BrowserRouter>
    );
  };

  test('renderiza el título del módulo', () => {
    renderComponent();
    expect(screen.getByText(/Descubre la Simetría/i)).toBeInTheDocument();
  });

  test('muestra el selector de figura', () => {
    renderComponent();
    expect(screen.getByText(/Elige tu figura/i)).toBeInTheDocument();
  });

  test('inicia mostrando el encabezado de Ejemplo mágico', () => {
    renderComponent();
    expect(screen.getByText(/Ejemplo mágico/i)).toBeInTheDocument();
  });
});