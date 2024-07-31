import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - Create", () => {
  it("Cria registro", async () => {
    const result = await testServer.post("/cidades").send({
      nome: "Caxias",
    });

    expect(result.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof result.body).toEqual("number");
  });

  it("Tenta criar um registro com 2 caracteres", async () => {
    const result = await testServer.post("/cidades").send({
      nome: "Cs",
    });

    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errorsResult.body.nome");
  });
});
