import React, { Component } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

const styleInline = { marginRight: 10 };

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      offset: 0
    };
    this.debounce = null;
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }


  handleScroll = () => {
    // check con lăn chuột ở bottom màn hình
    if (
      (window.innerHeight + window.scrollY) 
      >= document.body.scrollHeight - 100
    ) {
      // you're at the bottom of the page
      this.setState(prevState => {
        console.log(prevState.offset);
        return {
          offset: prevState.offset + 25
        }
      }, () => {
        this.handleSearchImage(
          this.state.keyword,
          this.state.offset
        )
      })
      // function để get data => keyword, offset
      // fetchData(keyword, offset)
    }
    // goi func => get them du lieu
  }

  debounceScroll = debounce(this.handleScroll, 1000)

  componentDidMount() {
    window.addEventListener('scroll', this.debounceScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.debounceScroll)
  }

  async handleSubmitForm(event) {
    event.preventDefault();
    // send HTTP request len server Gifphy
    const { keyword } = this.state;
    const urlAPI = `https://api.giphy.com/v1/gifs/search?api_key=R8Tn7WP68lMvqGDTD9Qn82x9kZgAXZIR&q=${keyword}&limit=25&offset=${0}&rating=g&lang=vi`;

    this.props.changeLoading(true);

    const res = await axios.get(urlAPI);
    // NOTE: ket qua tra ve can dung thi nam trong res.data
    console.log(res);
    // POINT: cần thay đổi state của comp cha => cha truyền props dạng function xuống
    const newImages = res.data.data.map((image) => ({
      imageUrl: image.images.downsized_medium.url,
      description: image.title
    }));
    // Chạy function changeImages => cha truyền xuống => this.setState của thằng cha
    // this.props.changeLoading(false)
    this.props.changeImages(newImages);
  }

  // cach 1
  /*
  handleChangeForm = async (event) => {
    // this setState => bất đồng bộ
    this.setState({ keyword: event.target.value }, async () => {
      const { keyword } = this.state;
      this.props.changeLoading(true);

      const urlAPI = `https://api.giphy.com/v1/gifs/search?api_key=R8Tn7WP68lMvqGDTD9Qn82x9kZgAXZIR&q=${keyword}&limit=25&offset=${0}&rating=g&lang=vi`;
      const res = await axios.get(urlAPI);

      const newImages = res.data.data.map((image) => ({
        imageUrl: image.images.downsized_medium.url,
        description: image.title
      }));

      this.props.changeImages(newImages);
    });

    // cách xử lý như này là sai
    // const { keyword } = this.state; // kéo theo ở đây chưa chắc là keyword mới
  };
  */
  // cach 2

  /*
    page 1, page of size 25
    0 - 24 => offset 0
    page 2:
    25 - 49 => offset 25

    page 4, size of page 25
    offset = limit * (page - 1)
    limit = size of page
  */

  handleSearchImage = async (keyword, offset = 0) => {
    this.props.changeLoading(true);

    const urlAPI = `https://api.giphy.com/v1/gifs/search?api_key=R8Tn7WP68lMvqGDTD9Qn82x9kZgAXZIR&q=${keyword}&limit=10&offset=${offset}&rating=g&lang=vi`;
    const res = await axios.get(urlAPI);

    const newImages = res.data.data.map((image) => ({
      imageUrl: image.images.downsized_medium.url,
      description: image.title
    }));

    this.props.changeImages(newImages, offset);

  }

  debounceSearchImage = debounce(this.handleSearchImage, 1000);

  handleChangeForm = async (event) => {
    // this setState => bất đồng bộ
    const keyword = event.target.value;

    this.setState({ keyword });

    this.debounceSearchImage(keyword);

    // hạn chế gọi thằng này
    // if (this.debounce) {
    //   clearTimeout(this.debounce);
    // }

    // this.debounce = setTimeout(() => {
    //   this.handleSearchImage(keyword);
    // }, 1000)

  };

  renderButton = () => {
    if (this.state.keyword.trim().length > 0) {
      return (
        <button
          className={
            this.state.keyword.length === 1
              ? 'btn btn-primary'
              : 'btn btn-warning'
          }
        >
          Search
        </button>
      );
    }
    return <button disabled>Disable</button>;
  };

  render() {
    return (
      <form className="form d-flex" onSubmit={this.handleSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={this.state.keyword}
          onChange={this.handleChangeForm}
          style={styleInline}
        />
        {this.renderButton()}
      </form>
    );
  }
}

export default SearchForm;

/*
  vietna: => call api keyword: vietna => api1
  vietnam: => call api keyword: vietnam => api2

  api1 va api2 call gần như là đồng thời => không chắc chắn được là api1 api2 về kết quả trước
  api2 về kết quả trước api1

  form: vietnam
  kết quả images: api2 về trước => render rồi, api1 về sau => render lại

*/