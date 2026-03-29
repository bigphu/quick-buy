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
import UserStoreSelector from '../components/common/UserStoreSelector';
import { getStoreId } from '../constants';

export default function Homepage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [storeId, setStoreId] = useState(getStoreId());
  const [loading, setLoading] = useState(false);

  // 1. Fetch Categories & All Products on Mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosClient.get('/products/categories');
        const responseData = response.data;
        console.log(responseData);

        const data = responseData.data;
        if (data && data.length > 0) {
          setCategories(data);
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
    // Load all products for this store by default
    fetchAllProducts();
  }, []);

  // Handle store change from selector
  const handleSelectorChange = () => {
    setStoreId(getStoreId());
  };

  // Fetch ALL products for current store
  const fetchAllProducts = async () => {
    setLoading(true);
    setActiveCategory('All Products');
    try {
      const currentStoreId = getStoreId();
      const response = await axiosClient.get(`/products/store/${currentStoreId}`);
      const responseData = response.data;
      setProducts(responseData.data || []);
    } catch (err) {
      console.error("Failed to fetch all products", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Top Rated Products by category
  const fetchTopRated = async (categoryName) => {
    setLoading(true);
    setActiveCategory(categoryName);
    try {
      const currentStoreId = getStoreId();
      const response = await axiosClient.get(`/products/top-rated/${categoryName}`, {
        params: { minRating: 0, storeId: currentStoreId }
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

  // Refetch when store changes
  useEffect(() => {
    fetchAllProducts();
  }, [storeId]);

  return (
    <>
      <UserStoreSelector onChangeCallback={handleSelectorChange} />
      <Layout categories={categories} onCategorySelect={fetchTopRated}>
        <HeroSection />
        <ContentSection
          products={products}
          currentCategory={activeCategory}
          isLoading={loading}
        />
      </Layout>
    </>
  );
}