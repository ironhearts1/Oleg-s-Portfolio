import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <div className="landing-title-flex">
            <h1 className="title pb-3">Oleg Kastyuk</h1>
            <h6 className="subtitle pb-5">Richmond, VA based artist</h6>
            {/* 
            <button className="btn btn-secondary enter-btn-size">
                <Link className="text-decoration-none enter-btn" to="/projects">
                    Enter!
                </Link>
            </button> */}
        </div>
    );
}

export default LandingPage;
