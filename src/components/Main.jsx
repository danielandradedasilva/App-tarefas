import  { Component }  from "react";
import Form from "./Form/Form.jsx";
import Tarefas from "./Tarefas/Tarefas.jsx";

//Style
import "./Main.css";


 class Main extends Component{
   state = {
            novaTarefa:'',
            tarefas:[],
            index: -1
   };

     //Persistindo as informações no meu front
   componentDidMount(){
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));
    
    if(!tarefas) return;
    
    this.setState({tarefas});
   }
    //Salvando a informações em localStorage
   componentDidUpdate(prevProps, prevState){
    const {tarefas} = this.state;

    if(tarefas === prevState.tarefas) return;

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
   }

   handleSubmit = (e) =>{
    e.preventDefault();
    const {tarefas, index} = this.state;
    let {novaTarefa} = this.state;
    novaTarefa = novaTarefa.trim();

    if(novaTarefa === ''){
      alert('Insira uma nova tarefa');
      return;
    }

    if(tarefas.indexOf(novaTarefa) !== -1){
        alert('A tarefa já existe');
        return;
    } 

    const novasTarefas = [...tarefas];

    if(index === -1){
        this.setState({
            tarefas:[...novasTarefas, novaTarefa],
            novaTarefa:'', 
        });
    } else{
        novasTarefas[index] = novaTarefa;

        this.setState({
            tarefas:[...novasTarefas],
            novaTarefa:'',
            index:-1
        })
    }
    
   }

   handleChange = (e) =>{
        this.setState({
            //pegando o valor do input
            novaTarefa:e.target.value
        });
    }

    handleDelete = (id) =>{
        const tarefas = this.state.tarefas;
        tarefas.splice(id,1);
        this.setState({tarefas:tarefas});
        //removendo do localStorage
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    handleEdit = (e, index) =>{
        const tarefas = this.state.tarefas;
        this.setState({
            index,
            novaTarefa:tarefas[index]
        })
    }

    render(){

        const {novaTarefa, tarefas} = this.state;
        return(
                <div className="main">
                    <h1>Lista de Tarefas</h1>
                    
                    <Form
                        handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange}
                        novaTarefa={novaTarefa}
                    /> 

                    <Tarefas 
                        tarefas={tarefas}
                        handleEdit={this.handleEdit}
                        handleDelete={this.handleDelete}
                    />
                </div>
        )
    }
}

export default Main;