import logo from './images/giphy-logo.svg';
import './App.css'; // import css trong file js => webpack

function App() {
  // JSX
  return (
    <div className="App">
      <div className="header">
        <img src={logo} alt="logo" />
        <h1>Let's search</h1>
      </div>
      <div className="form">
        <input type="text" className="form-control"></input>
        <button className="btn btn-primary">Search</button>
      </div>
      <div className="content">
        <div className="image-row">
          <div className="image-card">
            <img 
              src="https://doctors24h.vn/uploads/faqs/03_2020/02/meo-bi-ho-nhu-the-nao.jpg"
              alt="vietnam"
            />
          </div>
          <div className="image-description">
            <h1>Meo meo</h1>
          </div>
        </div>
        <div className="image-row">
          <div className="image-card">
            <img 
              src="https://doctors24h.vn/uploads/faqs/03_2020/02/meo-bi-ho-nhu-the-nao.jpg"
              alt="vietnam"
            />
          </div>
          <div className="image-description">
            <h1>Meo meo</h1>
          </div>
        </div>
        <div className="image-row">
          <div className="image-card">
            <img 
              src="https://doctors24h.vn/uploads/faqs/03_2020/02/meo-bi-ho-nhu-the-nao.jpg"
              alt="vietnam"
            />
          </div>
          <div className="image-description">
            <h1>Meo meo</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
