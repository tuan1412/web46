React
1 Project React tương tự một project nodejs
npx create-react-app <tên project>

npm run start == npm start
- Sử dụng webpack, babel để đóng gói các file js, css, image, ... vào một file js duy nhất => bundle.js
- Dùng webpack dev server => start server dev là localhost:3000, hot reload, cập nhật kết quả mới nhất của code


Gõ trên trình duyệt localhost:3000/*
=> Trả về file index.html + bundle.js (để hiện thị giao diện) => single page app

Tập trung code phần react
- Không dùng require, code module là import và export default