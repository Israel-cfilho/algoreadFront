import './home.css';
import { Link } from "react-router-dom";
import NotificationBell from '../notificationBell';

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <nav className="navbar">
          <div><a href="/" className="logo">AlgoRead</a></div>
          <ul className="nav-links">
            <li>Assinatura</li>
            <li>Escrever</li>
            <li>Entrar</li>
            <Link to="/reportsPage">Revisor</Link>
            <NotificationBell/>
            <li>
              <button className="get-started-btn">Começar</button>
            </li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <section className="featured-article">
          <h1>Sua História Começa Aqui</h1>
          <p>Junte-se à plataforma onde as vozes são ouvidas.</p>
          <button className="read-more-btn">Comece a Ler</button>
        </section>
        
        <section className="articles-list">
          {/* Exemplo de artigos, você pode mapear através de dados */}
          <article className="article">
            <h2>Título do Artigo 1</h2>
            <p>Resumo do artigo 1...</p>
          </article>
          <article className="article">
            <h2>Título do Artigo 2</h2>
            <p>Resumo do artigo 2...</p>
          </article>
          {/* Continue com outros artigos */}
        </section>
      </main>
    </div>
  );
}

export default Home;