const { json } = require("express");
const express = require("express");
let bodyParser = require("body-parser");
const cors = require("cors");

const mysql = require("mysql");

require('dotenv').config();

const app = express();


var connection = mysql.createPool({
  host: process.env.DATABARANG_DBHOST,
  user: process.env.DATABARANG_DBUSER,
  password: process.env.DATABARANG_DBPASSWORD,
  database: process.env.DATABARANG_DBNAME,
  connectionLimit: 10000,
});

app.use(bodyParser.json());
app.use(cors());

// connection.connect();


// CRUD DATA BARANG START
app.get("/api/data-barang", (req, res) => {
  connection.query(
    "SELECT * FROM data_barang",
    function (error, results, fields) {
      console.log(error)
      res.send(results);
    }
  );
});

app.post("/api/data-barang", (req, res) => {
  let dataInputan = {
    id_barang: req.body.id_barang,
    id_kategori: req.body.id_kategori,
    nama_barang: req.body.nama_barang,
    foto_barang: req.body.foto_barang,
    deskripsi: req.body.deskripsi,
    jumlah: req.body.jumlah_barang,
    harga_barang: req.body.harga_barang,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
  };

  connection.query(
    "INSERT INTO data_barang SET ?",
    dataInputan,
    (error, results, fields) => {
      console.log(error);
      res.send(results);
    }
  );
});

app.delete("/api/data-barang/:id_barang", (req, res) => {
  connection.query(
    `DELETE FROM data_barang WHERE id_barang = '${req.params.id_barang}'`,
    (error, results) => {
      console.log(error);
      res.send(results);
    }
  );
});

app.put("/api/data-barang/:id_barang", (req, res) => {

    let id_barang = req.body.id_barang;
    let id_kategori = req.body.id_kategori;
    let nama_barang = req.body.nama_barang;
    let foto_barang = req.body.foto_barang;
    let deskripsi = req.body.deskripsi;
    let jumlah_barang = req.body.jumlah;
    let harga_barang = req.body.harga_barang;
    let created_at= req.body.created_at;
    let updated_at= req.body.updated_at;



  connection.query(
    'UPDATE data_barang SET id_barang =? , id_kategori=? , nama_barang =? , foto_barang =?, deskripsi =? , jumlah =? , harga_barang =?, created_at=?,  updated_at=? WHERE id_barang =?',[id_barang,id_kategori,nama_barang,foto_barang,deskripsi,jumlah_barang,harga_barang,created_at,updated_at,id_barang],
    (error, results) => {
      console.log(error);
      res.send(results);
    }
  );
});

// CRUD DATA BARANG END

// CRUD KATEGORI START

app.get("/api/kategori", (req, res) => {
  connection.query(
    "SELECT * FROM kategori",
    function (error, results, fields) {
      console.log(error)
      res.send(results);
    }
  );
});

app.post("/api/kategori", (req, res) => {
  let dataInputan = {
    id_kategori: req.body.id_kategori,
    kategori: req.body.kategori,
    deskripsi: req.body.deskripsi
  };

  connection.query(
    "INSERT INTO kategori SET ?",
    dataInputan,
    (error, results, fields) => {
      console.log(error);
      res.send(results);
    }
  );
});

app.delete("/api/kategori/:id_kategori", (req, res) => {
  connection.query(
    `DELETE FROM kategori WHERE id_kategori = '${req.params.id_kategori}'`,
    (error, results) => {
      console.log(error);
      res.send(results);
    }
  );
});

app.put("/api/kategori/:id_kategori", (req, res) => {


    let id_kategori = req.body.id_kategori;
    let kategori = req.body.kategori;
    let deskripsi = req.body.deskripsi;



  connection.query(
    'UPDATE kategori SET id_kategori=?, kategori=?, deskripsi =? where id_kategori=?', [id_kategori,kategori,deskripsi,id_kategori],
    (error, results) => {
      console.log(error);
      res.send(results);
    }
  );
});
// CRUD KATEGORI END

// CRUD RIWAYAT START
app.get("/api/riwayat/", (req, res) => {
  connection.query(
    "SELECT * FROM histori_barang",
    function (error, results, fields) {
      console.log(error)
      res.send(results);
    }
  );
});

app.post("/api/riwayat/", (req, res) => {
  let dataInputan = {
    id_kategori: req.body.id_kategori,
    kategori: req.body.kategori,
    deskripsi: req.body.deskripsi
  };

  connection.query(
    "INSERT INTO kategori SET ?",
    dataInputan,
    (error, results, fields) => {
      console.log(error);
      res.send(results);
    }
  );
});

app.delete("/api/riwayat/:id_transaksi", (req, res) => {
  connection.query(
    `DELETE FROM kategori WHERE id_kategori = '${req.params.id_kategori}'`,
    (error, results) => {
      console.log(error);
      res.send(results);
    }
  );
});

app.put("/api/riwayat/:id_transaksi", (req, res) => {


    let id_kategori = req.body.id_kategori;
    let kategori = req.body.kategori;
    let deskripsi = req.body.deskripsi;



  connection.query(
    'UPDATE kategori SET id_kategori=?, kategori=?, deskripsi =? where id_kategori=?', [id_kategori,kategori,deskripsi,id_kategori],
    (error, results) => {
      console.log(error);
      res.send(results);
    }
  );
});
// CRUD RIWAYAT END


app.listen(3004, () => {
  console.log("backend run.... http://localhost:3004");
});
