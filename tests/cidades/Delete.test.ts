import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cidades - Delete", () => {
  it("Deletando", async () => {
    const create = await testServer.post("/cidades").send({
      nome: "São Paulo",
    });

    const result = await testServer.delete("/cidades/1");

    expect(result.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
});
