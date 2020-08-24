import React, {useState, useEffect} from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositorie, setRepositorie, deleteRepositorie] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositorie(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Projeto ${Date.now()}`,
      url: "Klisman Ferreira",
      tech:"Javascript"
  });

    const repositories = response.data;

    setRepositorie([...repositorie, repositories]);
  }
  
  /*return (
    <>

        <ul>
            {repositorie.map(repositories => <li key={repositorie.id}>{repositories.title}</li>)}
        </ul>
        
        <button type="button" onClick={handleAddRepository}></button>
    </>
  );*/
  
  /*
  app.delete("/artigo/:id", (req, res) => {
	//Apagar o registro no banco de dados MongoDB
    const artigo = Artigo.deleteOne({_id: req.params.id}, (err) => {
		//Retornar erro quando não conseguir apagar no banco de dados
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Artigo não foi apagado com sucesso!"
        });

		//Retornar mensagem de sucesso quando excluir o registro com sucesso no banco de dados
        return res.json({
            error: false,
            message: "Artigo apagado com sucesso!"
        });
    });
});

  */
  async function handleRemoveRepository(id) {
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        <li>
          Repositório 1
          
          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li>
        {repositorie.map(repositories => <li key={repositorie.id}>{repositories.title}</li>)}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
