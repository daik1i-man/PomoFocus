import React, { Suspense, lazy, useContext, useState } from "react"
import LoadingComponent from "./LoadingComponent/LoadingComponent";
import { Route, Routes } from "react-router-dom";
import { UserAuthContext } from "./context/UserAuthContext/UserAuthContext";

function App() {

  const { loading } = useContext(UserAuthContext);

  const PomoFocusPage = lazy(() => import("./pages/PomoFocusPage/PomoFocusPage"));
  const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));
  const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
  const ShortBreakPage = lazy(() => import("./pages/ShortBreakPage/ShortBreakPage"));
  const LongBreakPage = lazy(() => import("./pages/LongBreakPage/LongBreakPage"));
  const ErrorPage = lazy(() => import("./pages/ErrorPage/ErrorPage"));
  const Layout = lazy(() => import("./layout/layout"));

  if (loading) {
    return <LoadingComponent />
  }

  return (
    <Suspense fallback={<LoadingComponent />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PomoFocusPage />} />
          <Route path="/short-break" element={<ShortBreakPage />} />
          <Route path="/long-break" element={<LongBreakPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  )
}

export default App
