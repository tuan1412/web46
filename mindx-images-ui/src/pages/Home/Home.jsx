import MainLayout from "../../components/Layout/MainLayout";
import { useEffect, useState } from 'react'
import client from '../../api';
import { Row, Col } from 'react-bootstrap';
import PostCard from "../../components/PostCard/PostCard";
// render list post
// call api server
function Home() {
  /*
    render => componentdidmount (call api => get du lieu)
  */
 /*
  3s => set key1 => render
 */
  // const [key, setKey] = useState(Date.now());

  // const [key2, setKey2] = useState(Date.now());


  // useEffect(() => {
  //   setInterval(() => {
  //     console.log('set key 1')
  //     setKey(Date.now())
  //   }, 3000) 
  // }, [])

  // đoạn code có ý nghĩa là sau 6s => key2 thay đổi => render
  // useEffect(() => {
  //   setInterval(() => {
  //     console.log('set key 2')
  //     setKey2(Date.now())
  //   }, 6000) 
  // }, [])

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await client({
        url: '/api/posts',
        method: 'GET',
        params: {
          page: 1,
          pageSize: 4
        }
      });
      setLoading(false);
      console.log(res.data);
      if (res.data.success) {
        console.log('fetch', res.data.data.data);
        setPosts(res.data.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // sự kết hợp của didmount, didupdate
  // arg1: fuc để chạy
  // arg2: dependency để chạy func đấy
  // useEffect nó chạy sau hàm render => didmount
  // chỉ khi nào các biến trong dependency thay đổi (tính luôn cả lần render đầu tiên)
  // thì nó mới chạy function 1
  // tư tưởng code là lắng nghe sự thay đổi của biến để chạy
  // xem component đấy đang ở lifecycle nào => xem biến đấy đang có giá trị như nào
  // useEffect(() => {
  //   fetchPosts()
  // }, [key2])

  useEffect(() => {
    fetchPosts()
  }, []);

  const renderPosts = () => {
    if (loading) return <div>Loading...</div>

    if (!posts.length) return <div>Không có dữ liệu</div>

    return posts.map(post => (
      <Col xs={12} md={3} key={post._id}>
        <PostCard
          imageUrl={post.imageUrl}
          title={post.title}
          description={post.description}
          createdBy={post.createdBy.email}
        />
      </Col>
    ))
  }
  
  return (
    <MainLayout>
      <Row className="mt-4">
        {renderPosts()}
      </Row>
    </MainLayout>
  )
}

export default Home;
