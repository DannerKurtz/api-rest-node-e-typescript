import { number } from "yup";
import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cidades - Delete", () => {
  it("Formato do id inválido", async () => {
    const result = await testServer.delete("/cidades/stringNoParâmetro");

    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errorsResult.params.id");
  });
  it("Sem nenhum parâmetro informado", async () => {
    const result = await testServer.delete("/cidades/");

    expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
  });
  it("Deletado com sucesso", async () => {
    const result = await testServer.delete("/cidades/1");

    expect(result.statusCode).toEqual(StatusCodes.OK);
  });
});
