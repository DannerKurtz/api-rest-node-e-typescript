import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cidades - Delete", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "delete-teste@cidades.com";
    await testServer
      .post("/cadastrar")
      .send({ nome: "teste", email, senha: "123456" });
    const signInRes = await testServer
      .post("/entrar")
      .send({ email, senha: "123456" });

    accessToken = signInRes.body.token;
  });
  it("Deletando", async () => {
    const create = await testServer
      .post("/cidades")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: "São Paulo",
      });

    const result = await testServer
      .delete("/cidades/1")
      .set({ authorization: `Bearer ${accessToken}` });

    expect(result.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
});
