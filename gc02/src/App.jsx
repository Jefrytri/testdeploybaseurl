import { Navigate, Route, Routes } from "react-router"
import AddStaffPage from "./views/AddStaffPage"
import BaseLayout from "./views/BaseLayout"
import CategoryListPage from "./views/CategoryListPage"
import CuisineFormPage from "./views/CuisineFormPage"
import CuisineListPage from "./views/CuisineListPage"
import CuisineUploadPage from "./views/CuisineUploadPage"
import DetailPage from "./views/DetailPage"
import HomePage from "./views/HomePage"
import LoginPage from "./views/LoginPage"

function App() {
  return (
    <Routes>
      <Route path="/cms/login" element={<LoginPage />} />

      <Route element={<BaseLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cuisines/:id" element={<DetailPage />} />
        <Route path="/cms" element={<Navigate to="/cms/cuisines" replace />} />
        <Route path="/cms/cuisines" element={<CuisineListPage />} />
        <Route path="/cms/cuisines/new" element={<CuisineFormPage mode="create" />} />
        <Route path="/cms/cuisines/:id/edit" element={<CuisineFormPage mode="edit" />} />
        <Route path="/cms/cuisines/:id/upload" element={<CuisineUploadPage />} />
        <Route path="/cms/categories" element={<CategoryListPage />} />
        <Route path="/cms/staff/new" element={<AddStaffPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
