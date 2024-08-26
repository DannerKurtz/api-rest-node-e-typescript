import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Pessoas - Create", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "create-teste@pessoas.com";
    await testServer
      .post("/cadastrar")
      .send({ nome: "teste", email, senha: "123456" });
    const signInRes = await testServer
      .post("/entrar")
      .send({ email, senha: "123456" });

    accessToken = signInRes.body.token;
  });
  it("Cria registro", async () => {
    const res1 = await testServer
      .post("/pessoas")
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: "teste",
        email: "email@teste.com",
        cidadeId: "1",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });
});
