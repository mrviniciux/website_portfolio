//TODO animações, melhora no submit de formulario (dados em branco) e tradução

import React from 'react';
import { Row, Col, Card, Typography, Button  } from 'antd';
import { ModalResume } from '../components/ModalResume/ModalResume';

import ImageIconButton from '../components/ImageIconButton/ImageIconButton';

const { Title } = Typography;

const SOCIAL_MEDIAS = [
  {
    alt: "Mrviniciux facebook",
    link: 'https://www.facebook.com/httpmarks',
    img_path: '/static/images/social_media/facebook.png'
  }, 
  {
    alt: "Mrviniciux instagram",
    link: 'https://www.instagram.com/httpmarks',
    img_path: '/static/images/social_media/instagram.png'
  },
  {
    alt: "Mrviniciux linkedin",
    link: 'https://www.linkedin.com/in/marcos-v-835307102/',
    img_path: '/static/images/social_media/linkedin.png'
  }, 
  {
    alt: "Mrviniciux spotify",
    link: 'spotify:user:12179331974',
    img_path: '/static/images/social_media/spotify.png'
  },
  {
    alt: "Mrviniciux github",
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
                    <img className="profile-pic" src="/static/images/profile.jpg" alt="profile"/>
                  </div>

                  <Row type="flex" justify="center" align="middle" className="social-media-container" gutter={[8, 8]}>
                    {SOCIAL_MEDIAS.map(media => (
                      <Col key={media.link}> 
                        <ImageIconButton  url={media.img_path}
                                          alt={media.alt}
                                          link={media.link}
                                          dimensions={IMAGE_ICON_DIMESION}>
                        </ImageIconButton>
                      </Col>
                    ))}  
                  </Row>
                 
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 18}}>
                  <div className="profile-info">
                    <Title className="no-margin-bottom">Marcos Vinícius dos Santos</Title>
                    <Title className="text-rose no-margin-top" level={2}>Web developer</Title>

                    <Title className="no-margin-bottom" level={4}>Skills</Title>
                    <Title className="no-margin-top" type="secondary" level={4}>AngularJS, ReactJS, ES6, Layout design and prototype</Title>

                    <Title className="no-margin-bottom" level={4}>Location</Title>
                    <Title className="no-margin-top" type="secondary" level={4}>Blumenau - SC - Brazil</Title>

                    <Title className="no-margin-bottom" level={4}>Interests</Title>
                    <Title className="no-margin-top" type="secondary" level={4}>UI/UX Stuff, Frontend, Language paradigms, Security Information and databases</Title>
                  </div>
                </Col>
              </Row>

              <div className="text-right margin-top margin-right  ">
                  <ModalResume  buttonTitle="Request resume"
                                modalTitle="Resume options"></ModalResume>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
     
    );
  }
}

export default Index;