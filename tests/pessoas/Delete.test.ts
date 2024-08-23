import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Pessoas - Delete", () => {
  it("Deletando", async () => {
    const create = await testServer.post("/pessoas").send({
      nomeCompleto: "teste",
      email: "email@teste.com",
      cidadeId: "1",
    });

    const result = await testServer.delete("/pessoas/1");

    expect(result.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
});
