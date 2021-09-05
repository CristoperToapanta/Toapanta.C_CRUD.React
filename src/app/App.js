import React, {Component} from 'react';

class App extends Component {

    constructor(){

        super();

        this.state = {

                      _id:'',            
                      nombre_usuario: '',
                      cedula_usuario: '',
                      telefono_usuario: '',
                      mail_usuario: '',

                      usuarios: [],

                    };

        this.crearUsuario = this.crearUsuario.bind(this); 
        this.handleChange = this.handleChange.bind(this);
        
    }

    crearUsuario(e){

        if(this.state._id){

            fetch(`/api/users/${this.state._id}`, {

                method: 'PUT',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({
                    html: "Valor Actualizado"
                });
                this.setState({
                    _id: '',
                    nombre_usuario: '',
                    cedula_usuario: '',
                    telefono_usuario: '',
                    mail_usuario: ''
                });
                this.fetchUsers();
            })

        }
        else{

            fetch('/api/users', {

                method: 'POST',
                body: JSON.stringify(this.state),

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({
                    html: "Usuario Creado"
                });
                this.setState({
                    nombre_usuario: '',
                    cedula_usuario: '',
                    telefono_usuario: '',
                    mail_usuario: ''
                });
                this.fetchUsers();
            })
            .catch(err => console.error(err));

        }

        e.preventDefault();

    }

     componentDidMount(){

        this.fetchUsers();

    }

    fetchUsers() {

        fetch('/api/users')
        .then(res => res.json())
        .then(data => {
            this.setState({
                usuarios: data
            });
            console.log(this.state.usuarios);
        });

    }

    eliminarUsuario(id){

        if(confirm('Desea eliminar el dato?')){
            fetch(`/api/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({
                    html: "Usuario Eliminado"
                });
                this.obtenerUsuarios();
            });
        }

    }

    editarUsuario(id){

        fetch(`/api/users/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({
                _id: data._id,
                nombre_usuario: data.nombre_usuario,
                cedula_usuario: data.cedula_usuario,
                telefono_usuario: data.telefono_usuario,
                mail_usuario: data.mail_usuario
            });
        });

    }

    handleChange(e){

        const {name, value} = e.target;

        this.setState({
            [name]: value
        });

    }

    render(){

        return(

            <div>
                
                {/************************************/}
                <nav className = "light-blue darken-4">
                    <div className = "container">
                        <a className = "brand-logo"
                           href = "/">
                               Gestion de Usuarios
                        </a>
                    </div>
                </nav>
                {/************************************/}

                {/************************************/}
                <div className = "container">
                    <div className = "row">
                        <div className = "col s5">
                            <div className = "card">
                                <div className = "card-content">

                                    <form onSubmit = {this.crearUsuario}>
                                        <div className = "row">

                                            <div className = "input-field col s12">
                                                <input name = "nombre_usuario"
                                                       onChange = {this.handleChange}
                                                       type = "text"
                                                       value = {this.state.nombre_usuario}
                                                       placeholder = "Usuario"/>
                                            </div>
                                            <div className = "input-field col s12">
                                                <input name = "cedula_usuario"
                                                       onChange = {this.handleChange}
                                                       type = "text"
                                                       value = {this.state.cedula_usuario}
                                                       placeholder = "Identificacion"/>
                                            </div>
                                            <div className = "input-field col s12">
                                                <input name = "telefono_usuario"
                                                       onChange = {this.handleChange}
                                                       type = "text"
                                                       value = {this.state.telefono_usuario}
                                                       placeholder = "Contacto"/>
                                            </div>
                                            <div className = "input-field col s12">
                                                <input name = "mail_usuario"
                                                       onChange = {this.handleChange}
                                                       type = "text"
                                                       value = {this.state.mail_usuario}
                                                       placeholder = "Correo Electronico"/>
                                            </div>
                                           
                                        </div>

                                        <center>
                                            <button type = "submit"
                                                    className = "btn light-blue darken-4"> 
                                                    Guardar 
                                            </button>
                                        </center>

                                    </form>

                                </div>
                            </div>
                        </div>

                        <div className = "col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th> Nombre </th>
                                        <th> Identificacion</th>
                                        <th> Contacto </th>
                                        <th> Correo </th>
                                        <th> Editar </th>
                                        <th> Eliminar </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.usuarios.map(user => {
                                            return (
                                                <tr key={user._id}>

                                                    <td>{user.nombre_usuario}</td>
                                                    <td>{user.cedula_usuario}</td>
                                                    <td>{user.telefono_usuario}</td>    
                                                    <td>{user.mail_usuario}</td>

                                                    <td>
                                                        <button className = "btn light-blue darken-4"
                                                                onClick = {() => this.editarUsuario(user._id)}>
                                                            <i className = "material-icons">
                                                                edit
                                                            </i>
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button className = "btn light-blue darken-4"
                                                                onClick = {() => this.eliminarUsuario(user._id)}>
                                                            <i className = "material-icons">
                                                                delete
                                                            </i>
                                                        </button>
                                                    </td>

                                                </tr>
                                            )
                                        }) 
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
                {/************************************/}

            </div>

        )

    }

}

export default App;