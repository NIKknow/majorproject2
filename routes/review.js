const express = require("express");

const router =express.Router({mergeParams: true});
const wrapAsync =require("../utils/wrapAsync.js");
const{ listingSchema,reviewSchema } =require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Review =require("../models/review.js");
const Listing =require("../models/listing.js"); 
const{isLoggedIn,isOwner,validatedListing,isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");


const validateListing =(req,res,next) => {

    let{ error } = listingSchema.validate(req.body);
if(error){
    let errMsg =error.details.map((el) => el.message).join(",")
    throw new ExpressError(400,errMsg);
} else {
    next();
}
};

router.route("/")
.post(
isLoggedIn,
 wrapAsync(reviewController.createReview));


 router.route("/:reviewId")
 .delete(isLoggedIn,
 isReviewAuthor,
 wrapAsync(reviewController.destroyReview));

 module.exports = router;

// //Review
// //post route
//     router.post("/",
//     isLoggedIn,
//      wrapAsync(reviewController.createReview));
 
//  // Delete Route
//  router.delete("/:reviewId",isLoggedIn,
//  isReviewAuthor,
//  wrapAsync(reviewController.destroyReview));
 
 
