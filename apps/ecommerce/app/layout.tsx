import './global.css';
import Navbar from '../../../libs/ui-components/src/lib/navigation';
import Footer from '../../../libs/ui-components/src/lib/footer';
// import { AuthContextProvider } from './(auth)/components/context';

import { CartContextProvider } from './cart/components/cartContext';

export const metadata = {
  title: 'Welcome to ecommerce',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Wrap with context providers */}
       
          <CartContextProvider>
            <div className="flex flex-col min-h-screen">
              <header>
                {' '}
                <Navbar />
              </header>
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          
            </CartContextProvider>
      </body>
    </html>
  );
}
