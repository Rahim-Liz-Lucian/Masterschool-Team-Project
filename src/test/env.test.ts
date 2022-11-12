import { describe, expect, test } from "vitest";

describe("env.test", () => {
    test("read from env file", () => {
        const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
        expect(projectId).toBe("masterschool-team-project");
    });
});