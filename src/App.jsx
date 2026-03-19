import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/Home.jsx'
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import NoticeList from "./pages/NoticeList.jsx";
import NoticeDetail from "./pages/NoticeDetail.jsx";
import NoticeWrite from "./pages/NoticeWrite.jsx";
import NoticeEdit from "./pages/NoticeEdit.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/notice/list" element={<NoticeList />} />
        <Route path="/notice/detail/:id" element={ <NoticeDetail />}/>
        <Route path="/notice/write" element={ <NoticeWrite />}/>
        <Route path="/notice/edit/:id" element= { <NoticeEdit />} />
      </Routes>
    </Router>
  )
}

export default App
