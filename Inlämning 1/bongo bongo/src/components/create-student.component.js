import React, { Component } from "react";
import axios from "axios";

export default class CreateStudent extends Component {
  constructor(props) {
    super(props);

    this.onChangeStudentName = this.onChangeStudentName.bind(this);
    this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);

    this.onChangeStudentGata = this.onChangeStudentGata.bind(this);
    this.onChangeStudentPostnummer = this.onChangeStudentPostnummer.bind(this);
    this.onChangeStudentOrt = this.onChangeStudentOrt.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      student_name: "",
      student_email: "",
      student_address_gata: "",
      student_address_postnummer: "",
      student_address_ort: "",
    };
  }

  onChangeStudentName(e) {
    this.setState({
      student_name: e.target.value,
    });
  }

  onChangeStudentEmail(e) {
    this.setState({
      student_email: e.target.value,
    });
  }

  onChangeStudentGata(e) {
    this.setState({
      student_address_gata: e.target.value,
    });
  }
  onChangeStudentPostnummer(e) {
    this.setState({
      student_address_postnummer: e.target.value,
    });
  }
  onChangeStudentOrt(e) {
    this.setState({
      student_address_ort: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`Student Name: ${this.state.student_name}`);
    console.log(`Student Email: ${this.state.student_email}`);
    console.log(`Student Gata: ${this.state.student_address_gata}`);
    console.log(`Student Postnummer: ${this.state.student_address_postnummer}`);
    console.log(`Student Ort: ${this.state.student_address_ort}`);

    const newStudent = {
      name: this.state.student_name,
      email: this.state.student_email,
      address: {
        gata: this.state.student_address_gata,
        postnummer: this.state.student_address_postnummer,
        ort: this.state.student_address_ort,
      },
    };

    axios
      .post("http://localhost:4000/studenter/add", newStudent)
      .then((res) => console.log(res.data));

    this.setState({
      student_name: "",
      student_email: "",
      student_address_gata: "",
      student_address_postnummer: "",
      student_address_ort: "",
    });
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Create New Student</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.student_name}
              onChange={this.onChangeStudentName}
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.student_email}
              onChange={this.onChangeStudentEmail}
            />
          </div>

          <div className="form-group">
            <label>Gata: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.student_address_gata}
              onChange={this.onChangeStudentGata}
            />
          </div>

          <div className="form-group">
            <label>Postnummer: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.student_address_postnummer}
              onChange={this.onChangeStudentPostnummer}
            />
          </div>

          <div className="form-group">
            <label>Ort: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.student_address_ort}
              onChange={this.onChangeStudentOrt}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Student"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
