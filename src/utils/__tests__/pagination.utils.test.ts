import { Administrator } from "../../database";
import { paginateRequest } from "../pagination.utils";

describe("pagination utils", () => {
  test("paginateRequest with specified params", () => {
    const paginatedRequest = paginateRequest<Administrator>({
      pagination: {
        page: 2,
        amountPerPage: 30,
      },
    });
    expect(paginatedRequest).toEqual({
      offset: 30,
      limit: 30,
    });
  });

  test("paginateRequest with default params", () => {
    const paginatedRequest = paginateRequest<Administrator>({});
    expect(paginatedRequest).toEqual({
      offset: 0,
      limit: 25,
    });
  });
});
