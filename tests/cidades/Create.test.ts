import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";
import { string } from "yup";

describe("Cidades - Create", () => {
  it("Cria registro", async () => {
    const res1 = await testServer.post("/cidades").send({
      nome: "Caxias",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });

  it("Tenta criar um registro com 2 caracteres", async () => {
    const res1 = await testServer.post("/cidades").send({
      nome: "Cs",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errorsResult.body.nome");
  });
});
