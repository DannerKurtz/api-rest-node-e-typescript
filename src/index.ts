import { server } from "./server/Server";

server.listen(process.env.PORT || 3232, () => {
    console.log(`servidor on! PORT: ${process.env.PORT || 3232}`);
});