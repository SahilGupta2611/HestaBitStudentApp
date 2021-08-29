import React from "react";
import { FaEdit, FaCreativeCommonsPd } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";

function Student(props) {
  const editStudent = (Id) => {
    var [student] = props.students.data.docs.filter((std) => std._id == Id);
    props.openSideBar(student);
  };

  return (
    <div className="col-lg-12">
      <table
        className="table"
        size="lg"
        style={{
          marginTop: "10px",
          borderSpacing: "0 20px",
          borderCollapse: "separate",
        }}
      >
        <tr style={{ background: "transparent" }}>
          <th>Student #</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Class</th>
          <th>Section</th>
          <th>Email #</th>
          <th>Campus</th>
          <th colSpan="3">Action</th>
        </tr>

        <tbody>
          {props.students.data.docs.map((student) => {
            return (
              <tr
                key={student.student.student_id}
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                  height: "60px",
                }}
              >
                <td>{student.student.student_id}</td>
                <td>{student.first_name} </td>
                <td>{student.last_name}</td>
                <td>{student.student.class_name}</td>
                <td>{student.student.section}</td>
                <td>{student.email}</td>
                <td>{student.campus}</td>
                <td>
                  <a
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      editStudent(student._id);
                    }}
                  >
                    <FaEdit />
                  </a>
                </td>
                <td>
                  <a href="#">
                    <FaCreativeCommonsPd />
                  </a>
                </td>
                <td>
                  <a href="#">
                    <BsFillTrashFill />
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Student;
