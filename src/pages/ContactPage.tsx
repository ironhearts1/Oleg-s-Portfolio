import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ContactPage() {
    // const [s1txt, setBioBody] = useState("");
    let s1txt = "";
    let s1head = "";
    let s2txt = "";
    let s2head = "";
    const [CV, setCV] = useState(null);
    const [sectionOneFileDownload, setSectionOneFileDownload] = useState(null);
    const [sectionTwoFileDownload, setSectionTwoFileDownload] = useState(null);
    const sectionOneTxt = useRef(null);
    const sectionOneHeader = useRef(null);
    const sectionTwoTxt = useRef(null);
    const sectionTwoHeader = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        fetch("https://oleg-lovsky-default-rtdb.firebaseio.com/.json")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setIsLoading(true);
                for (let proj of Object.entries(data)) {
                    if (proj[0] === "BioData") {
                        console.log(proj);
                        //@ts-ignore
                        const { sectionOneText, sectionOneHeading, sectionTwoText, sectionTwoHeading, cv, sectionOneFile, sectionTwoFile } = proj[1];
                        // setBioBody((prev) => {
                        //     return bio;
                        // });
                        setCV(cv);
                        setSectionOneFileDownload(sectionOneFile);
                        setSectionTwoFileDownload(sectionTwoFile);
                        s1txt = sectionOneText;
                        s2txt = sectionTwoText;
                        s1head = sectionOneHeading;
                        s2head = sectionTwoHeading;
                        console.log(s1head, s2head);
                        //@ts-ignore
                        sectionOneTxt.current.innerHTML = s1txt;
                        //@ts-ignore
                        sectionTwoTxt.current.innerHTML = s2txt;
                        //@ts-ignore
                        sectionOneHeader.current.innerHTML = s1head;
                        //@ts-ignore
                        sectionTwoHeader.current.innerHTML = s2head;
                    } else {
                        continue;
                    }
                }
                setIsLoading(false);
            });
    }, []);

    const extraMarginBottom = {
        marginBottom: "5%",
    };
    console.log(sectionOneHeader);
    return (
        <>
            {isLoading ? (
                <h1>loading</h1>
            ) : sectionOneHeader && sectionTwoHeader ? (
                <div className="container text-left my-5 contact-wrapper">
                    <div className="bio-page-section">
                        <h1 style={extraMarginBottom} ref={sectionOneHeader}></h1>
                        {/*//@ts-ignore*/}
                        <a href={sectionOneFileDownload} target="_blank" download>
                            <FontAwesomeIcon icon={faFileArrowDown} />
                        </a>
                    </div>
                    <p className="mb-5 pb-5" ref={sectionOneTxt}></p>
                    <div className="bio-page-section">
                        <h1 style={extraMarginBottom} ref={sectionTwoHeader}></h1>
                        {/*//@ts-ignore*/}
                        <a href={sectionTwoFileDownload} target="_blank" download>
                            <FontAwesomeIcon icon={faFileArrowDown} />
                        </a>
                    </div>
                    <p className="mb-5 pb-5" ref={sectionTwoTxt}></p>
                    <div className="bio-page-section">
                        <h1 style={extraMarginBottom}>Resume</h1>
                        {/*//@ts-ignore*/}
                        <a href={CV} target="_blank" download>
                            <FontAwesomeIcon icon={faFileArrowDown} />
                        </a>
                    </div>
                </div>
            ) : sectionOneHeader ? (
                <div className="container text-left my-5 contact-wrapper">
                    <div className="bio-page-section">
                        <h1 style={extraMarginBottom} ref={sectionOneHeader}></h1>
                        {/*//@ts-ignore*/}
                        <a href={sectionOneFileDownload} target="_blank" download>
                            <FontAwesomeIcon icon={faFileArrowDown} />
                        </a>
                    </div>
                    <p className="mb-5 pb-5" ref={sectionOneTxt}></p>

                    <div className="bio-page-section">
                        <h1 style={extraMarginBottom}>Resume</h1>
                        {/*//@ts-ignore*/}
                        <a href={CV} target="_blank" download>
                            <FontAwesomeIcon icon={faFileArrowDown} />
                        </a>
                    </div>
                </div>
            ) : null}
        </>
    );
}
export default ContactPage;
