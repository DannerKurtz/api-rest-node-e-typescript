import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Usuarios - Cadastrar", () => {
  it("Cria cadastro - sucesso", async () => {
    const res0 = await testServer.post("/cadastrar").send({
      nome: "teste",
      email: "email@teste.com",
      senha: "123456",
    });

    expect(res0.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res0.body).toEqual("number");
  });
  it("Cria cadastro - erro", async () => {
    const res1 = await testServer.post("/cadastrar").send({
      nome: "teste 2",
      email: "email@teste.com",
      senha: "12456",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);

    const res2 = await testServer.post("/cadastrar").send({
      nome: "teste 3",
      email: "email teste.com",
      senha: "123456",
    });

    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);

    const res3 = await testServer.post("/cadastrar").send({
      nome: "teste 4",
      email: "email@teste.com",
      senha: "123456",
    });

    expect(res3.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});
