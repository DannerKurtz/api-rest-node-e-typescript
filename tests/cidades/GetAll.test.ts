import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cidades - GetAll", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "getAll-teste@cidades.com";
    await testServer
      .post("/cadastrar")
      .send({ nome: "teste", email, senha: "123456" });
    const signInRes = await testServer
      .post("/entrar")
      .send({ email, senha: "123456" });

    accessToken = signInRes.body.token;
  });
  it("Busca de todos realizada com sucesso", async () => {
    const create = await testServer
      .post("/cidades")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: "São Paulo",
      });

    const result = await testServer
      .get("/cidades?page=1&limit=10&filter=")
      .set({ authorization: `Bearer ${accessToken}` });

    expect(result.statusCode).toEqual(StatusCodes.OK);
  });
});
