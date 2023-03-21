import React, { useContext } from "react";
import styled from "@emotion/styled/macro";
import testpic from "../assets/mount2.jpg";
import { Link } from "react-router-dom";
import { NavContext } from "../context";

function ProjectPic(props: any) {
    let picsArray = [];
    const navContext = useContext(NavContext);
    for (let value of Object.values(props.data[1].pics || {})) {
        if (value === null) {
            continue;
        } else {
            picsArray.push(value);
        }
    }
    let picURL = picsArray[0];
    function handleProjectClick() {
        console.log("clicked");
        navContext.displayNone();
    }
    return (
        <div>
            <Link to={`/projects/${props.data[1].name}`} state={{ project: props.data[1], relationalData: props.relationalData }}>
                <div className="d-flex justify-content-center align-items-center">
                    <img src={`${picURL}`} className="picture-size" onClick={handleProjectClick} />
                </div>
            </Link>
        </div>
    );
}

export default ProjectPic;
