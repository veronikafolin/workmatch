# Workmatch

Project for Web Services and Applications' course (University of Bologna)

<img src="frontend/src/assets/logo.jpeg" alt="logo" width="200"/>

## Setup and Usage

1. Download the repository locally.

3. Install frontend, backend and project dependencies from respective directories, with the command:
```sh
npm install
```

4. Creates a docker container with an instance of mongo populated with custom data.

To set up, from database directory:

```powershell
docker compose up 
```

To unset up:

```powershell
docker compose down
docker volume rm $(docker volume ls -q)
```

5. Start server with the command:

```powershell
node index.js
```

7. Compile from frontend directory with the next command and follow the generated url.

```sh
npm run dev
```

To stop: `Ctrl + C`

## Author

Veronika Folin - veronika.folin@studio.unibo.it