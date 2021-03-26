import React from 'react';
import Header from './components/Header/Header';
import SearchForm from './components/SearchForm/SearchForm';
import ImageCard from './components/ImageCard/ImageCard';
import Loading from './components/Loading/Loading';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('constructor');
    this.state = {
      label: 'Tim kiem',
      isLoading: false,
      images: [],
    };
  }

  changeLoading = (newLoading) => {
    this.setState({ isLoading: newLoading });
  }

  changeImages = (newImages, offset) => {
    if (offset === 0) {
      this.setState({
        images: newImages,
        isLoading: false
      });
    } else {
      this.setState(prevState => {
        return {
          isLoading: false,
          images: [...prevState.images, ...newImages]
        }
      })
    }
    
  };

  renderImages = () => {
    const { images } = this.state;

    return images.map((image, idx) => {
      return (
        <ImageCard
          key={idx}
          imageUrl={image.imageUrl}
          description={image.description}
        />
      );
    });
  };
  // JSX
  render() {
    return (
      <div className="App">
        <Header label={this.state.label} />
        <div className="container">
          <SearchForm
            changeImages={this.changeImages}
            changeLoading={this.changeLoading}
          />
          <div className="content pt-4">{this.renderImages()}</div>
          {this.state.isLoading && <Loading />}
        </div>
      </div>
    );
  }
}

export default App;
