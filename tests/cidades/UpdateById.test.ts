import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - UpdateById", () => {
  it("Atualiza registro", async () => {
    const result = await testServer.put("/cidades/1").send({
      nome: "Caxias",
    });

    expect(result.statusCode).toEqual(StatusCodes.OK);
  });
  it("Tenta atualizar um registro com 2 caracteres", async () => {
    const result = await testServer.put("/cidades/1").send({
      nome: "Cs",
    });

    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errorsResult.body.nome");
  });
  it("Formato do id inválido", async () => {
    const result = await testServer.put("/cidades/stringNoParâmetro");

    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errorsResult.params.id");
  });
  it("Sem nenhum parâmetro informado", async () => {
    const result = await testServer.put("/cidades/");

    expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
  });
});
