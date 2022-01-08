import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      name: "Maksood",
      email: "maksood@gmail.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true,
    },
    {
      name: "John",
      email: "John@gmail.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: false,
    },
  ],
  todos: [
    {
      title: "Nike Slim Shirt",
      description: "high quality product",
    },
    {
      title: "Adidas Fit Shirt",
      description: "high quality product",
    },
    {
      title: "Lacoste Free Shirt",
      description: "high quality product",
    },
  ],
};
export default data;
