import './App.css';
import {Route, Routes} from "react-router-dom";
import ShowOne from "./board/ShowOne";
import ShowList from "./board/ShowList";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/board/showOne/:id" element={<ShowOne />} />
                <Route path="/board/showList/:pageNo" element={<ShowList />} />
            </Routes>
        </div>
    );
}

export default App;
