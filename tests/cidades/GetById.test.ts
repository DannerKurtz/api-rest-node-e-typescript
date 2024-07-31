import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - GetById", () => {
  it("Formato do id inválido", async () => {
    const result = await testServer.get("/cidades/stringNoParâmetro");

    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errorsResult.params.id");
  });

  it("Busca realizada com sucesso", async () => {
    const result = await testServer.get("/cidades/1");

    expect(result.statusCode).toEqual(StatusCodes.OK);
  });
});
