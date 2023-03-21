import React, { useContext, useState } from "react";
import ProjectPic from "../components/ProjectPic";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { forEachChild } from "typescript";
import { Prev } from "react-bootstrap/esm/PageItem";
import { NavContext } from "../context";

function ProjectsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [projects, setProjects] = useState<any | null>(null);
    const [projNames, setProjNames] = useState([]);
    const location = useLocation();
    const navContext = useContext(NavContext);
    useEffect(() => {
        fetch("https://oleg-lovsky-default-rtdb.firebaseio.com/.json")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setProjNames([]);
                let newData: any[] = [];
                for (let proj of Object.entries(data)) {
                    if (proj[1] == null || proj[0] === "BioData") {
                        continue;
                    } else {
                        newData.push(proj);
                        let newprojNames = projNames;
                        //@ts-ignore
                        let _proj = String(proj[1].name);
                        //@ts-ignore
                        newprojNames.push(_proj);
                        setProjNames(newprojNames.reverse());
                    }
                }
                // data.forEach((elm: any, index: number) => {
                // if (data[index] == null) {
                //     return;
                // } else {
                //     newData.push(elm);
                // }
                // });
                setProjects((prevData: null | any) => {
                    return newData.reverse();
                });
                setIsLoading(false);
            });
    }, []);
    // console.log(projects);

    // console.log(projNames);
    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    function handleProjectClick() {
        console.log("clicked");
        navContext.displayNone();
    }

    return (
        <div className="container">
            <div className="row justify-content-lg-evenly justify-content-md-evenly justify-content-center">
                {/* {projects.map((proj: any, index: number) => {
                    let projectsIndex = projects.indexOf(proj);
                    let relationalData = [projects, projectsIndex];
                    return (
                        <div key={index} className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-7 py-3 ps-0" onClick={handleProjectClick}>
                            <ProjectPic data={proj} relationalData={relationalData} className="me-0" />
                        </div>
                    );
                })} */}
                {projects.map((proj: any, index: number) => {
                    let projectsIndex = projects.indexOf(proj);
                    let relationalData = [projects, projectsIndex];
                    return (
                        <div key={index} className="picture-wrapper py-lg-3 py-sm-2 py-1">
                            <ProjectPic data={proj} relationalData={relationalData} className="me-0" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ProjectsPage;
