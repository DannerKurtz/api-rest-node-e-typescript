import knex from "knex";
import { Knex } from "./server/database/knex";
import { server } from "./server/Server";

const startServer = () => {
  server.listen(process.env.PORT || 3232, () => {
    console.log(`servidor on! PORT: ${process.env.PORT || 3232}`);
  });
};

if (process.env.IS_LOCALHOST !== "true") {
  Knex.migrate
    .latest()
    .then(() => {
      Knex.seed
        .run()
        .then(() => {
          startServer();
        })
        .catch(console.log);
    })
    .catch(console.log);
} else {
  startServer();
}
