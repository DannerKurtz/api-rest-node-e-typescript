import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Pessoas - UpdateById", () => {
  it("Atualiza registro", async () => {
    const create = await testServer.post("/pessoas").send({
      nomeCompleto: "teste",
      email: "email@teste.com",
      cidadeId: "1",
    });

    const result = await testServer.put("/pessoas/1").send({
      nomeCompleto: "teste 2",
      email: "email@teste.com",
      cidadeId: "1",
    });

    expect(result.statusCode).toEqual(StatusCodes.OK);
  });
});
