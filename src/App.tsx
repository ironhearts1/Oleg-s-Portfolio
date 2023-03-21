import React, { useState, useEffect, useRef, useContext } from "react";
import { Route, Routes, Link, useParams } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ContactPage from "./pages/ContactPage";
import ProjectsPage from "./pages/ProjectsPage";
import SingleProjectPage from "./pages/SingleProjectPage";
import { NavContext } from "./context";

function App() {
    const navContext = useContext(NavContext);
    let url = /[^/]*$/.exec(window.location.href);
    useEffect(() => {
        url = /[^/]*$/.exec(window.location.href);

        //@ts-ignore
        if (url[0] === "") {
            //@ts-ignore
            setOnPage("projects");
        }
        //@ts-ignore
        if (url[0] != "home" && url[0] != "contact" && url[0] != "projects") {
            //@ts-ignore
            url[0] = "projects";
        }
    }, []);

    //@ts-ignore
    const [onPage, setOnPage] = useState(url[0]);
    function headerClickHandler() {
        console.log("clicked");
        //@ts-ignore
        setOnPage((prev) => {
            return "projects";
        });
        navContext.display();
    }
    console.log(onPage);
    if (url) {
        return (
            <div className="page-wrapper">
                <div className="container-fluid pt-2 mb-5">
                    <nav className="d-flex flex-column mt-2 ms-lg-4 ms-2 lh-1 oleg-nav-bar w-25">
                        <Link className="col-3 text-decoration-none head-link-text text-nowrap" to="/" onClick={headerClickHandler}>
                            OLEG KASTYUK
                        </Link>
                        <Link
                            className={navContext.navDisplay === true ? "col-3 text-decoration-none link-text" : "col-3 text-decoration-none link-text d-none"}
                            to="/"
                            onClick={() => setOnPage("projects")}
                        >
                            {onPage !== "contact" ? <span className="link-deactivate">Works</span> : <span>Works</span>}
                        </Link>
                        <Link
                            className={navContext.navDisplay === true ? "col-3 text-decoration-none link-text" : "col-3 text-decoration-none link-text d-none"}
                            to="/contact"
                            onClick={() => setOnPage("contact")}
                        >
                            {onPage === "home" || onPage === "projects" ? <span>Biography</span> : <span className="link-deactivate">Biography</span>}
                        </Link>
                    </nav>
                    <Routes>
                        <Route path="/" element={<ProjectsPage />}></Route>
                        {/* <Route path="/projects" element={<ProjectsPage />}></Route> */}
                        <Route path="/contact" element={<ContactPage />}></Route>
                        <Route path="/projects/:projName" element={<SingleProjectPage />}></Route>
                    </Routes>
                </div>
            </div>
        );
    } else {
        return <h1>LOADING</h1>;
    }
}

export default App;
