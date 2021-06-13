import { Jumbotron } from 'react-bootstrap';
import styles from './hero.module.css';
import { Link } from 'react-router-dom';

const Hero = (props) => {
  return (
    <Jumbotron style={{ backgroundImage: `url(${props.photo.imgUrl})` }} className={styles.container} fluid>
      <h1 className={styles.heading} >{props.title} </h1>
      <p className={styles.description}> {props.description} </p>
      {props.button && (
        <Link to={props.button.link}>
          <button
            className={styles.button}
          >
            {props.button.text}
          </button>
        </Link>
      )
      }

      <p className={styles.credit}>
        Photo by <a href={props.photo.user_link}>{props.photo.name}</a> on <a href={props.photo.link}>{props.photo.website}</a></p>
    </Jumbotron>
  );
}
export default Hero;
