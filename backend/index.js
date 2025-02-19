import { app } from "./app.js";
import { v2 as cloudinary } from 'cloudinary';

const PORT = process.env.PORT || 2050;


cloudinary.config({
  cloud_name: 'dxsay7zki',
  api_key: '429197262542392',
  api_secret: '54C2KvNKWnbPnpMetLgKewCX1Gs'
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
