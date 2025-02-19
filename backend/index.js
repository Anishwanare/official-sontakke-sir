import { app } from "./app.js";
import { v2 as cloudinary } from 'cloudinary';

const PORT = process.env.PORT || 2050;


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})


app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "server is running",
  });
});

app.listen(PORT, () => {
  console.log("Server is Connecterd to port", PORT);
});
