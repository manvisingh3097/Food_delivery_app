var express = require("express");
const colors = require("colors");
const cors = express("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const { Org, Item, Pricing } = require("./models/models");

//dot env  config
dotenv.config();

//rest object
var app = express();

//middlewares
app.use(cors);
app.use(express.json());
app.use(morgan("dev"));

//route

app.use("/api/v1/test", require("./routes/testRoutes"));

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to food delivery app</h1>");
});

app.post("/put_org", async (req, res) => {
  const name = req.body.name
  const newOrg = await Org.create({ "name": name });
  return res.status(200).send(newOrg);
});

app.get("/get_all_orgs", async (req, res) => {
  const results = await Org.findAll();
  return res.status(200).send(results);
});

app.post("/put_price", async (req, res) => {
  const org_id = req.body.org_id;
  const item_id = req.body.item_id;
  const zone = req.body.zone;
  const base_dis_in_km = req.body.base_dis_in_km;
  const km_price = req.body.km_price;
  const fix_price = req.body.fix_price;
  const newPricing = await Pricing.create({
    org_id: org_id,
    item_id: item_id,
    zone: zone,
    base_dis_in_km: base_dis_in_km,
    km_price: km_price,
    fix_price: fix_price,
  });
  return res.status(200).send(newPricing);
});

app.get("/get_price", async (req, res) => {
  const zone = req.query.zone;
  const org_id = req.query.organisation_id;
  const total_dis = req.query.total_distance;
  const item_type = req.query.item_type;

  let total_price;

  let org_details = await Pricing.findOne({
    where: {
      org_id: parseInt(org_id),
      zone: zone,
    },
  });
  const fix_price = org_details.fix_price;
  const km_price = org_details.km_price;
  const base_dis = org_details.base_dis_in_km;

  total_price = fix_price;
  if (total_dis - base_dis >= 0) {
    total_price = total_price + km_price * (total_dis - base_dis);
  }
  return res.status(200).send({ total_price: total_price });
});

//port
const PORT = process.env.PORT;

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));
//listen
app.listen(PORT, function () {
  console.log(`Node server running on ${PORT}`.white.bgMagenta);
});
