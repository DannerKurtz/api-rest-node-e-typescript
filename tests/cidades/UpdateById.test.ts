import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cidades - UpdateById", () => {
  it("Atualiza registro", async () => {
    const create = await testServer.post("/cidades").send({
      nome: "São Paulo",
    });

    const result = await testServer.put("/cidades/1").send({
      nome: "Caxias",
    });

    expect(result.statusCode).toEqual(StatusCodes.OK);
  });
});
