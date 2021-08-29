import React, { useEffect, useState } from "react";
import SideBarForm from "./SideBarForm";
import Student from "./Student";

function StudentList(props) {
  const [shouldSidebarVisible, setShouldSidebarVisible] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({});
  const [students, setStudent] = useState({});
  const [Refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch("https://mtml-api.hestawork.com/api/user/filter-students ", {
      method: "POST",
      body: JSON.stringify({ page: "1", limit: "10" }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStudent(data);
      });
  }, [Refresh]);

  const closeSideBar = () => {
    setShouldSidebarVisible(false);
  };

  const openSideBar = (student) => {
    console.log(student);
    setCurrentStudent(student);
    setShouldSidebarVisible(true);
  };

  return (
    <>
      <h2>Student Information</h2>
      <div className="row">
        {students.data !== undefined && (
          <Student
            students={students}
            setStudent={setStudent}
            shouldSidebarVisible={shouldSidebarVisible}
            closeSideBar={closeSideBar}
            openSideBar={openSideBar}
          />
        )}

        {shouldSidebarVisible && (
          <SideBarForm
            student={currentStudent}
            setRefresh={setRefresh}
            Refresh={Refresh}
            shouldSidebarVisible={shouldSidebarVisible}
            closeSideBar={closeSideBar}
            openSideBar={openSideBar}
          />
        )}
      </div>
    </>
  );
}

export default StudentList;
