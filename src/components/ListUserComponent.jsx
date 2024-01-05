import React, { Component } from "react";
import _debounce from "lodash.debounce";
import UserService from "../services/UserService";
import Modal from "react-modal";

class ListUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      showModal: false,
      userIdToDelete: null,
      searchQuery: "",
      searchResults: [], // Menyimpan hasil pencarian
    };

    this.addUser = this.addUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.handleSearch = _debounce(this.handleSearch, 300);
  }

  // Fungsi untuk menghapus user
  deleteUser(id) {
    this.setState({ showModal: true, userIdToDelete: id });
  }

  // Fungsi untuk mengonfirmasi penghapusan user
  confirmDelete = () => {
    const { userIdToDelete } = this.state;
    UserService.deleteUser(userIdToDelete).then((res) => {
      this.setState({
        users: this.state.users.filter((user) => user.id !== userIdToDelete),
        showModal: false,
        userIdToDelete: null,
      });
    });
  };

  // Fungsi untuk menutup modal konfirmasi penghapusan
  closeModal = () => {
    this.setState({ showModal: false, userIdToDelete: null });
  };

  // Fungsi untuk menampilkan detail user
  viewUser(id) {
    this.props.history.push(`/view-user/${id}`);
  }

  // Fungsi untuk mengedit user
  editUser(id) {
    this.props.history.push(`/add-user/${id}`);
  }

  // Mengambil data users saat komponen dimuat
  componentDidMount() {
    this.fetchUsers();
  }

  // Mengambil data users dari server
  fetchUsers() {
    UserService.getUsers().then((res) => {
      if (res.data === null || res.data.length === 0) {
        this.props.history.push("/add-user/_add");
      } else {
        this.setState({ users: res.data });
      }
    });
  }

  // Fungsi untuk melakukan pencarian
  handleSearch = (value) => {
    this.setState({ searchQuery: value }, () => {
      UserService.searchUsers(value)
        .then((res) => {
          if (res.data) {
            // Filter hasil pencarian berdasarkan nama yang dimasukkan
            const filteredResults = res.data.filter((user) =>
              user.nama.toLowerCase().startsWith(value.toLowerCase())
            );
            this.setState({ searchResults: filteredResults });
          }
        })
        .catch((error) => {
          console.error("Error searching users:", error);
          this.setState({ searchResults: [] }); // Atur hasil pencarian menjadi kosong jika terjadi kesalahan
        });
    });
  };

  // Fungsi untuk menambahkan user
  addUser() {
    this.props.history.push("/add-user/_add");
  }

  // Fungsi untuk mengeksekusi pencarian saat tombol 'Search' ditekan
  handleSearchButton = () => {
    UserService.searchUsers(this.state.searchQuery)
      .then((res) => {
        if (res.data) {
          this.setState({ users: res.data });
        } else {
          this.setState({ users: [] }); // Set data kosong jika tidak ada hasil
        }
      })
      .catch((error) => {
        console.error("Error searching users:", error);
        this.setState({ users: [] }); // Set data kosong jika terjadi error
      });
  };

  // Fungsi untuk merender komponen
  render() {
    const displayData = this.state.searchQuery
      ? this.state.searchResults
      : this.state.users;

    let content;
    if (displayData.length === 0) {
      content = (
        <tr>
          <td colSpan="5" style={{ textAlign: "center" }}>
            No matching users found.
          </td>
        </tr>
      );
    } else {
      content = displayData.map((user) => (
        <tr key={user.id}>
          <td>
            <div>{user.nama}</div>
          </td>
          <td>
            <div>{user.usia}</div>
          </td>
          <td>
            <div>{user.jenis_kelamin}</div>
          </td>
          <td>
            <div>{user.alamat}</div>
          </td>
          <td>
            <div>{user.deskripsi}</div>
          </td>
          <td>
            <button
              onClick={() => this.editUser(user.id)}
              className="btn btn-info"
            >
              Update
            </button>
            <button
              style={{ marginLeft: "5px" }}
              onClick={() => this.deleteUser(user.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
            <button
              style={{ marginLeft: "5px" }}
              onClick={() => this.viewUser(user.id)}
              className="btn btn-info"
            >
              View
            </button>
          </td>
        </tr>
      ));
    }

    return (
      <div>
        <h2
          className="text-center pt-5"
          style={{ fontWeight: "bold", fontSize: "50px" }}
        >
          Data Pasien
        </h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addUser}>
            Add Data
          </button>
        </div>
        <div className="row mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            value={this.state.searchQuery}
            onChange={(e) => this.handleSearch(e.target.value)} // Memanggil fungsi pencarian saat nilai berubah
          />
          <button className="btn btn-primary" onClick={this.handleSearchButton}>
            Search
          </button>
        </div>
        <br />
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Usia</th>
                <th>Jenis Kelamin</th>
                <th>Alamat</th>
                <th>Deskripsi</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        </div>
        <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.closeModal}
          contentLabel="Delete Confirmation Modal"
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
          <h2 style={{ marginBottom: "20px" }}>
            Are you sure you want to delete this patient data?
          </h2>
          <p style={{ marginBottom: "40px" }}>
            This will delete this patient data permanently. You cannot undo this
            action.
          </p>
          <button
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              backgroundColor: "#fff",
              color: "#000",
              marginRight: "10px",
            }}
            onClick={this.closeModal}
          >
            Cancel
          </button>
          <button
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#e74c3c",
              color: "#fff",
            }}
            onClick={this.confirmDelete}
          >
            Delete
          </button>
        </Modal>
      </div>
    );
  }
}

export default ListUserComponent;
