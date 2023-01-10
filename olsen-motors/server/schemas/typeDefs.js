const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }
  type Conditions {
    _id: ID
    name: String
  }

  type Vehicules {
    _id: ID
    make: String
    model: String
    color: String
    vin: String
    description: String
    photo: String
    year: Int
    price: String
    commentId: [comment]
    categoryId: Category
    userId: User
  }

  type Comment {
    _id: ID
    comment: String!
    userId: User
    createdAt: String!
    updatedAt: String
  }

  type User {
    _id: ID
    firstName: String!
    middleName: String
    lastName: String!
    avatar: String
    email: String!
    password: String!
    address: String!
    phoneNumber: String
    
  }


  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

//   type Message {
//     conversationId: String
//     sender: User
//     text: String
//   }

//   type Conversation {
//     _id: ID
//     members: [User]
//     productId: Product
//   }

  type Query {
    categories: [Category]
    conditions: [Conditions]
    comments: [comments]
    vehicules(make: String, name: String, userId: ID): [Vehicules]

    vehicule(_id: ID!): Vehicules
    users: [User]
    user(_id: ID!): User
    me: User

//     userConversation(member: ID!, productID: ID!): [Conversation]
//    getMessages(id: String!): [Message]
  }

  type Mutation {
    addUser(
        firstName: String!
        middleName: String
        lastName: String!
        address: String!
        phoneNumber: String
        avatar: String
        email: String!
        password: String!
    ): Auth

    // addOrder(products: [ID]!): Order

    updateUser(
        firstName: String
        middleName: String
        lastName: String
        address: String
        phoneNumber: String
        avatar: String
        email: String
        password: String
    ): User
    updateProduct(_id: ID!, quantity: Int!): Product
    removeProduct(productID: ID!): Product

    login(email: String!, password: String!): Auth

    addConversation(id: ID!, productID: ID!): Conversation

    createMessage(
      conversationId: String!
      senderId: ID!
      text: String!
    ): Message

    addVehicule(
      userId: ID
      make: String!
      color:String!
      vin:String!
      year: Int!
      description: String
      photo: String
      price: String
      categoryId: ID
      conditionId:ID
      commentId:[ID]
    ): Vehicules
    editVehicule(
        userId: ID
        make: String!
        color:String!
        vin:String!
        year: Int!
        description: String
        photo: String
        price: String
        categoryId: ID
        conditionId:ID
        commentId:[ID]
    ): Vehicules
  }
`;

module.exports = typeDefs;
