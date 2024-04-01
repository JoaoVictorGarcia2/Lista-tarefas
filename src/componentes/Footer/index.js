import './footer.css';
import Git from './img/git2.png'

function Footer() {
    return (
        <footer>
          <div className='infotop'>
            <div>
              <p>Informações</p>
            </div>
          </div>
          <div className='infos'>
            <div className='col2'>
              <a href='https://github.com/JoaoVictorGarcia2'><img src={Git} alt=""></img></a>
              <h4>Autor:</h4>
              <p>João Victor Garcia</p>
            </div>
            
          </div>
        </footer>
    )
}

export default Footer;