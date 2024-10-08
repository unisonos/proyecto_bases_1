const getAuthorsRouter = require("./authors.route");
const getPubRouter = require("./publications.route");

const getCollRouter = require("./collections.route");
const getCountriesRouter = require("./countries.route");
const getInstitutionsRouter = require("./institutions.route");

const getSpeciesRouter = require("./species.route")



module.exports = function (app, client) {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("/sergio", async (req, res) => {
    const query = "SELECT species_name, genus_id FROM species";
    const result = await client.query(query);

    res.send(result.rows);
  });

  app.use("/authors", getAuthorsRouter(client));

  app.use("/publications", getPubRouter(client));

  app.use("/collections", getCollRouter(client));

  app.use("/countries", getCountriesRouter(client));

  app.use("/institutions", getInstitutionsRouter(client));

  app.use("/species", getSpeciesRouter(client));

  app.use((req, res) => {
    res.status(404)
    res.send({
      message: "Not found",
      error: true,
      status: 404,
    });
  });
};