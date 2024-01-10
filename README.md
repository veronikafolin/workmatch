# WorkMatch

Project for Web Services and Applications' course (University of Bologna).

<img src="frontend/src/assets/logo.jpeg" alt="logo" width="200"/>

## Setup and Usage

1. Download the repository locally.

```powershell
git clone https://github.com/veronikafolin/workmatch.git
```

2. Install the frontend, backend, and project dependencies from the respective directories with the following command:

```powershell
npm install
```

3. Create a docker container with an instance of mongo populated with custom data. To set up, from database directory:

```powershell
docker compose up 
```

5. To unset up the docker container:

```powershell
docker compose down
docker volume rm $(docker volume ls -q)
```

6. Start the server with the command:

```powershell
node index.js
```

7. Run the following command from the frontend directory and then navigate to the provided URL that appears after the compilation.

```sh
npm run dev
```

8. To stop the previous command: `Ctrl + C`

## Author

Veronika Folin - veronika.folin@studio.unibo.it