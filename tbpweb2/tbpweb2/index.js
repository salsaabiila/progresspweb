const Sequelize = require("sequelize");
const express = require('express');
// const db = require('./database');
var Users = require('./models/users');
var Documents = require('./models/documents');
var Signatures = require('./models/signatures');
// var Login = require('./src/login');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const multer = require('multer');
const path = require('path');


const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const Sequelize = require("sequelize");

const db = new Sequelize("tandatangan", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

//route atau middleware jika perlu
app.get('/hello', function(req, res) {
    res.send('Hello World!');
  });

  
app.get('/users', async function(req, res, next){
    const users = await Users.findAll();
    res.json(users);
});

app.get('/documents', async function(req, res, next){
    const documents = await Documents.findAll();
    res.json(documents);
});

app.get('/signature', async function(req, res, next){
    const signatures = await Signatures.findAll();
    res.json(signatures);
});




// Membuat koneksi ke database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Ganti dengan username MySQL Anda
  password: '', // Ganti dengan password MySQL Anda
  database: 'tandatangan', // Ganti dengan nama database Anda
});


// Membuat koneksi ke database
connection.connect((err) => {
  if (err) {
    console.error('Terjadi kesalahan saat terhubung ke database:', err);
    process.exit(1);
  }
  console.log('Terhubung ke database');
});

// Mengatur server untuk menerima permintaan JSON
app.use(express.json());

// Penanganan kesalahan umum
app.use((err, req, res, next) => {
  console.error('Terjadi kesalahan:', err);
  res.status(500).json({ message: 'Terjadi kesalahan dalam server' });
});



// Endpoint untuk registrasi pengguna baru
app.post('/register', (req, res) => {
  const { id, username, password, email, active } = req.body;
  if (!id || !username || !password || !email || !active) {
    res.status(400).json({ message: 'Id, Username, password, email, dan active diperlukan' });
    return;
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const sql = 'INSERT INTO users (id, username, password, email, active) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [id, username, hashedPassword, email, active], (err, result) => {
    if (err) {
      console.error('Terjadi kesalahan saat registrasi pengguna:', err);
      res.status(500).json({ message: 'Terjadi kesalahan saat registrasi pengguna' });
      return;
    }

    res.status(200).json({ message: 'Registrasi berhasil' });
  });
});

//login
app.post("/login", async (req, res) => {
  try {
    const users = await Users.findAll({ 
        where: { username: req.body.username } });
    if (!users) {
      return res.status(400).json({ message: "Username tidak ditemukan" });
    }
    
    const wrongMatchPass = await bcrypt.compare(req.body.password, users[0].password);
    if (wrongMatchPass) {
      return res.status(400).json({ message: "Password salah" });
    }

    const userId = users[0].id;
    const username = users[0].username;
    const accessToken = jwt.sign({ userId, username }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '30s'
    });
    const refreshToken = jwt.sign({ userId, username }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '20h'
    });
    await Users.update({refresh_token: refreshToken},{
        where:{
            id:userId
        }
    });
    res.cookie('refreshToken', refreshToken,{
        httpOnly: true,
        maxAge: 24 * 60 * 60 *1000
    });
    
    
    res.json({ message: "Berhasil login", accessToken});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan" });
  }
});

// Middleware
app.use(bodyParser.json());

// editProfile
app.post("/editprofile", async (req, res) => {
  try {
    const { userId } = req.body; // Assuming you have userId available in the request body

    // Find the user by userId
    const users = await Users.findByPk(userId);

    if (!users) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user profile with the provided data
    users.username = req.body.username; // Assuming you have 'name' field in the request body
    users.email = req.body.email; // Assuming you have 'email' field in the request body
    // Add more fields as per your requirement

    // Save the updated user profile
    await users.save();

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

// LihatProfile 
app.get('/profile/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by userId
    const users = await Users.findByPk(userId, {
      attributes: ['username', 'email'] // Specify the columns to include in the response
    });

    if (!users) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});


// Konfigurasi multer untuk mengunggah file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Simpan file di folder "uploads/"
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

const upload = multer({ storage: storage });

// Middleware untuk mengizinkan CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Route untuk mengunggah gambar profil ke tabel users
app.post('/profile/upload', upload.single('image'), (req, res) => {
  const { filename } = req.file;

  // Simpan informasi file ke dalam database
  const query = 'INSERT INTO users (sign_img) VALUES (?)';
  connection.query(query, [filename], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Terjadi kesalahan saat mengunggah gambar' });
    } else {
      res.json({ message: 'Gambar berhasil diunggah', filename });
    }
  });
});



// Menjalankan server pada port 3000
app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});

