const express = require("express");
const cors = require("cors");

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
    return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title , url , techs} = request.body;

  const repositorie = {
     id: uuid(),
     title, 
     url, 
     techs, 
     like: 0
  };

  repositories.push(repositorie);

  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
    const { id } = request.params;
    const {title, url, techs} = request.body;

    const repositoriesIndex = repositories.findIndex(repositorie => repositorie.id === id);

    if(repositoriesIndex < 0){
      return response.status(400).json({error: 'project not found.'});
    }

    const repositorie = {
      id,
      title,
      url,
      techs,
      like: repositories[repositoriesIndex].like
    };

    repositories[repositoriesIndex] = repositorie;

    return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
    const { id } = request.params;
    const repositoriesIndex = repositories.findIndex(repositorie => repositorie.id == id);

    if(repositoriesIndex === -1) {
      return response.status(400).json({error: 'project not found.'});
    }

    repositories.splice(repositoriesIndex, 1);

    return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;


  const repositoriesIndex = repositories.findIndex(repositorie => repositorie.id == id);

  if(repositoriesIndex === -1){
    return response.status(400).json({error: 'project not found.'});
  }

  repositories[repositoriesIndex].like++;

  return response.json(repositories[repositoriesIndex]);

});

module.exports = app;
