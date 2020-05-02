//TODO animações, melhora no submit de formulario (dados em branco) e tradução

import React from 'react';
import { Row, Col, Card, Typography  } from 'antd';

import ImageIconButton from '../components/ImageIconButton/ImageIconButton';

const { Title, Text } = Typography;

const SOCIAL_MEDIAS = [
  {
    link: 'https://www.facebook.com/httpmarks',
    img_path: '/static/images/social_media/facebook.png'
  }, 
  {
    link: 'https://www.instagram.com/httpmarks',
    img_path: '/static/images/social_media/instagram.png'
  },
  {
    link: 'https://www.linkedin.com/in/marcos-v-835307102/',
    img_path: '/static/images/social_media/linkedin.png'
  }, 
  {
    link: 'spotify:user:12179331974',
    img_path: '/static/images/social_media/spotify.png'
  },
  {
    link: 'https://github.com/mrviniciux',
    img_path: '/static/images/social_media/square.png' 
  }
];

const IMAGE_ICON_DIMESION = [40, 40]

class Index extends React.Component {

  render(){
    return (
      <div className="my-background">
        <Row type="flex" justify="center" align="middle">
          <Col span={22}>
            <Card className="card-content">
              
              <Row type="flex">
                <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 6}}>
                  <div className="profile-pic-container">
                    {/* <div className="profile-pic"></div> */}
                    <img className="profile-pic" src="/static/images/profile.png" alt="profile"/>
                  </div>

                  <Row type="flex" justify="center" align="middle" className="social-media-container" gutter={[8, 8]}>
                    {SOCIAL_MEDIAS.map(media => (
                      <Col> 
                        <ImageIconButton  url={media.img_path}
                                          link={media.link}
                                          dimensions={IMAGE_ICON_DIMESION}>
                        </ImageIconButton>
                      </Col>
                    ))}  
                  </Row>
                 
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 18}}>
                  <div className="profile-info">
                    <Title className="no-margin-bottom font-medium-override">Marcos Vinícius dos Santos</Title>
                    <Title className="text-rose no-margin-top font-medium-override" level={2}>Web developer</Title>

                    <Title className="no-margin-bottom font-medium-override" level={4}>Skills</Title>
                    <Title className="no-margin-top font-light-override" type="secondary" level={4}>AngularJS, ReactJS, ES6, Layout design and prototype</Title>

                    <Title className="no-margin-bottom font-medium-override" level={4}>Location</Title>
                    <Title className="no-margin-top font-light-override" type="secondary" level={4}>Blumenau - SC - Brazil</Title>

                    <Title className="no-margin-bottom font-medium-override" level={4}>Interests</Title>
                    <Title className="no-margin-top font-light-override" type="secondary" level={4}>UI/UX Stuff, Frontend, Language paradigms, Security Information and databases</Title>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
     
    );
  }
}

export default Index;