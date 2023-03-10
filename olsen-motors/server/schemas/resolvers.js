// const { AuthenticationError } = require("apollo-server-express");
// const {
//   User,
//   Product,
//   Category,
//   Order,
//   Message,
//   Conversation,
// } = require("../models");
// const { signToken } = require("../utils/auth");
// const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

// const resolvers = {
//   Query: {
//     categories: async () => {
//       return await Category.find();
//     },
//     products: async (parent, { category, name, user }) => {
//       const params = {};

//       if (category) {
//         params.category = category;
//       }

//       if (name) {
//         params.name = {
//           $regex: name,
//         };
//       }
//       if (user) {
//         params.user = user;
//       }

//       return await Product.find(params).populate("category").populate("user");
//     },
//     product: async (parent, { _id }) => {
//       const product = await Product.findById(_id)
//         .populate("category")
//         .populate("user");

//       return product;
//     },
//     user: async (parent, args, context) => {
//       if (context.user) {
//         const user = await User.findById(context.user._id).populate({
//           path: "orders.products",
//           populate: "category",
//         });

//         user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

//         return user;
//       }

//       throw new AuthenticationError("Not logged in");
//     },
//     order: async (parent, { _id }, context) => {
//       if (context.user) {
//         const user = await User.findById(context.user._id).populate({
//           path: "orders.products",
//           populate: "category",
//         });

//         return user.orders.id(_id);
//       }

//       throw new AuthenticationError("Not logged in");
//     },
//     checkout: async (parent, args, context) => {
//       const url = new URL(context.headers.referer).origin;
//       const order = new Order({ products: args.products });
//       const line_items = [];

//       const { products } = await order.populate("products").execPopulate();

//       for (let i = 0; i < products.length; i++) {
//         const product = await stripe.products.create({
//           name: products[i].name,
//           description: products[i].description,
//           images: [`${url}/images/${products[i].image}`],
//         });

//         const price = await stripe.prices.create({
//           product: product.id,
//           unit_amount: products[i].price * 100,
//           currency: "usd",
//         });

//         line_items.push({
//           price: price.id,
//           quantity: 1,
//         });
//       }

//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         line_items,
//         mode: "payment",
//         success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
//         cancel_url: `${url}/`,
//       });

//       return { session: session.id };
//     },

//     userConversation: async (parent, args, context) => {
//       if (context.user) {
//         const conversation = await Conversation.find({
//           members: { $in: [context.user._id] },
//           productId: args.productID,
//         });
//         return conversation;
//       }
//     },
//     getMessages: async (parent, { id }) => {
//       const messages = await Message.find({
//         conversationId: id,
//       });
//       return messages;
//     },
//   },
//   Mutation: {
//     addUser: async (parent, args) => {
//       const user = await User.create(args);
//       const token = signToken(user);

//       return { token, user };
//     },
//     addOrder: async (parent, { products }, context) => {
//       if (context.user) {
//         const order = new Order({ products });

//         await User.findByIdAndUpdate(context.user._id, {
//           $push: { orders: order },
//         });

//         return order;
//       }

//       throw new AuthenticationError("Not logged in");
//     },
//     updateUser: async (parent, args, context) => {
//       if (context.user) {
//         return await User.findByIdAndUpdate(context.user._id, args, {
//           new: true,
//         });
//       }

//       throw new AuthenticationError("Not logged in");
//     },
//     updateProduct: async (parent, { _id, quantity }) => {
//       const decrement = Math.abs(quantity) * -1;

//       return await Product.findByIdAndUpdate(
//         _id,
//         { $inc: { quantity: decrement } },
//         { new: true }
//       );
//     },
//     addProduct: async (parents, args, context) => {
//       const newProduct = await Product.create({
//         name: args.name,
//         description: args.description,
//         image: args.image,
//         price: args.price,
//         category: args.category,
//         user: context.user._id,
//       });
//       console.log("ADD PRODUCT ARGSSS", args);
//       return newProduct;
//     },

//     removeProduct: async (parent, { productID }, context) => {
//       if (context.user) {
//         const product = await Product.findOneAndDelete({
//           _id: productID,
//           user: context.user._id,
//         });

//         await User.findOneAndUpdate(
//           { _id: context.user._id },
//           { $pull: { products: product._id } }
//         );

//         return product;
//       }
//       throw new AuthenticationError('You need to be logged in!');
//     },

//     editProduct: async (parent, args, context) => {
//       if (context.user){
//       const editProduct =  await Product.findByIdAndUpdate(
//         { _id: args._id },
//         {  name: args.name,
//           description: args.description,
//           image: args.image,
//           price: args.price,
//           category: args.category },
//         { new: true }
//       );
//     return editProduct;
//       }
//       throw new AuthenticationError('You need to be logged in!');
//   },

//     login: async (parent, { email, password }) => {
//       const user = await User.findOne({ email });

//       if (!user) {
//         throw new AuthenticationError("Incorrect credentials");
//       }

//       const correctPw = await user.isCorrectPassword(password);

//       if (!correctPw) {
//         throw new AuthenticationError("Incorrect credentials");
//       }

//       const token = signToken(user);

//       return { token, user };
//     },
//     addConversation: async (parent, args, context) => {
//       {
//         const newConversation = await Conversation.create({
//           members: [context.user._id, args.id],
//           productId: args.productID,
//         });
//         return newConversation;
//       }
//     },
//     createMessage: async (parent, { conversationId, text }, context) => {
//       const newMessage = await Message.create({
//         conversationId,
//         sender: context.user._id,
//         text,
//       });
//       return newMessage;
//     },
//   },
// };

// module.exports = resolvers;
