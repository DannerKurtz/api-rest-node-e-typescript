import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cidades - GetById", () => {
  it("Busca realizada com sucesso", async () => {
    const create = await testServer.post("/cidades").send({
      nome: "São Paulo",
    });

    const result = await testServer.get("/cidades/1");

    expect(result.statusCode).toEqual(StatusCodes.OK);
    expect(typeof result.body).toEqual("object");
  });
});
