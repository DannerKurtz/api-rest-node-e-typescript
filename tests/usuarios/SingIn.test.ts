import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Usuarios - Entrar com sucesso", () => {
  it("Usuario - Entrar", async () => {
    const res1 = await testServer.post("/cadastrar").send({
      nome: "teste",
      email: "email@teste.com",
      senha: "123456",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");

    const result = await testServer.post("/entrar").send({
      email: "email@teste.com",
      senha: "123456",
    });

    expect(result.statusCode).toEqual(StatusCodes.ACCEPTED);
    expect(typeof result.body).toEqual("object");
  });

  it("Usuario - Entrar com erro", async () => {
    const res1 = await testServer.post("/cadastrar").send({
      nome: "teste",
      email: "email3232@teste.com",
      senha: "123456",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");

    const result1 = await testServer.post("/entrar").send({
      email: "email2@teste.com",
      senha: "123456",
    });

    expect(result1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);

    const result2 = await testServer.post("/entrar").send({
      email: "email@teste.com",
      senha: "12345625",
    });

    expect(result2.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
  });
});
