import app from "./app.js";
import {dbConnect} from "./db/connect.js";

const PORT = process.env.PORT || 8000;

dbConnect()
  .then(() =>
    app.listen(PORT, () => {
      console.log("Server is running in port 8000");
    })
  )
  .catch((error) => console.error(error));
