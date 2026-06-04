import './globals.css';
import ClientLayout from '../components/ClientLayout';

export const metadata = {
  title: 'Enfermera a domicilio en Zaragoza',
  description: 'Atención sanitaria profesional, personalizada y de calidad en la comodidad de tu hogar.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
