// Pruebas rápidas para SistemaSolar
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SistemaSolar from './SistemaSolar';

describe('SistemaSolar - Pruebas rápidas', () => {
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <SistemaSolar />
      </BrowserRouter>
    );
  };

  test('renderiza el título del módulo', () => {
    renderComponent();
    expect(screen.getByText(/Sistema Solar Interactivo/i)).toBeInTheDocument();
  });

  test('muestra el Sol en la UI', () => {
    renderComponent();
    expect(screen.getByText('☀️')).toBeInTheDocument();
  });

  test('existe botón con aria-label para ver información de Tierra', () => {
    renderComponent();
    const tierraBtn = screen.getByRole('button', { name: /Ver información de Tierra/i });
    expect(tierraBtn).toHaveAttribute('aria-label', 'Ver información de Tierra');
  });
});