import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Carousel } from "react-bootstrap";
import { url } from "inspector";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SingleProjectPage() {
    const location = useLocation();
    const { project, relationalData } = location.state;

    let picsArray: Array<string> = [];

    for (let value of Object.values(project.pics || {})) {
        if (value === null) {
            continue;
        } else if (typeof value === "string") {
            picsArray.push(value);
        }
    }
    picsArray.shift();
    const projectArray: any[] = [];
    for (let key in project) {
        if (key == "pics" || key == "name" || key == "year") {
            continue;
        }

        projectArray.push(project[key]);
    }

    let currentProjectIndex = relationalData[1];
    let otherProjects = relationalData[0];
    //@ts-ignore
    let prevNextIndex = () => {
        const length = otherProjects.length - 1;
        if (currentProjectIndex == length) {
            const final = [currentProjectIndex - 1, 0];
            return final;
        } else if (currentProjectIndex == 0) {
            const final = [length, 1];
            return final;
        } else {
            const final = [currentProjectIndex - 1, currentProjectIndex + 1];
            return final;
        }
    };

    const [activePictureIndex, setActivePictureIndex] = useState(0);
    let prevRelationalData = [otherProjects, prevNextIndex()[0]];
    let nextRelationalData = [otherProjects, prevNextIndex()[1]];
    useEffect(() => {
        setActivePictureIndex(0);
    }, [project]);

    function handlePictureClick() {
        console.log("clicked!");
        setActivePictureIndex((prev) => {
            if (prev !== picsArray.length - 1) {
                return prev + 1;
            } else {
                return 0;
            }
        });
    }
    return (
        <div className="single-proj">
            <div className="proj-heading ms-lg-4 ms-2">
                <h1 className="mb-0 mt-1 font-size">{project.name}</h1>
                <h2 className="mb-1 font-size">{project.year}</h2>
            </div>
            <div className="proj-wrapper row mb-2 pb-2">
                <div className="col-lg-12 col-md-12 ms-lg-4 ms-2">
                    <Carousel controls={false} activeIndex={activePictureIndex} indicators={false} fade={true} onClick={handlePictureClick}>
                        {picsArray.map((pic: string, index: number) => {
                            console.log(pic, picsArray);
                            let picURLString = `url(${pic})`;
                            return (
                                <Carousel.Item key={index}>
                                    {pic.includes(".mp4") ? (
                                        <video className="d-block carousel-image" muted={false} autoPlay={true} controls loop>
                                            <source src={`${pic}`} type="video/mp4"></source>
                                        </video>
                                    ) : (
                                        <img className="d-block carousel-image" src={`${pic}`} />
                                    )}
                                </Carousel.Item>
                            );
                        })}
                    </Carousel>
                    <div className="button-flex">
                        <div className="button-groupings">
                            <Link
                                to={`/projects/${relationalData[0][prevNextIndex()[0]][1].name}`}
                                state={{ project: relationalData[0][prevNextIndex()[1]][1], relationalData: nextRelationalData }}
                                className="next-btn"
                            >
                                Next Work
                                <FontAwesomeIcon className="ps-3" icon={faChevronRight} />
                            </Link>
                        </div>
                        <div>
                            <ul className="list-unstyled d-flex mb-0">
                                {picsArray.map((picture: string, picturesIndex: number) => {
                                    return (
                                        <li key={picturesIndex} className="mx-2 picture-item" onClick={() => setActivePictureIndex(picturesIndex)}>
                                            {activePictureIndex == picturesIndex ? <span className="active-pic">{picturesIndex + 1}</span> : <span>{picturesIndex + 1}</span>}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="proj-info-wrapper col-lg-12 col-md-12 ms-lg-4 ms-2">
                    <ul className="list-unstyled font-size">
                        {projectArray.map((dataPoint, index) => {
                            let possibleSplit = dataPoint.split(" || ");
                            if (possibleSplit.length > 1) {
                                // possibleSplit.map((value: string, newIndex: number) => {
                                //     return (
                                //         <>
                                //             {console.log(value)}
                                //             <li key={newIndex * 100}>{value}</li>
                                //         </>
                                //     );
                                // });
                                return possibleSplit.map((arrayPoint: string, newIndex: number) => {
                                    return <li key={newIndex * 100}>{arrayPoint}</li>;
                                });
                            } else {
                                return <li key={index}>{dataPoint}</li>;
                            }
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SingleProjectPage;
