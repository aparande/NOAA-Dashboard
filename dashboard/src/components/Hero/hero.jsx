import HoverButton from '../HoverButton/hoverbutton'
import { Jumbotron } from 'react-bootstrap';
import './hero.css';

const Hero = (props) => {
  return (
    <Jumbotron style={{ backgroundImage: `url(${props.photo.imgUrl})` }} className="hero" fluid>
      <h1 className="hero-heading" >{props.title} </h1>
      <p className="hero-description"> {props.description} </p>
      { props.button && (
        <HoverButton
          className='hero-button'
          link={ props.button.link }>
          { props.button.text }
        </HoverButton>
      )
      }

      <p className="hero-credit">
        Photo by
          <a href={props.photo.user_link}> {props.photo.name} </a>
        on <a href={props.photo.link}>
          Unsplash</a></p>
    </Jumbotron>
  );
}
export default Hero;
