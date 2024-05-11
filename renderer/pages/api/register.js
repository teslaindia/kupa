import nextConnect from "next-connect";
const { QuickDB } = require("quick.db");
const db = new QuickDB();

const apiRoute = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.get((req, res) => {
  res.json({ message: "Hello World" });
});

export default apiRoute;
