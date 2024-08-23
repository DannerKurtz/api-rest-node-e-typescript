import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cidades - GetAll", () => {
  it("Busca de todos realizada com sucesso", async () => {
    const create = await testServer.post("/cidades").send({
      nome: "São Paulo",
    });

    const result = await testServer.get("/cidades?page=1&limit=10&filter=");

    expect(result.statusCode).toEqual(StatusCodes.OK);
  });
});
