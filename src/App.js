import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Headers from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timeline from "./components/Timeline";
import { Provider } from "react-redux";
import configStore from "./redux/configStore";
import { MyBlogs } from "./components/MyBlogs";


function App() {
  const store = configStore();
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Timeline />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/blogs" element={<MyBlogs />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
