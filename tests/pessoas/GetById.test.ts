import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Pessoas - GetById", () => {
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
  it("Busca realizada com sucesso", async () => {
    const create = await testServer
      .post("/pessoas")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: "teste",
        email: "email@teste.com",
        cidadeId: "1",
      });

    const result = await testServer
      .get("/pessoas/1")
      .set({ authorization: `Bearer ${accessToken}` });

    expect(result.statusCode).toEqual(StatusCodes.OK);
    expect(typeof result.body).toEqual("object");
  });
});
