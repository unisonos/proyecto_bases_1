module.exports = function(client) {
  return {
    getSpecies: async (req, res) => {
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
          JOIN species_publications AS sp ON sp.publication_id = pub.publication_id
          JOIN species AS spec ON sp.species_id = spec.species_id
        `;

        const queryParams = [];
        let queryFilter = "";

        // Verifica si hay un parámetro 'species_name'
        if (req.query.species_name && req.query.species_name.length > 0) {
          queryFilter = " WHERE spec.species_name ILIKE $1";  // Usamos ILIKE para hacer la búsqueda insensible a mayúsculas y minúsculas
          queryParams.push(`%${req.query.species_name}%`);
        }

        query += queryFilter + " ORDER BY pub.publication_id, pub.title DESC";

        const result = await client.query(query, queryParams);
        res.status(200).send(result.rows);
      } catch (error) {
        console.error("Error retrieving publications: ", error.message);
        res.status(500).send({
          message: "Internal server error",
          error: true,
          status: 500,
        });
      }
    }
  };
};
