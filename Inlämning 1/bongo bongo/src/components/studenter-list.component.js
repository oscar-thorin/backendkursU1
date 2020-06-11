import React, { Component } from "react";
import axios from "axios";

const Student = (props) => (
  <tr>
    <td>{props.student.name}</td>

    <td>
      <a
        href="/#"
        onClick={() => {
          props.deleteStudent(props.student._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class StudenterList extends Component {
  constructor(props) {
    super(props);

    this.deleteStudent = this.deleteStudent.bind(this);

    this.state = { studenter: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/studenter/")
      .then((response) => {
        this.setState({ studenter: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteStudent(id) {
    axios.delete("http://localhost:4000/studenter/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      studenter: this.state.studenter.filter((el) => el._id !== id),
    });
  }

  studentList() {
    return this.state.studenter.map((currentStudent) => {
      return (
        <Student
          student={currentStudent}
          deleteStudent={this.deleteStudent}
          key={currentStudent._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Studenter List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>{this.studentList()}</tbody>
        </table>
      </div>
    );
  }
}
