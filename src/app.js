const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const respository = {
    id: uuid(),
    title,
    url,
    techs, 
    likes: 0
  }

  repositories.push(respository);

  return response.json(repositories);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const findRepositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (findRepositoryIndex < 0) {
    return response.status(400).json({error: "Repository does not exists."})
  }

  const newRepository = {
    id,
    title, 
    url, 
    techs,
    likes: repositories[findRepositoryIndex].likes
  }

  repositories[findRepositoryIndex] = newRepository;

  return response.json(repositories);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const findRepositoryIndex = repositories.findIndex(respository => respository.id === id);

  if (findRepositoryIndex >= 0) {
    
    repositories.splice(findRepositoryIndex, 1)
  } else {
    return response.status(400).json({error: "Repository does not exists!"});
  }

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const findRespositoryIndex = repositories.findIndex(repository => repository.id === id)

  if(findRespositoryIndex < 0) {
    return response.status(400).json({error: "Repository does not exist"});
  }

  repositories[findRespositoryIndex].likes += 1;

  return response.json(repositories[findRespositoryIndex]);
});

module.exports = app;
