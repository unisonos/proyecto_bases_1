module.exports = function (client) {
  return {
    get: async (req, res) => {
      try {
        const query = `
        SELECT 
          country.country_id, 
          country.country_name, 
          country.iso
        FROM countries AS country`;

        const result = await client.query(query);
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
  };
};