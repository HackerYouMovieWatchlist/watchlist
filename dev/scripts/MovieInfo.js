import React from 'react';
import ReactDOM from 'react-dom';
import TopBar from './TopBar';
import Comments from './Comments'
import config from './config';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Addbutton from './Addbutton';

class MovieInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            poster_path: '',
            title: '',
            release_date: '',
            overview: '',
            genres: [],
            genreID: [],
            // ID will not render on the final page, but is needed to be passed along as props to comment - Mel
            id: '',
            user: this.props.location.state.user,
            username: this.props.location.state.username
        };
    }

    
    componentDidMount() {
        axios.get(`${config.apiURL}/movie/${this.props.match.params.id}`, {
            params: {
                api_key: config.apiKey
            }
        })
            .then(({ data }) => {
                console.log(data);
                this.setState({
                    poster_path: data.poster_path,
                    title: data.title,
                    release_date: data.release_date,
                    overview: data.overview,
                    id: data.id,
                    genres: data.genres
                });
                // Still an issue here listing all genres, moving on to comments and coming back to this - Mel

            })
    }  


    render() {
        return (
            <div>
                <TopBar 
                user={this.state.user}
                username={this.state.username}
                />
                <div><img src={`https://image.tmdb.org/t/p/w200/${this.state.poster_path}`} alt="poster"/></div>
                <h2>Title: {this.state.title}</h2>
                <h2>Release Date: {this.state.release_date}</h2>

                <Link to={{
                    
                    pathname: '/Recommend',
                    
                    state: { 
                        name: this.state.id,
                        username: this.props.location.state.username,
                        user: this.props.location.state.user }} 

                    }>
                    
                    <button>You might also like</button>
                </Link>
                <div>
                    <Addbutton movie={this.props.location.state.movie}
                    user={this.state.user} />
                    {/* <button>Play Trailer</button> */}
                </div>
                <p>Description: {this.state.overview}</p>

                <p>Genres: {this.state.genres.map( (data, i) => 
                    {
                    return (<span key={i}> {data.name} </span>)}
                    )} </p>
                {/* ID will not be rendered on final product only here now so I know it's working - Mel */}
                {/* <p>ID:{this.state.id}</p> */}
                <Comments 
                movieID={this.state.id}
                username={this.state.username} />
            </div>
        )
    }
}



export default MovieInfo;