import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as DOMPurify from "dompurify";

function ContactPage() {
    // const [s1txt, setBioBody] = useState("");

    // let s1head = "";
    const [s1head, setS1head] = useState("");
    const [s1text, setS1text] = useState("");
    const [s2head, setS2head] = useState("");
    const [s2text, setS2text] = useState("");
    const [cvtxt, setCvtxt] = useState("");

    const [CV, setCV] = useState(null);
    const [sectionOneFileDownload, setSectionOneFileDownload] = useState(null);
    const [sectionTwoFileDownload, setSectionTwoFileDownload] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
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
                        const { sectionOneText, sectionOneHeading, sectionTwoText, sectionTwoHeading, cv, sectionOneFile, sectionTwoFile, cvText } = proj[1];
                        // setBioBody((prev) => {
                        //     return bio;
                        // });
                        console.log(proj[1]);
                        setCV(cv);
                        setSectionOneFileDownload(sectionOneFile);
                        if (sectionTwoFile) {
                            setSectionTwoFileDownload(sectionTwoFile);
                        }
                        setS1head(sectionOneHeading);
                        setS1text(sectionOneText);
                        setS2head(sectionTwoHeading);
                        setS2text(sectionTwoText);
                        setCvtxt(cvText);

                        // //@ts-ignore
                        // sectionOneHeader.current.innerHTML = s1head;
                        // //@ts-ignore
                        // sectionOneTxt.current.innerHTML = s1txt;
                        // if (s2txt) {
                        //     //@ts-ignore
                        //     sectionTwoTxt.current.innerHTML = s2txt;
                        // }
                        // if (s2head) {
                        //     //@ts-ignore
                        //     sectionTwoHeader.current.innerHTML = s2head;
                        // }
                        // if (cvtxt) {
                        //     //@ts-ignore
                        //     CvTxt.current.innerHTML = cvtxt;
                        // }
                    } else {
                        continue;
                    }
                }
                setIsLoading(false);
                console.log(s1head, s2head);
            });
    }, []);

    const extraMarginBottom = {
        marginBottom: "5%",
    };

    return (
        <>
            {isLoading ? (
                <h1>loading</h1>
            ) : s1head && s2head ? (
                <div className="container text-left my-5 contact-wrapper">
                    <div className="bio-page-section">
                        <h1 style={extraMarginBottom} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(s1head) }}></h1>
                        {/*//@ts-ignore*/}
                        <a href={sectionOneFileDownload} target="_blank" download>
                            <FontAwesomeIcon icon={faFileArrowDown} />
                        </a>
                    </div>
                    <p className="mb-5 pb-5" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(s1text) }}></p>
                    <div className="bio-page-section">
                        <h1 style={extraMarginBottom} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(s2head) }}></h1>
                        {/*//@ts-ignore*/}
                        <a href={sectionTwoFileDownload} target="_blank" download>
                            <FontAwesomeIcon icon={faFileArrowDown} />
                        </a>
                    </div>
                    <p className="mb-5 pb-5" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(s2text) }}></p>
                    <div className="bio-page-section">
                        <h1 style={extraMarginBottom}>Resume</h1>
                        {/*//@ts-ignore*/}
                        <a href={CV} target="_blank" download>
                            <FontAwesomeIcon icon={faFileArrowDown} />
                        </a>
                    </div>
                    <p className="mb-5 pb-5" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(cvtxt) }}></p>
                </div>
            ) : s1head !== "" ? (
                <div className="container text-left my-5 contact-wrapper">
                    <div className="bio-page-section">
                        <h1 style={extraMarginBottom} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(s1head) }}></h1>
                        {/*//@ts-ignore*/}
                        <a href={sectionOneFileDownload} target="_blank" download>
                            <FontAwesomeIcon icon={faFileArrowDown} />
                        </a>
                    </div>
                    <p className="mb-5 pb-5" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(s1text) }}></p>

                    <div className="bio-page-section">
                        <h1 style={extraMarginBottom}>Resume</h1>
                        {/*//@ts-ignore*/}
                        <a href={CV} target="_blank" download>
                            <FontAwesomeIcon icon={faFileArrowDown} />
                        </a>
                    </div>
                    <p className="mb-5 pb-5" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(cvtxt) }}></p>
                </div>
            ) : null}
            <footer className="mt-5 pb-5 proj-page-footer">
                <span>Website made by Joshua Massanopoli. Contact at joshmass1998@gmail.com</span>
            </footer>
        </>
    );
}
export default ContactPage;
