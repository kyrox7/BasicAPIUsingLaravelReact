import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';




class Movie extends Component
{
    state = {
        movies: [],
        loading: true,
    }
    async componentDidMount(){
         const res = await axios.get('http://127.0.0.1:8000/api/movies');
         if(res.data.status === 200){
             this.setState({
                movies:res.data.movie,
                loading: false,
             });
         }

    }

    deleteStudent = async (e, id) => {
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";
        const res = await axios.delete(`http://127.0.0.1:8000/api/movies/${id}`);
        if(res.data.status === 200){
            thisClicked.closest("tr").remove();
            // console.log(res.data.message);
            swal({
                title: "Success",
                text: res.data.message,
                icon: "success",
                button: "Ok",
              });
        }
    }
    render(){
        var movie_HTMLTABLE = "";
        if(this.state.loading){
            movie_HTMLTABLE = <tr><td colSpan="5"><h2>Loading...</h2></td></tr>
        }else{
            movie_HTMLTABLE = 
            this.state.movies.map( (item) => {
                return(
                    <tr key = {item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.actor}</td>
                        {/* <td>
                            <Link to={`/api/movies/${item.id}/edit`} className="btn btn-success btn-sm">Edit</Link>
                        </td> */}
                        <td>
                            <button type="button" onClick={(e) => this.deleteStudent(e, item.id)} className='btn btn-danger btn-sm'>Delete</button>
                        </td>
                    </tr>
                );
            });
        }
        return(
            <div className="container">
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <div className='card-header'>
                                <h1>Overall Movies
                                    <Link to={'movies/create'} className='btn btn-primary btn-sm float-end'>Add Movies</Link>
                                </h1>
                            </div>
                            <div className='card-body'>
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Movie ID</th>
                                            <th>Movie Name</th>
                                            <th>Movie Description</th>
                                            <th>Actor</th>
                                            {/* <th>Edit</th> */}
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {movie_HTMLTABLE}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Movie;