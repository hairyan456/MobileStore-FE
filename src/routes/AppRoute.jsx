import { Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import styled from 'styled-components';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const PrivateRoute = lazy(() => import('../routes/PrivateRoute'));
const SignInPage = lazy(() => import('../pages/Login/SignInPage'));
const SignUpPage = lazy(() => import('../pages/Register/SignUpPage'));
const CartPage = lazy(() => import('../pages/Cart/CartPage'));
const OrderPage = lazy(() => import('../pages/Order/OrderPage'));
const MyOrderPage = lazy(() => import('../pages/Order/MyOrderPage'));
const OrderRecentPage = lazy(() => import('../pages/Order/OrderRecentPage'));
const OrderDetailPage = lazy(() => import('../pages/Order/OrderDetailPage'));
const PaymentPage = lazy(() => import('../pages/Payment/PaymentPage'));
const ProductPage = lazy(() => import('../pages/Product/ProductPage'));
const TypeProductPage = lazy(() => import('../pages/Product/TypeProductPage'));
const ProfilePage = lazy(() => import('../pages/Profile/ProfilePage'));
const ProductDetailPage = lazy(() => import('../pages/Product/ProductDetailPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const DefaultLayout = lazy(() => import('../layout/DefaultLayout'));
const LayoutAdmin = lazy(() => import('../layout/LayoutAdmin'));
const DashboardPage = lazy(() => import('../pages/Admin/DashboardPage'));
const LayoutManageUser = lazy(() => import('../layout/LayoutManageUser'));
const ManageUserPage = lazy(() => import('../pages/Admin/User/ManageUserPage'));
const LayoutManageProduct = lazy(() => import('../layout/LayoutManageProduct'));
const LayoutManageOrder = lazy(() => import('../layout/LayoutManageOrder'));
const ManageProductPage = lazy(() => import('../pages/Admin/Product/ManageProductPage'));
const ManageOrderPage = lazy(() => import('../pages/Admin/Order/ManageOrderPage'));


const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // Đảm bảo toàn màn hình
  background-color: #f5f5f5; // Màu nền

  .spinner {
    width: 50px; // Kích thước vòng tròn
    height: 50px;
    border: 5px solid rgba(0, 0, 0, 0.1); // Viền mờ
    border-top: 5px solid #3498db; // Viền nổi bật
    border-radius: 50%; // Biến thành hình tròn
    animation: spin 1s linear infinite; // Hiệu ứng quay
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const AppRoute = () => {
  return (
    <Suspense fallback={<LoadingContainer><div className='spinner' /></LoadingContainer>}>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="carts" element={<PrivateRoute> <CartPage /></PrivateRoute>} />
          <Route path="payment" element={<PrivateRoute> <PaymentPage /></PrivateRoute>} />
          <Route path="order" element={<OrderPage />} >
            <Route path="recent" element={<PrivateRoute> <OrderRecentPage /></PrivateRoute>} />
            <Route path="history/:userId" element={<PrivateRoute> <MyOrderPage /></PrivateRoute>} />
            <Route path="detail/:orderId" element={<PrivateRoute> <OrderDetailPage /></PrivateRoute>} />
          </Route>
          <Route path="products" element={<ProductPage />} >
            <Route path="detail/:productId" element={<ProductDetailPage />} />
            <Route path="type/:productType" element={<TypeProductPage />} />
          </Route>
          <Route path="/user-profile" element={<PrivateRoute> <ProfilePage /></PrivateRoute>} />
        </Route>

        <Route path="/system/admin" element={<PrivateRoute> <LayoutAdmin /></PrivateRoute>} >
          <Route index element={<DashboardPage />} />
          <Route path="users" element={<LayoutManageUser />} >
            <Route index element={<ManageUserPage />} />
          </Route>
          <Route path="products" element={<LayoutManageProduct />} >
            <Route index element={<ManageProductPage />} />
          </Route>
          <Route path="orders" element={<LayoutManageOrder />} >
            <Route index element={<ManageOrderPage />} />
          </Route>
        </Route>

        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoute;
