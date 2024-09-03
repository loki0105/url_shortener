import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import Darkmode from "darkmode-js";
const app = express();
app.use(express.static("public")); // Serve static files from the 'public' directory
const port = 3000;
const API_URL = "https://cleanuri.com/api/v1/shorten";
app.use(bodyParser.urlencoded({ extended: false }));
new Darkmode().showWidget();
 


app.set("view engine", "ejs"); // Set the view engine to EJS

app.get("/", async (req, res) => {
	res.render("index.ejs", { dat1: 0});
});

app.post("/submit", async (req, res) => {
	const ds = req.body.links;
	const data = new URLSearchParams({ url: ds }).toString();

	try {
		const response = await axios.post(API_URL, data, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});
		 
		res.render("index.ejs", { dat1: response.data.result_url });


    } catch (error) {
  
        res.render("index.ejs", { dat1: error.status });
	
    }
    

  

	res.render("index.ejs");
});

app.listen(port, () => {
	console.log("Listening on port", port);
});





	
