import MainLayout from '../../components/Layout/MainLayout';
import { Row, Col, Form, Button } from 'react-bootstrap';
import './create.style.css';
import { useState } from 'react';
import ImageUploading from 'react-images-uploading';

function Create() {
  const [form, setForm] = useState({ title: '', description: '' });
  const [images, setImages] = useState([]);

  const onHandleSubmit = (e) => {
    e.preventDefault();

    console.log(form);
  };

  const onChangeForm = (e) => {
    const { value, name } = e.target;
    console.log(name);
    // this.setState => this.setState({ description: 'a' })
    // setForm({ description: 'a'}) => sai
    // this.setState la marge state, setState replace
    setForm({
      ...form,
      [name]: value
    });
  };

  const onChangeImage = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  return (
    <MainLayout>
      <div className="create-post mt-3 p-4">
        <Row>
          <Col xs="12" md="4">
            <ImageUploading 
              value={images} 
              maxNumber={1} 
              onChange={onChangeImage} 
              dataURLKey="data_url"
            >
              {({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => {
                return (
                  <div className="upload-wrapper">
                    <Button onClick={onImageUpload}>Upload image</Button>
                    {imageList.map((image, index) => {
                      return (
                        <div key={index} className="image-item">
                          <div className="image-wrapper" onClick={onImageUpdate}>
                            <img src={image.data_url} alt="" width="100" />
                          </div>
                          <span className="remove-btn" onClick={onImageRemove}>x</span>
                        </div>
                      )
                    })}
                  </div>
                );
              }}
            </ImageUploading>
          </Col>
          <Col xs="12" md="8">
            <Form onSubmit={onHandleSubmit}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  placeholder="Enter title"
                  value={form.title}
                  name="title"
                  onChange={onChangeForm}
                />
              </Form.Group>
              <Form.Group controlId="textarea">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={form.description}
                  name="description"
                  onChange={onChangeForm}
                />
              </Form.Group>
              <Button className="mt-3" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
}

export default Create;
