// import Layout from '../components/homepage/Layout';
// import HeroSection from '../components/homepage/HeroSection';
// import ContentSection from '../components/homepage/ContentSection';

// export default function Homepage() {
//   return (
//     <Layout>


//       <HeroSection />
//       <ContentSection/>

//     </Layout>

//   );
// }


// import React, { useState, useEffect } from 'react';
// import Layout from '../components/homepage/Layout';
// import HeroSection from '../components/homepage/HeroSection';
// import ContentSection from '../components/homepage/ContentSection';

// export default function Homepage() {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [activeCategory, setActiveCategory] = useState('');
//   const [loading, setLoading] = useState(false);

//   // 1. Fetch Categories on Mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/products/categories');
//         const data = await response.json();

//         if (data.success) {
//           setCategories(data.data);

//           // Set initial category (e.g., first one or a default 'Electronics')
//           if (data.data.length > 0) {
//             fetchTopRated(data.data[0].CategoryName);
//           }
//         }
//       } catch (err) {
//         console.error("Failed to fetch categories", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // 2. Fetch Top Rated Products
//   const fetchTopRated = async (categoryName) => {
//     setLoading(true);
//     setActiveCategory(categoryName);
//     try {
//       // Calls API to get top rated items for the selected category
//       // Defaulting minRating to 0 to get all rated items, or modify as needed
//       const response = await fetch(`http://localhost:8080/api/products/top-rated/${categoryName}?minRating=0`); 
//       const data = await response.json();

//       if (data.success) {
//         setProducts(data.data || []);
//       }
//     } catch (err) {
//       console.error("Failed to fetch products", err);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Layout categories={categories} onCategorySelect={fetchTopRated}>
//       <HeroSection />
//       <ContentSection 
//         products={products} 
//         currentCategory={activeCategory} 
//         isLoading={loading}
//       />
//     </Layout>
//   );
// }

import React, { useState, useEffect } from 'react';
import Layout from '../components/homepage/Layout';
import HeroSection from '../components/homepage/HeroSection';
import ContentSection from '../components/homepage/ContentSection';
import axiosClient from '../services/axiosClient'; // Dùng axiosClient đã config port 8080

export default function Homepage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(false);

  // 1. Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Gọi API Backend (cổng 8080)

        const response = await axiosClient.get('/products/categories');
        const responseData = response.data; // axios trả về data trong .data
        console.log(responseData);

        const data = responseData.data;
        if (data && data.length > 0) {
          setCategories(data);
          // Mặc định load category đầu tiên
          fetchTopRated(data[0].CategoryName);
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  // 2. Fetch Top Rated Products
  const fetchTopRated = async (categoryName) => {
    setLoading(true);
    setActiveCategory(categoryName);
    try {
      // Gọi API Procedure Top Rated
      const response = await axiosClient.get(`/products/top-rated/${categoryName}`, {
        params: { minRating: 0 } // Tham số truy vấn
      });
      const responseData = response.data;

      setProducts(responseData.data || []);
    } catch (err) {
      console.error("Failed to fetch products", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout categories={categories} onCategorySelect={fetchTopRated}>
      <HeroSection />
      <ContentSection
        products={products}
        currentCategory={activeCategory}
        isLoading={loading}
      />
    </Layout>
  );
}