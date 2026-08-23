/**
 * Mock credentials for login simulation (boilerplate only).
 * Toggle `ENABLE_MOCK_LOGIN` to bypass real API.
 */
export const MOCK_LOGIN = {
  ENABLE_MOCK: true,
  VALID_EMAIL: "admin@example.com",
  VALID_PASSWORD: "password123",
  MOCK_TOKEN: "mock_bearer_token_123",
  MOCK_ROLE: "admin",
} as const;
