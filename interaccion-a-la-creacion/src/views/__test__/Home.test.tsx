// src/views/__tests__/Home.test.tsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';

describe('Home Component', () => {
  const renderHome = () => {
    return render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  };

  test('debe renderizar el título principal correctamente', () => {
    renderHome();
    expect(screen.getByText(/Interacción a la Creación/i)).toBeInTheDocument();
  });

  test('debe mostrar el nombre del colegio', () => {
    renderHome();
    expect(screen.getByText(/Colegio Mentes Creativas/i)).toBeInTheDocument();
  });

  test('debe mostrar los tres módulos educativos', () => {
    renderHome();
    expect(screen.getByText('Sistema Solar')).toBeInTheDocument();
    expect(screen.getByText('Globo Terráqueo')).toBeInTheDocument();
    expect(screen.getByText('Simetría')).toBeInTheDocument();
  });

  test('debe mostrar las áreas temáticas correctas', () => {
    renderHome();
    expect(screen.getByText('Ciencias Naturales')).toBeInTheDocument();
    expect(screen.getByText('Ciencias Sociales')).toBeInTheDocument();
    expect(screen.getByText('Matemáticas')).toBeInTheDocument();
  });

  test('debe tener enlaces navegables a cada módulo', () => {
    renderHome();
    const sistemaSolarLink = screen.getByRole('link', { name: /Sistema Solar/i });
    const globoLink = screen.getByRole('link', { name: /Globo Terráqueo/i });
    const simetriaLink = screen.getByRole('link', { name: /Simetría/i });

    expect(sistemaSolarLink).toHaveAttribute('href', '/sistema-solar');
    expect(globoLink).toHaveAttribute('href', '/globo-terraqueo');
    expect(simetriaLink).toHaveAttribute('href', '/simetria');
  });

  test('debe mostrar las descripciones de cada módulo', () => {
    renderHome();
    expect(screen.getByText(/Explora los planetas que giran alrededor del Sol/i)).toBeInTheDocument();
    expect(screen.getByText(/Descubre países y continentes del mundo/i)).toBeInTheDocument();
    expect(screen.getByText(/Aprende sobre figuras simétricas jugando/i)).toBeInTheDocument();
  });

  test('debe tener botones de exploración en cada tarjeta', () => {
    renderHome();
    const exploreButtons = screen.getAllByText(/¡Explorar!/i);
    expect(exploreButtons).toHaveLength(3);
  });

  test('debe mostrar el mensaje motivacional', () => {
    renderHome();
    expect(screen.getByText(/Aprende explorando, observando y creando /i)).toBeInTheDocument();
  });
});