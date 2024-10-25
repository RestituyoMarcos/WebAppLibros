import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BookList from './components/BookList'
import BookDetails from './components/BookDetails'
import BookForm from './components/BookForm'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/books/new" element={<BookForm />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/books/:id/edit" element={<BookForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
