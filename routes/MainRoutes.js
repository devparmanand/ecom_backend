const Router = require("express").Router()

const MaincategoryRouter = require("../routes/MaincategoryRoutes")
const SubcategoryRouter = require("../routes/SubcategoryRoutes")
const BrandRouter = require("../routes/BrandRoutes")
const TestimonialRouter = require("../routes/TestimonialRoutes")
const ProductRouter = require("../routes/ProductRoutes")
const UserRouter = require("../routes/UserRoutes")
const CartRouter = require("../routes/CartRoutes")
const WishlistRouter = require("../routes/WishlistRoutes")
const CheckoutRouter = require("../routes/CheckoutRoutes")
const NewsletterRouter = require("../routes/NewsletterRoutes")
const ContactUsRouter = require("../routes/ContactUsRoutes")



Router.use("/maincategory",MaincategoryRouter)
Router.use("/subcategory",SubcategoryRouter)
Router.use("/brand",BrandRouter)
Router.use("/testimonial",TestimonialRouter)
Router.use("/product",ProductRouter)
Router.use("/user",UserRouter)
Router.use("/cart",CartRouter)
Router.use("/wishlist",WishlistRouter)
Router.use("/checkout",CheckoutRouter)
Router.use("/newsletter",NewsletterRouter)
Router.use("/contactus",ContactUsRouter)

module.exports=Router  