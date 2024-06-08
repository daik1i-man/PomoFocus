import React, { Suspense, lazy, useContext, useState } from "react"
import LoadingComponent from "./LoadingComponent/LoadingComponent";
import { Route, Routes } from "react-router-dom";
import { UserAuthContext } from "./context/UserAuthContext/UserAuthContext";

function App() {

  const { loading } = useContext(UserAuthContext);

  const PomoFocusPage = lazy(() => import("./pages/PomoFocusPage/PomoFocusPage"));
  const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));
  const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
  const ErrorPage = lazy(() => import("./pages/ErrorPage/ErrorPage"));

  if (loading) {
    return <LoadingComponent />
  }

  return (
    <Suspense fallback={<LoadingComponent />}>
      <Routes>
        <Route path="/" element={<PomoFocusPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  )
}

export default App
