import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";
import { number } from "yup";
import { query } from "express";

describe("Cidades - GetAll", () => {
  it("Cenário do erro da page", async () => {
    const result = await testServer.get("/cidades?page=0");

    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errorsResult.query.page");

    const url = result.request.url.split("=");
    expect(typeof Number(url[1])).toEqual("number");
  });
  it("Cenário do erro do limit", async () => {
    const result = await testServer.get("/cidades?limit=0");

    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errorsResult.query.limit");

    const url = result.request.url.split("=");
    expect(typeof Number(url[1])).toEqual("number");
  });
  it("Cenário que busca todos os itens", async () => {
    const result = await testServer.get("/cidades?page=1&limit=7&filter=");

    expect(result.statusCode).toEqual(StatusCodes.OK);
  });
});
