# 🧪 Playwright Test Automation

Este projeto contém testes automatizados utilizando o [Playwright](https://playwright.dev/) para validação de **APIs** e **UI**.  
Os testes são executados automaticamente no GitHub Actions a cada `push` ou `pull request` na branch `main`.

---

## 📁 Estrutura do Projeto

```bash
.
├── tests
│   ├── api
│   │   └── reqres.spec.ts       # Testes de API (Reqres)
│   └── ui
│       └── swaglabs.spec.ts     # Testes de UI (Swag Labs)
├── playwright.config.ts
├── package.json
├── .github
│   └── workflows
│       └── playwright.yml       # Pipeline de CI
└── README.md
```

---

## 🚀 Instalação e Execução Local

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

2. Instale as dependências:

```bash
npm ci
```

3. Instale os browsers do Playwright:

```bash
npx playwright install --with-deps
```

4. Execute os testes de API:

```bash
npm run test:api
```

5. Execute os testes de UI:

```bash
npm run test:ui
```

---

## 🛠 Scripts disponíveis

```json
"scripts": {
  "test:api": "npx playwright test tests/api",
  "test:ui": "npx playwright test tests/ui",
  "test": "npx playwright test"
}
```

---

## ✅ CI com GitHub Actions

O projeto está configurado com um workflow que:

- Instala as dependências e browsers do Playwright
- Executa os testes de API e UI
- Faz upload do relatório de falha, se houver

### 🧩 Arquivo: `.github/workflows/playwright.yml`

```yml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

---

## 📊 Relatórios

Após os testes, os relatórios são gerados na pasta:

```
playwright-report/
```

Para abrir localmente:

```bash
npx playwright show-report
```

---

## 🧰 Tecnologias

- [Playwright](https://playwright.dev/)
- Node.js
- GitHub Actions

## 📝 Licença

Este projeto está sob a licença MIT. Sinta-se livre para utilizar e contribuir.
