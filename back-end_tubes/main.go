package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

// User represents the structure of the pasien_puskesmas_fatih table
type User struct {
	ID           int    `json:"id"`
	Nama         string `json:"nama"`
	Usia         int    `json:"usia"`
	JenisKelamin string `json:"jenis_kelamin"`
	Alamat       string `json:"alamat"`
	Deskripsi    string `json:"deskripsi"`
}

var db *sql.DB
var err error

func main() {
	InitDB()
	defer db.Close()
	log.Println("Starting the HTTP server on port 9080")
	router := mux.NewRouter()
	router.HandleFunc("/users", GetUsers).Methods("GET")
	router.HandleFunc("/users", CreateUser).Methods("POST")
	router.HandleFunc("/users/{id}", GetUser).Methods("GET")
	router.HandleFunc("/users/{id}", UpdateUser).Methods("PUT")
	router.HandleFunc("/users/{id}", DeleteUser).Methods("DELETE")
	http.ListenAndServe(":9080", &CORSRouterDecorator{router})
}

func InitDB() {
	db, err = sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/db_2205330_fatih_uas")
	if err != nil {
		panic(err.Error())
	}
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var users []User

	result, err := db.Query("SELECT id, nama, usia, jenis_kelamin, alamat, deskripsi FROM pasien_puskesmas_fatih")
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	for result.Next() {
		var user User
		err := result.Scan(&user.ID, &user.Nama, &user.Usia, &user.JenisKelamin, &user.Alamat, &user.Deskripsi)
		if err != nil {
			panic(err.Error())
		}
		users = append(users, user)
	}
	json.NewEncoder(w).Encode(users)
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	stmt, err := db.Prepare("INSERT INTO pasien_puskesmas_fatih(nama, usia, jenis_kelamin, alamat, deskripsi) VALUES(?,?,?,?,?)")
	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	var user User
	err = json.Unmarshal(body, &user)
	if err != nil {
		panic(err.Error())
	}
	_, err = stmt.Exec(user.Nama, user.Usia, user.JenisKelamin, user.Alamat, user.Deskripsi)
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "New user was created")
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	result, err := db.Query("SELECT id, nama, usia, jenis_kelamin, alamat, deskripsi FROM pasien_puskesmas_fatih WHERE id = ?", params["id"])
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	var user User
	for result.Next() {
		err := result.Scan(&user.ID, &user.Nama, &user.Usia, &user.JenisKelamin, &user.Alamat, &user.Deskripsi)
		if err != nil {
			panic(err.Error())
		}
	}
	json.NewEncoder(w).Encode(user)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("UPDATE pasien_puskesmas_fatih SET nama=?, usia=?, jenis_kelamin=?, alamat=?, deskripsi=? WHERE id=?")
	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	var user User
	err = json.Unmarshal(body, &user)
	if err != nil {
		panic(err.Error())
	}
	_, err = stmt.Exec(user.Nama, user.Usia, user.JenisKelamin, user.Alamat, user.Deskripsi, params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "User with ID = %s was updated", params["id"])
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("DELETE FROM pasien_puskesmas_fatih WHERE id=?")
	if err != nil {
		panic(err.Error())
	}
	_, err = stmt.Exec(params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "User with ID = %s was deleted", params["id"])
}

// CORSRouterDecorator applies CORS headers to a mux.Router
type CORSRouterDecorator struct {
	R *mux.Router
}

func (c *CORSRouterDecorator) ServeHTTP(rw http.ResponseWriter, req *http.Request) {
	if origin := req.Header.Get("Origin"); origin != "" {
		rw.Header().Set("Access-Control-Allow-Origin", origin)
		rw.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		rw.Header().Set("Access-Control-Allow-Headers", "Accept, Accept-Language, Content-Type, YourOwnHeader")
	}
	// Stop here if it's a Preflighted OPTIONS request
	if req.Method == "OPTIONS" {
		return
	}

	c.R.ServeHTTP(rw, req)
}