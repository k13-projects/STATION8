import { describe, expect, it } from "vitest";
import { clientEnv } from "./env";

describe("env", () => {
  it("parses client env without required vars during P0", () => {
    expect(clientEnv).toBeDefined();
  });
});
