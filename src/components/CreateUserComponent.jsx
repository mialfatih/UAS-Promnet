import React, { Component } from "react";
import UserService from "../services/UserService";
import Modal from "react-modal";
import NumberSelector from "../components/NumberSelector";
import "../App.css";

class CreateUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      nama: "",
      usia: 0,
      jenis_kelamin: "",
      alamat: "",
      deskripsi: "",
      showNotification: false, // State untuk menampilkan notifikasi
    };

    // Bind fungsi
    this.changeNama = this.changeNama.bind(this);
    this.changeJenisKelamin = this.changeJenisKelamin.bind(this);
    this.changeAlamat = this.changeAlamat.bind(this);
    this.changeDeskripsi = this.changeDeskripsi.bind(this);
    this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
  }

  componentDidMount() {
    if (this.state.id === "_add") {
      return;
    } else {
      UserService.getUserById(this.state.id).then((res) => {
        let user = res.data;
        this.setState({
          nama: user.nama,
          usia: user.usia,
          jenis_kelamin: user.jenis_kelamin,
          alamat: user.alamat,
          deskripsi: user.deskripsi,
        });
      });
    }
  }

  saveOrUpdateUser = (e) => {
    e.preventDefault();
    let user = {
      nama: this.state.nama,
      usia: this.state.usia,
      jenis_kelamin: this.state.jenis_kelamin,
      alamat: this.state.alamat,
      deskripsi: this.state.deskripsi,
    };

    if (this.state.id === "_add") {
      UserService.createUser(user).then((res) => {
        this.setState({ showNotification: true });
      });
    } else {
      UserService.updateUser(user, this.state.id).then((res) => {
        this.props.history.push("/users");
      });
    }
  };

  changeNama = (event) => {
    this.setState({ nama: event.target.value });
  };

  changeUsia = (newUsia) => {
    this.setState({ usia: newUsia });
  };

  changeJenisKelamin = (event) => {
    this.setState({ jenis_kelamin: event.target.value });
  };

  changeAlamat = (event) => {
    this.setState({ alamat: event.target.value });
  };

  changeDeskripsi = (event) => {
    this.setState({ deskripsi: event.target.value });
  };

  cancel() {
    this.props.history.push("/users");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Tambah Data Pasien</h3>;
    } else {
      return <h3 className="text-center">Update Data Pasien</h3>;
    }
  }

  render() {
    return (
      <div>
        {/* Modal Notifikasi */}
        <Modal
          isOpen={this.state.showNotification}
          contentLabel="Success Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              fontFamily: "Poppins, sans-serif",
              textAlign: "center",
              borderRadius: "8px",
              maxWidth: "400px",
              margin: "auto",
              padding: "30px",
              background: "#fff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <div style={{ position: "relative", marginBottom: "20px" }}>
            <span
              style={{
                display: "inline-block",
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                backgroundColor: "#5cb85c",
                color: "#fff",
                fontSize: "32px",
                lineHeight: "70px",
              }}
            >
              ✓
            </span>
          </div>
          <h2 style={{ margin: "20px 0", color: "#black" }}>Success</h2>
          <p style={{ color: "#black" }}>Data Added!</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              this.setState({ showNotification: false });
              this.props.history.push("/users");
            }}
            style={{
              borderRadius: "20px",
              padding: "10px 20px",
              backgroundColor: "#5FBDFF",
              border: "none",
              color: "#fff",
            }}
          >
            Okay
          </button>
        </Modal>

        {/* Form Input */}
        <br />
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Nama:</label>
                    <input
                      placeholder="Nama"
                      name="nama"
                      className="form-control"
                      value={this.state.nama}
                      onChange={this.changeNama}
                    />
                  </div>
                  <div className="form-group">
                    <label>Usia :</label>
                    {/* Integrasikan komponen NumberSelector */}
                    <NumberSelector
                      number={this.state.usia}
                      onChangeNumber={this.changeUsia}
                    />
                  </div>
                  <div className="form-group">
                    <label>Jenis Kelamin :</label>
                    <div className="gender-radio">
                      <label>
                        <input
                          type="radio"
                          name="jenis_kelamin"
                          value="l"
                          checked={this.state.jenis_kelamin === "l"}
                          onChange={this.changeJenisKelamin}
                        />
                        Laki-Laki
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="jenis_kelamin"
                          value="p"
                          checked={this.state.jenis_kelamin === "p"}
                          onChange={this.changeJenisKelamin}
                        />
                        Perempuan
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Alamat:</label>
                    <input
                      placeholder="Alamat"
                      name="alamat"
                      className="form-control"
                      value={this.state.alamat}
                      onChange={this.changeAlamat}
                    />
                  </div>
                  <div className="form-group">
                    <label>Deskripsi:</label>
                    <input
                      placeholder="Deskripsi"
                      name="deskripsi"
                      className="form-control"
                      value={this.state.deskripsi}
                      onChange={this.changeDeskripsi}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateUser}
                  >
                    Simpan
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Batal
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUserComponent;
