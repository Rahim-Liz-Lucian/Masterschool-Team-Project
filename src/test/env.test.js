import { describe, expect, test } from "vitest";

describe("env.test.js", () => {
    test("loading from a dotenv file", () => {
        const type = import.meta.env.VITE_PROJECT_ID;
        // NOTE this is okay to not be secret
        expect(type).toBe("masterschool-team-project");
    });
});