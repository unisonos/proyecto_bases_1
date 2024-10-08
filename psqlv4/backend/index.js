const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { getClient } = require("./get-client");
const initRoutes = require("./routes/_index");

(async () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

    const client = await getClient();

  initRoutes(app, client);

  const PORT = process.env.EXPRESS_PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
})();

//   const query = "SELECT * FROM species";
//   const result = await client.query(query);
//   console.log(result.rows);

//   // let insertRow = await client.query("INSERT INTO species (species_name, genus_id) VALUES ('test', 2)");

//   console.log("Done");

//   const speciesName = 'silvestris catus';
//   const entries = await client.query(`SELECT * FROM species WHERE species_name = '${speciesName}';`);

//   console.log(`Database entries for ${speciesName}: ${entries.rowCount} row(s)`);
//   console.log(Object.keys(entries.rows?.[0]).join('\t'));
//   console.log(`${entries.rows.map((r) => Object.values(r).join('\t')).join('\n')}`);

//   await client.end();
