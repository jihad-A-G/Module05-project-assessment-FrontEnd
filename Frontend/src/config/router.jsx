import { createBrowserRouter, redirect } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import CustomerSupportPage from "../Pages/CustomerSupportPage/CustomerSupportPage";
import ShippingPolicyPage from "../Pages/ShippingPolicyPage/ShippingPolicyPage";
import PriceMatchingPolicyPage from "../Pages/PriceMatchingPolicyPage/PriceMatchingPolicyPage";
import RegisterLogin from "../Pages/RegisterPage/RegisterPage";
import ContactUs from "../Pages/ContactUs/ContactUs";
import AboutUsPageMain from "../Pages/AboutUsPage/AboutUs.jsx";
import CategoryPage from "../Pages/CategoriesPage/Categories.jsx";
import AdminLayout from "../adminDashboard/dashboardLayout";
import axios from "axios";
import App from "../App";
import AddProduct from "../adminDashboard/products/addProduct";
import EditProduct from "../adminDashboard/products/editProduct";
import ProductsPage from "../adminDashboard/products/productsPage.jsx";
import AboutusPage from "../adminDashboard/aboutUsPage";
import NotFound from "../Pages/NotFoundPage/NotFound";
import OrdersTable from "../adminDashboard/orders/ordersTable";
import Cookies from "js-cookie";
import CheckOutPage from "../Pages/CheckOutPage/CheckOut.jsx";
import AnyCategoryPage from "../Components/ProductPageComponent/ProductPageComponent.jsx";
import AdminLogin from "../Pages/AdminLogIn/AdminLogin.jsx";
import {ProtectedRoute, SuperAdminProtectedRoute} from "../utils/ProtectedRoute.jsx"
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  //Application main layout
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: async () => {
          const response = await axios.get(
            "http://localhost:5000/api/products/"
          );
          return response.data;
        },
      },
      {
        path: "customer-support",
        element: <CustomerSupportPage />,
      },
      {
        path: "shipping-policy",
        element: <ShippingPolicyPage />,
      },
      {
        path: "price-matching-policy",
        element: <PriceMatchingPolicyPage />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/CheckOut",
        element: <CheckOutPage />,
        loader: async () => {
          const response = await axios.get(
            "http://localhost:5000/api/products/"
          );
          return response.data;
        },
      },
      {
        path: "/adminlogin",
        element: <AdminLogin />,
      },
      {
        path: "/AboutUsMain",
        element: <AboutUsPageMain />,
        loader: async () => {
          const response = await axios.get(
            "http://localhost:5000/api/aboutus/content"
          );
          console.log(response.data.aboutusContent);
          return response.data.aboutusContent;
        },
      },
      {
        path: "categories/:categoryIdName",
        element: <AnyCategoryPage />,
      },
    ],
  },
  //End of application main layout
  //Admin dashboard layout
  {
    path: "/admin-dashboard",
    element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
    children: [
      {
        path: "products",
        element: <ProtectedRoute><ProductsPage /></ProtectedRoute>,
        loader: async () => {
          const response = await axios.get(
            "http://localhost:5000/api/products/"
          );
          return response.data;
        },
        action:async({request}) =>{
          const formData = await request.formData()
          const data = Object.fromEntries(formData)
          const response = await axios.delete(`http://localhost:5000/api/products/${data.id}`)
          return redirect('/admin-dashboard/products')
        }
      },
      {
        path:'products/add-product',
        element:<AddProduct/>,
        loader: async() =>{
          const categoriesData = await axios.get('http://localhost:5000/api/categories')
          const categories = categoriesData.data

          const brandsData = await axios.get('http://localhost:5000/api/brands')
          const brands = brandsData.data

          const detailsData = await axios.get('http://localhost:5000/api/productDetails')
          const details = detailsData.data

          return {categories, details, brands}
        },
        action: async({request}) =>{
          const formData = await request.formData()
          const data = Object.fromEntries(formData)
          const response = await axios.post('http://localhost:5000/api/products',{...data})

          return redirect('/admin-dashboard/products')
          // return null

        }

      },
      {
        path:'products/edit-product/:id',
        element:<EditProduct/>,
        loader: async({params}) =>{
          const response = await axios.get(`http://localhost:5000/api/products/${params.id}`)
          const data = response.data

          return {data}

        },
        action : async ({params,request}) =>{
          const formData = await request.formData()
          const data = Object.fromEntries(formData)

          // console.log(data);
          const parsedData = JSON.parse(data.formData)
          const dataToSubmit = {productName:data.productName,description:data.description,brand:data.brand,categories:parsedData.categories,details:parsedData.details}
          // console.log(dataToSubmit);


          const response = await axios.patch(`http://localhost:5000/api/products/${params.id}`,{...dataToSubmit})

          return redirect('/admin-dashboard/products')
        }

      },

      
      {
        path: "aboutus",
        element: <SuperAdminProtectedRoute><AboutusPage /></SuperAdminProtectedRoute>,
        loader: async () => {
          const response = await axios.get(
            "http://localhost:5000/api/aboutus/",{
              withCredentials:true
            }
          );
          console.log(response.data);
          return response.data.aboutus;
        },
        action: async ({ request }) => {
          const formData = await request.formData();
          const data = Object.fromEntries(formData);

          const response = await axios.put(
            "http://localhost:5000/api/aboutus/",
            { ...data },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          return redirect("/admin-dashboard/aboutus");
        },
      },
      {
        path: "orders",
        element: <SuperAdminProtectedRoute><OrdersTable /></SuperAdminProtectedRoute>,
        loader: async () => {
          const response = await axios.get(
            "http://localhost:5000/api/orders/",
            {
              headers: {
                // cookies:{
                //   token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTkzYWQyYTYyYTZmMWZlOGU0N2VhOCIsIm5hbWUiOiJhaG1hZCIsInJvbGVzIjoiNjVhNjg3Yjg4ZDU3MzRiMTEyNTNlYTYwIiwiaWF0IjoxNzA2MjU4NzYyLCJleHAiOjE3MDYzNDUxNjJ9.aVg0IYCvX45eK_b3mZ3JbqGO8V3izH_uXuFXbViRhJg'
                // },
              },
            }
          );
          return response.data;
        },
      },
    ],
  },
  //End admin layout
  {
    path: "/register",
    element: <RegisterLogin />,
    action: async ({ request }) => {
      const formData = await request.formData();
      const data = Object.fromEntries(formData);

      const response = await axios.post("http://localhost:5000/api/users/", {
        ...data,
      });
      return response;
    },
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;




