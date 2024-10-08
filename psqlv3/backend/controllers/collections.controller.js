module.exports = function (client) {
  return {
      getCollections: async (req, res) => {
          try {
              const query = "SELECT collection_id, collection_name, description FROM collections";
              const result = await client.query(query);

              // Verificar los resultados en consola
              console.log(result.rows); // Esto debería mostrar las colecciones recuperadas
              
              if (result.rows.length === 0) {
                  return res.status(200).send({ message: "No collections found", data: [] });
              }

              res.status(200).send(result.rows);
          } catch (error) {
              console.error("Error retrieving collections: ", error.message);
              res.status(500).send({
                  message: "Internal server error",
                  error: true,
                  status: 500,
              });
          }
      },

      getPublicationsByCollection: async (req, res) => {
        const { collection_id } = req.params;
  
        try {
          const query = `
            SELECT p.publication_id, p.title, p.publisher, p.date, p.isbn, p.doi
            FROM publications p
            INNER JOIN collections_publications cp ON p.publication_id = cp.publication
            INNER JOIN collections c ON cp.collection = c.collection_id
            WHERE c.collection_id = $1
          `;
          const result = await client.query(query, [collection_id]);
  
          // Verificar si hay publicaciones
          if (result.rows.length === 0) {
            return res.status(404).send({ message: "No publications found for this collection" });
          }
  
          res.status(200).send(result.rows);
        } catch (error) {
          console.error("Error retrieving publications: ", error.message);
          res.status(500).send({
            message: "Internal server error",
            error: true,
            status: 500,
          });
        }
      },
    };
  };