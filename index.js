const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const UserRoutes = require('./routes/User');
const LoginRoutes = require('./routes/Login');
const RegisterRoutes = require('./routes/Register');
const PostsRoutes = require('./routes/Posts');

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(fileUpload());

const whitelist = [
    "http://localhost:3000",
  ];
  
  const corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    const urlArray = req.originalUrl.split("/");
  
    if (
      whitelist.indexOf(req.header("Origin")) !== -1 ||
      (urlArray[0] === "" && urlArray[1] === "uploads")
    ) {
      corsOptions = { origin: callback(null, true) };
    } else {
      corsOptions = { origin: callback(new Error("Not allowed by CORS")) };
    }
  
    return corsOptions;
  };
  
  //HTTPS FIX
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  
  // app.use(cors(corsOptionsDelegate));
  app.use(cors());

const PORT = 5000;

app.use('/user', UserRoutes);
app.use('/login', LoginRoutes);
app.use('/register', RegisterRoutes);
app.use('/posts', PostsRoutes);



app.listen(PORT);