import './App.css';
import {Route, Routes} from "react-router-dom";
import ShowOne from "./board/ShowOne";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/board/showOne/:id" element={<ShowOne/>}/>
            </Routes>
        </div>
    );
}

export default App;
