import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Pessoas - GetById", () => {
  it("Busca realizada com sucesso", async () => {
    const create = await testServer.post("/pessoas").send({
      nomeCompleto: "teste",
      email: "email@teste.com",
      cidadeId: "1",
    });

    const result = await testServer.get("/pessoas/1");

    expect(result.statusCode).toEqual(StatusCodes.OK);
    expect(typeof result.body).toEqual("object");
  });
});
