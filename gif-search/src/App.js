import React from 'react';
import Header from './components/Header/Header';
import SearchForm from './components/SearchForm/SearchForm'
import ImageCard from './components/ImageCard/ImageCard';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('constructor')
    this.state = {
      label: "Tim kiem",
      images: [
        {
          imageUrl: 'https://meocun.com/wp-content/uploads/cho-alaska-14-giong-cho-dep-nhat-the-gioi-1-600x400.jpg',
          description: 'Gau gau'
        },
        {
          imageUrl: 'https://media-cdn.laodong.vn/Storage/NewsPortal/2019/7/31/747087/Vua-Su-Tu-2.jpg',
          description: 'Gru gru'
        },
        {
          imageUrl: 'https://media-cdn.laodong.vn/Storage/NewsPortal/2019/7/31/747087/Vua-Su-Tu-2.jpg',
          description: 'Gru gru'
        },
      ]
    }
  }

  componentDidMount() {
    console.log('didmount')

    setInterval(() => {
      this.setState({ label: "Let's search" + Date.now()})
    }, 3000)
  }

  componentDidUpdate() {
    console.log('did update')

  }

  componentWillUnmount() {
    
  }

  renderImages = () => {
    return this.state.images.map((image, idx) => {
      return (
        <ImageCard
          key={idx}
          imageUrl={image.imageUrl}
          description={image.description}
        />
      )
    })
  }
  // JSX
  render() {
    console.log('render');
    return (
      <div className="App">
        <Header label={this.state.label} />
        <div className="container">
          <SearchForm />
          <div className="content pt-4">
            {/* {this.state.images.map((image, idx) => {
              return (
                <ImageCard
                  key={idx}
                  imageUrl={image.imageUrl}
                  description={image.description}
                />
              )
            })} */}
            {this.renderImages()}
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;
