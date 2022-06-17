const server = require("./src/app.js");
const { conn, Pokemon, Type } = require("./src/db.js");
const axios = require("axios").default;

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
    server.listen(process.env.PORT || 5000, async () => {
        // console.log("Servidor levantado en puerto 3001"); // eslint-disable-line no-console
        let types = await Type.findAll();
        if (types.length === 0) {
            await axios
                .get("https://pokeapi.co/api/v2/type")
                .then((response) => {
                    response.data.results.forEach((el) =>
                        Type.create({
                            name: el.name,
                        })
                    );
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    });
});
