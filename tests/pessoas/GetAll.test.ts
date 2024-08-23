import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Pessoas - GetAll", () => {
  it("Busca de todos realizada com sucesso", async () => {
    const create = await testServer.post("/pessoas").send({
      nomeCompleto: "teste",
      email: "email@teste.com",
      cidadeId: "1",
    });

    const result = await testServer.get("/cidades?page=1&limit=10&filter=");

    expect(result.statusCode).toEqual(StatusCodes.OK);
  });
});
