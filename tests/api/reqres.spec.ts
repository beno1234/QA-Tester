import { test, expect, request as globalRequest } from "@playwright/test";

test("Listar usuários e validar", async () => {
  const apiContext = await globalRequest.newContext({
    extraHTTPHeaders: {
      "x-api-key": "reqres-free-v1",
    },
  });

  const response = await apiContext.get("https://reqres.in/api/users?page=2");

  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  const users = responseBody.data;

  for (const user of users) {
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("first_name");
    expect(user).toHaveProperty("last_name");
    expect(user.email).toMatch(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }
});

test("Criar um novo usuaripo com sucesso", async () => {
  const apiContext = await globalRequest.newContext();

  const payload = {
    name: "Joao Qa",
    job: "Tester",
  };

  const response = await apiContext.post("https://reqres.in/api/user", {
    headers: {
      "x-api-key": "reqres-free-v1",
      "Content-Type": "application/json",
    },
    data: payload,
  });

  expect(response.status()).toBe(201);

  const responseBody = await response.json();
  expect(responseBody).toHaveProperty("name", payload.name);
  expect(responseBody).toHaveProperty("job", payload.job);
  expect(responseBody).toHaveProperty("id");
  expect(responseBody).toHaveProperty("createdAt");
});

test("Buscar um usuaruio especifico com sucesso", async () => {
  const apiContext = await globalRequest.newContext({
    extraHTTPHeaders: {
      "x-api-key": "reqres-free-v1",
    },
  });

  const response = await apiContext.get("https://reqres.in/api/users/2");
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.data).toHaveProperty("id", 2);
});

test("Atualizar um usuário com sucesso", async () => {
  const apiContext = await globalRequest.newContext();

  const payload = {
    name: "Joao QA Atualizado",
    job: "QA Sênior",
  };

  const response = await apiContext.put("https://reqres.in/api/users/2", {
    headers: {
      "x-api-key": "reqres-free-v1",
      "Content-Type": "application/json",
    },
    data: payload,
  });

  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody).toHaveProperty("name", payload.name);
  expect(responseBody).toHaveProperty("job", payload.job);
  expect(responseBody).toHaveProperty("updatedAt");
});

test("Deletar um usuário com sucesso", async () => {
  const apiContext = await globalRequest.newContext({
    extraHTTPHeaders: {
      "x-api-key": "reqres-free-v1",
    },
  });

  const response = await apiContext.delete("https://reqres.in/api/users/2");
  expect(response.status()).toBe(204);
});

test("Tentar deletar um usuário inexistente (retorna 204)", async () => {
  const apiContext = await globalRequest.newContext({
    extraHTTPHeaders: {
      "x-api-key": "reqres-free-v1",
    },
  });

  const response = await apiContext.delete("https://reqres.in/api/users/99999");
  expect(response.status()).toBe(204);
});

test("Simular falha por timeout", async () => {
  const context = await globalRequest.newContext();

  let errorCaught = false;

  try {
    await context.get("http://10.255.255.1", {
      timeout: 1000,
    });
  } catch (error: any) {
    errorCaught = true;
    expect(error.message).toContain("timed out");
  }

  expect(errorCaught).toBe(true);
});
