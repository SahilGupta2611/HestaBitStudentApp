import React, { useEffect, useState, useRef } from "react";
import { Form, Offcanvas } from "react-bootstrap";

function SideBarForm(props) {
  const [StudentClasses, setStudentClasses] = useState([]);
  const [Campus, setCampus] = useState([]);
  const [section, setSection] = useState([]);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const campusRef = useRef(null);
  const studentIdRef = useRef(null);
  const dobRef = useRef(null);
  const genderRef = useRef(null);
  const mobileRef = useRef(null);
  const emailRef = useRef(null);
  const classRef = useRef(null);
  const sectionRef = useRef(null);

  const sectionHandler = (event) => {
    console.log(event.target.value);
    var [std] = StudentClasses.filter(
      (studentclass) => studentclass.class_name == event.target.value
    );
    var sections = std.section.map((sec) => sec.section);
    setSection(sections);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    var data = {
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      campus: campusRef.current.value,
      user_id: props.student._id,
      student_id: studentIdRef.current.value,
      dob: dobRef.current.value ? dobRef.current.value : "1998-01-01",
      gender: genderRef.current.value,
      email: emailRef.current.value,
      mobile_number: mobileRef.current.value,
      class_name: classRef.current.value,
      section: sectionRef.current.value,
    };

    fetch("https://mtml-api.hestawork.com/api/user/update-student ", {
      // Adding method type
      method: "PUT",
      // Adding body or contents to send
      body: JSON.stringify(data),
      // Adding headers to the request
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          console.log("student data updated successfully.....");
          props.closeSideBar();
          props.setRefresh(!props.Refresh);
        }
      });
  };

  useEffect(() => {
    fetch("https://mtml-api.hestawork.com/api/userClass/class-details")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data.classes);
        setStudentClasses(data.data.classes);
        setCampus(data.data.campus);
      });
  }, []);

  return (
    <Offcanvas
      show={props.shouldSidebarVisible}
      onHide={props.closeSideBar}
      placement="end"
      backdrop="false"
      style={{ overflow: "scroll" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ fontSize: "20px" }}>
          Edit Student
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ fontSize: "20px" }}>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlfor="fname" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="fname"
              defaultValue={props.student.first_name}
              ref={firstNameRef}
            ></input>
          </div>

          <div className="mb-3">
            <label htmlfor="lname" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lname"
              defaultValue={props.student.last_name}
              ref={lastNameRef}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlfor="campus" className="form-label">
              Campus
            </label>
            <select id="campus" className="form-select" ref={campusRef}>
              {Campus.map((camp) => {
                return (
                  <option
                    value={camp.campus_name}
                    selected={
                      props.student.campus == camp.campus_name ? true : false
                    }
                  >
                    {camp.campus_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-3">
            <label htmlfor="std_id" className="form-label">
              Student Id*
            </label>
            <input
              type="text"
              className="form-control"
              id="std_id"
              defaultValue={props.student.student.student_id}
              disabled
              ref={studentIdRef}
            ></input>
          </div>

          <div className="mb-3">
            <label htmlfor="dob" className="form-label">
              Date Of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="dob"
              defaultValue={props.student.student.dob}
              ref={dobRef}
            ></input>
          </div>

          <div className="mb-3">
            <label htmlfor="gender" className="form-label">
              gender
            </label>
            <select id="gender" className="form-select" ref={genderRef}>
              <option
                value="Male"
                selected={props.student.student.gender == "Male" ? true : false}
              >
                Male
              </option>
              <option
                value="Female"
                selected={
                  props.student.student.gender == "Female" ? true : false
                }
              >
                Female
              </option>
              <option
                Value="Others"
                selected={
                  props.student.student.gender == "Others" ? true : false
                }
              >
                Others
              </option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlfor="email" className="form-label">
              Email Address*
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              disabled
              defaultValue={props.student.email}
              ref={emailRef}
            ></input>
          </div>

          <div className="mb-3">
            <label htmlfor="mobile" className="form-label">
              Mobile No*
            </label>
            <input
              type="number"
              className="form-control"
              id="mobile"
              defaultValue={props.student.mobile_number}
              ref={mobileRef}
            ></input>
          </div>

          <div className="mb-3">
            <label htmlfor="classes" className="form-label">
              Class
            </label>
            <select
              id="classes"
              className="form-select"
              placeholder={props.student.student.class_name}
              onChange={sectionHandler}
              ref={classRef}
            >
              {StudentClasses.map((studentclass) => {
                return (
                  <option
                    value={studentclass.class_name}
                    selected={
                      props.student.student.class_name ==
                      studentclass.class_name
                        ? true
                        : false
                    }
                  >
                    {studentclass.class_name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-3">
            <label htmlfor="section" className="form-label">
              Section
            </label>
            <select id="section" className="form-select" ref={sectionRef}>
              {section.length == 0 ? (
                <option value={props.student.student.section} selected>
                  {props.student.student.section}
                </option>
              ) : (
                section.map((sec) => {
                  return (
                    <option
                      value={sec}
                      selected={
                        sec == props.student.student.section ? true : false
                      }
                    >
                      {sec}
                    </option>
                  );
                })
              )}
            </select>
          </div>

          <button
            type="submit"
            className=" button-color"
            style={{ marginLeft: "10px" }}
          >
            Save
          </button>
          <button
            type="button"
            className="button-transparent"
            style={{ marginLeft: "10px" }}
            onClick={props.closeSideBar}
          >
            Cancel
          </button>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default SideBarForm;
