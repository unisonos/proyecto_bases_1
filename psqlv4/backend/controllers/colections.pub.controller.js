
module.exports = function (client) {
return {
    getPublicationsByCollection: async (req, res) => {
        try {
        const { collection_id } = req.params;
    
        if (!collection_id) {
            return res.status(400).send({
            message: "Missing collection ID",
            error: true,
            status: 400,
            });
        }
    
        const query = `
            SELECT pub.publication_id, pub.title, pub.date, pub.publisher, pub.isbn, pub.doi
            FROM publications AS pub
            INNER JOIN collections_publications AS cp ON pub.publication_id = cp.publication
            INNER JOIN collections AS c ON cp.collection = c.collection_id
            WHERE c.collection_id = $1
        `;
    
        const result = await client.query(query, [collection_id]);
    
        if (result.rowCount === 0) {
            return res.status(404).send({
            message: "No publications found for the specified collection",
            error: true,
            status: 404,
            });
        }
    
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
    }
    };  