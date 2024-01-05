import React, { Component } from "react";
import UserService from "../services/UserService";

class ViewUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      user: {},
      loading: true, // Menambahkan status loading
    };
  }

  componentDidMount() {
    UserService.getUserById(this.state.id)
      .then((res) => {
        this.setState({ user: res.data, loading: false }); // Memperbarui state setelah data diterima
        console.log("Jenis Kelamin:", res.data.jenis_kelamin);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        this.setState({ loading: false }); // Memperbarui state jika terjadi kesalahan saat pengambilan data
      });
  }

  render() {
    const { user, loading } = this.state;

    const styles = {
      container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      },
      card: {
        width: "400px",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      },
      title: {
        fontSize: "35px",
        marginBottom: "20px",
        textAlign: "center",
        fontWeight: "bold",
      },
      detailRow: {
        display: "flex",
        marginBottom: "10px",
      },
      label: {
        flex: "1",
        fontWeight: "600",
      },
      value: {
        flex: "2",
        fontWeight: "normal",
      },
    };

    const getGender = (gender) => {
      return gender === "P" ? "Perempuan" : gender === "L" ? "Laki-laki" : "";
    };

    if (loading) {
      return (
        <div style={styles.container}>
          <div>Loading...</div> {/* Tampilkan pesan loading */}
        </div>
      );
    }

    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h3 style={styles.title}>Detail Pasien</h3>
          <div className="view-user-body">
            <div style={styles.detailRow}>
              <label style={styles.label}>Nama :</label>
              <div style={styles.value}>{user.nama}</div>
            </div>
            <div style={styles.detailRow}>
              <label style={styles.label}>Usia :</label>
              <div style={styles.value}>{user.usia}</div>
            </div>
            <div style={styles.detailRow}>
              <label style={styles.label}>Jenis Kelamin :</label>
              <div style={styles.value}>{getGender(user.jenis_kelamin)}</div>
            </div>
            <div style={styles.detailRow}>
              <label style={styles.label}>Alamat :</label>
              <div style={styles.value}>{user.alamat}</div>
            </div>
            <div style={styles.detailRow}>
              <label style={styles.label}>Deskripsi :</label>
              <div style={styles.value}>{user.deskripsi}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewUserComponent;
