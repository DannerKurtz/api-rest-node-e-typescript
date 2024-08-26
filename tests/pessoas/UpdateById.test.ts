import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Pessoas - UpdateById", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "delete-teste@pessoas.com";
    await testServer
      .post("/cadastrar")
      .send({ nome: "teste", email, senha: "123456" });
    const signInRes = await testServer
      .post("/entrar")
      .send({ email, senha: "123456" });

    accessToken = signInRes.body.token;
  });
  it("Atualiza registro", async () => {
    const create = await testServer
      .post("/pessoas")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: "teste",
        email: "email@teste.com",
        cidadeId: "1",
      });

    const result = await testServer
      .put("/pessoas/1")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: "teste 2",
        email: "email@teste.com",
        cidadeId: "1",
      });

    expect(result.statusCode).toEqual(StatusCodes.OK);
  });
});
