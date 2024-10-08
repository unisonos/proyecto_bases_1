module.exports = function (client) {
  return {
    get: async (req, res) => {
      try {
        const query = `
        SELECT 
          author.author_id, 
          author.first_name,
          author.last_name_1,
          author.last_name_2
        FROM authors AS author`;

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
