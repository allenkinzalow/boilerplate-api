import { getBearerToken } from "../headers.utils";

describe("header.utils", () => {
  test("getBearerToken valid", () => {
    expect(
      getBearerToken({
        //@ts-ignore
        get: (data: string): string => {
          return "Bearer test";
        },
      })
    ).toEqual("test");
  });
  test("getBearerToken invalid", () => {
    expect(
      getBearerToken({
        //@ts-ignore
        get: (data: string): string => {
          return "Bearertest";
        },
      })
    ).toEqual(undefined);
  });
});
