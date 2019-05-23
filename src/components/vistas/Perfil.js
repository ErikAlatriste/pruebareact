import React from 'react';
import MediaCard from './Cardperfil';
import Tabperfil from './Tab';
import axios from 'axios';

class Perfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {articles:[]
        }
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((response) => { console.log(response); 
        const longeur = response.data.length;
        this.setState({longeur}); console.log(longeur);
        });
    }
    render() {
        const {longeur} = this.props;
        return(
            <div >
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                Perfil: {this.longeur}
                    <MediaCard render={(props) => <MediaCard {...props} />} />
                    <br />
                    <div align="center"
                    >
                    <Tabperfil render={(props) => <MediaCard {...props} />} />
                    </div>
            </div>
        )
    }
}

export default Perfil;