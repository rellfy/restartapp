const express = require("express");
const app = express();
const spawn = require("child_process").spawn;

const getTimeString = () => `[${new Date().toLocaleString()}]`;

app.use((request, response, next) => {
  let token = request.get("authorization");
  if (token.startsWith("Bearer "))
    token = token.substring(7);
  if (token != process.env.TOKEN)
    return response.status(401).send({ error: "missing valid authorization token" });
  next();
});

app.post("/restart/:container", (request, response) => {
  if (!(request.params?.container?.length > 0))
    return response.status(400).send({ error: "missing container name" });
  const docker = spawn("docker", ["container", "restart", request.params.container]);
  console.log(
    `${getTimeString()} [${request.params.container}] restart requested`
  );
  docker.on("close", (code) => {
    console.log(
      `${getTimeString()} [${request.params.container}] restart request exited with code ${code}`
    );
    return response.status(200).send({ code });
  });
});

app.listen(process.env.PORT);
