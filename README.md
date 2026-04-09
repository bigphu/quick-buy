# quick-buy
Semester 251 major assignment of Database system course at HCMUT

## Run With Docker

### Prerequisites
- Docker Desktop (or Docker Engine + Compose)

### Steps
1. Create a Docker env file from the template:

```powershell
Copy-Item .env.docker.example .env
```

```bash
cp .env.docker.example .env
```

2. Start all services:

```bash
docker compose up --build
```

3. Open the app:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8080/api`

### Services
- `db`: MySQL 8.0 with init script from `QuickBuy-Backend/merged-db.sql`
- `backend`: Node/Express API on port `8080`
- `frontend`: Vite app built and served by Nginx on port `3000`

### Backend Env Config
If you run backend outside Docker, create backend env file from template:

```powershell
Copy-Item QuickBuy-Backend/.env.example QuickBuy-Backend/.env
```

```bash
cp QuickBuy-Backend/.env.example QuickBuy-Backend/.env
```

### Useful Commands
- Stop and remove containers:

```bash
docker compose down
```

- Stop and remove containers + DB volume:

```bash
docker compose down -v
```

### Troubleshooting
- If backend logs show `Table 'QuickBuyDB....' doesn't exist`, MySQL init likely failed or the volume has old state.
- MySQL executes files in `/docker-entrypoint-initdb.d` only on first initialization of the data volume.
- Reinitialize from SQL script:

```bash
docker compose down -v
docker compose up --build
```
