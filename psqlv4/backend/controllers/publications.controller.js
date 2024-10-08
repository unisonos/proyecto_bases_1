module.exports = function (client) {
  return {
    get: async (req, res) => {
      try {
        let query = `
        SELECT DISTINCT ON (pub.publication_id) 
          pub.publication_id, 
          pub.title, 
          pub.date, 
          pub.publisher, 
          pub.isbn, 
          pub.doi
        FROM publications AS pub
        LEFT JOIN collections_publications AS cp ON cp.publication = pub.publication_id
        LEFT JOIN species_publications AS sp ON sp.publication_id = pub.publication_id
        LEFT JOIN species AS spec ON sp.species_id = spec.species_id
      `;

        const queryParams = [];
        let queryFilter = "";

        if (req.query.id) {
          queryFilter = " WHERE pub.publication_id = $1";
          queryParams.push(req.query.id);
        } else if (req.query.q && req.query.q.length > 0) {
          queryFilter = " WHERE to_tsvector(pub.title) @@ to_tsquery($1)";
          queryParams.push(req.query.q);
        } else if (req.query.s && req.query.s.length > 0) {
          queryFilter = " WHERE to_tsvector(spec.species_name) @@ to_tsquery($1)";
          queryParams.push(req.query.s);
        }

        query += queryFilter + " ORDER BY pub.publication_id, pub.title DESC";

        const result = await client.query(query, queryParams.length ? queryParams : null);
        res.status(200).send(result.rows);
        
      } catch (error) {
        console.error(error.message);
        res.status(500).send({
          message: "Internal server error",
          error: true,
          status: 500,
        });
      }
    },
    
    post: async (req, res) => {
      try {
        const { author, title, date, publisher, isbn, doi, country, institution } = req.body;

        if (!author || !title || !date || !publisher || !country || !institution) {
          return res.status(400).send({
            message: "Missing required fields",
            error: true,
            status: 400,
          });
        }

        const query = `
          INSERT INTO publications (author, title, date, publisher, isbn, doi, country, institution)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING *`;

        const values = [author, title, date, publisher, isbn, doi, country, institution];

        const result = await client.query(query, values);

        res.status(201).send(result.rows[0]);
      } catch (error) {
        console.error(error.message);
        res.status(500).send({
          message: "Internal server error",
          error: true,
          status: 500,
        });
      }
    },
    put: async (req, res) => {
      try {
        const keys = ['author', 'title', 'date', 'publisher', 'isbn', 'doi', 'country', 'institution'];
        const queryValues = [];

        keys.forEach((key) => {
          if (req.body[key]) {
            queryValues.push(`${key} = '${req.body[key]}'`);
          }
        });

        if (queryValues.length === 0 || !req.body.id ) {
          res.status(400).send({
            message: "Missing required fields",
            error: true,
            status: 400,
          });
          return;
        }

        const query = `UPDATE publications SET ${queryValues.join(', ')} WHERE publication_id = ${req.body.id} RETURNING *`;

        const result = await client.query(query);
        res.status(200).send(result.rows[0]);
      } catch (error) {
        console.error(error.message);
        res.status(500).send({
          message: "Internal server error",
          error: true,
          status: 500,
        });
      }
    },

    del: async (req, res) => {
      try {
        const { id } = req.query; 
    
        if (!id) {
          return res.status(400).send({
            message: "Missing publication ID",
            error: true,
            status: 400,
          });
        }
    
        const query = `DELETE FROM publications WHERE publication_id = $1`;
        const result = await client.query(query, [id]);
    
        if (result.rowCount === 0) {
          return res.status(404).send({
            message: "Publication not found",
            error: true,
            status: 404,
          });
        }
    
        res.status(200).send({ message: "Publication deleted successfully" });
      } catch (error) {
        console.error(error.message);
        res.status(500).send({
          message: "Internal server error",
          error: true,
          status: 500,
        });
      }
    },    
  };
};
