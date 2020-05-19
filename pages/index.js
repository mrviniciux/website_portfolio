//TODO animações, melhora no submit de formulario (dados em branco) e tradução

import React from 'react';
import {ProfileCard} from '../components/Card/ProfileCard';

class Index extends React.Component {

  render(){
    return (
      <div className="container-application">
        
        <ProfileCard></ProfileCard>
        <ProfileCard hidden={true}></ProfileCard>
        

        <div className="credits text-center">
            <p className="no-margin-bottom text-rose">2020 by <a href="https://github.com/mrviniciux" className="bold text-rose">@mrviniciux</a></p>
            <p className="no-margin-top text-rose">Icons and PNG's by <a href="https://www.flaticon.com/" className="bold text-rose">Flaticon.com</a></p>
        </div>
      </div>
    );
  }
}

export default Index;