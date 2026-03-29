// import Header from './Header';
// import Footer from './Footer';

// export default function Layout({ children }) {
//   return (
//     // FIX 1: changed max-h-screen to min-h-screen so you can scroll
//     <div className="min-h-screen flex flex-col bg-gray-50">
      
//       <Header />
//       <main className="flex-1 w-full flex flex-col">
//         {children}
//       </main>
//       <Footer />
      
//     </div>
//   );
// }

import Header from './Header';
import Footer from './Footer';

export default function Layout( { categories =[], onCategorySelect, children }) {
  return (
    // FIX 1: changed max-h-screen to min-h-screen so you can scroll
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      <Header categories={categories} onCategorySelect={onCategorySelect} />
      <main className="flex-1 w-full flex flex-col">
        {children}
      </main>
      <Footer />
      
    </div>
  );
}