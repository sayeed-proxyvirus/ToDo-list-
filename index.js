import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "todolist",
  password: "1234",
  post: 5432,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];
db.connect();
app.get("/", async (req, res) => {
  const result = await db.query("Select * from todolist ORDER BY id ASC");
  items = result.rows;
  res.render("index.ejs", {
    listTitle: "To do list",
    listItems: items,
  });
  
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;

  try {
    await db.query("Insert into todolist (title) values ($1);", [item]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
  
});

app.post("/edit",async (req, res) => {
  const itemcode = req.body.updatedItemId;
  const itemtitle = req.body.updatedItemTitle;
  try {
    await db.query("Update todolist set title = $1 Where id = $2;", [itemtitle,itemcode]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete",async (req, res) => {
  const itemcode = req.body.deleteItemId;
  try {
    await db.query("Delete from todolist where id = $1;", [itemcode]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
