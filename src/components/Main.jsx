import  { Component }  from "react";
import './Main.css';


 class Main extends Component{
   state = {
            novaTarefa:''
   };

   handleChange = (e) =>{
        this.setState({
            novaTarefa:e.target.value
        });
    }

    render(){

        return(
                <div className="main">
                    <h1>Lista de Tarefas</h1>
                    
                    <form>
                    <input  type="text" onChange={this.handleChange}/>
                    <button>Listar</button>
                    </form>

                </div>
        )
    }
}

export default Main;