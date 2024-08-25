import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Pessoas - Create", () => {
  it("Cria registro", async () => {
    const res1 = await testServer.post("/pessoas").send({
      nomeCompleto: "teste",
      email: "email@teste.com",
      cidadeId: "1",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });
});
