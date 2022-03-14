import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';


class Addmovie extends Component
{
    state = {
        name:'',
        description:'',
        actor:'',
    }
    handleInput = (e) =>{
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveMovie = async (e) => {
        e.preventDefault();
        console.log(this.state);
        const res = await axios.post('http://127.0.0.1:8000/api/movies',this.state);
        if(res.data.status === 200){
            // console.log(res.data.message);
            swal({
                title: "Success",
                text: res.data.message,
                icon: "success",
                button: "Ok",
              });
            this.setState({
                name:'',
                description:'',
                actor:'',
            });
        }
    }
    render(){
        return(
            <div className="container">
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>
                                <h1>Add Movies
                                    <Link to={'/'} className='btn btn-primary btn-sm float-end'>Back</Link>
                                </h1>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={this.saveMovie}>
                                    <div className='form-group mb-3'>
                                        <label>Movie Name</label>
                                        <input type="text" name="name" onChange={this.handleInput} value={this.state.name} className="form-control"/>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Movie Description</label>
                                        <input type="text" name="description" onChange={this.handleInput} value={this.state.description} className="form-control"/>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Movie Actor</label>
                                        <select name="actor" id="actor" className='form-control' onChange={this.handleInput} value={this.state.actor}>
                                        <option value="Rajesh Hamal">Rajesh Hamal</option>
                                        <option value="Nikhil Upreti">Nikhil Upreti</option>
                                        <option value="New Actor">New Actor</option>

                                        </select>
                                        </div>
                                    <div className='form-group mb-3'>
                                        <button type="submit" className="btn btn-primary">Save Movie</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Addmovie;