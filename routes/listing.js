const express = require("express");
const router =express.Router();
const wrapAsync =require("../utils/wrapAsync.js");
const{ listingSchema,reviewSchema } =require("../schema.js");
const Listing =require("../models/listing.js");
const{isLoggedIn,isOwner,validatedListing} = require("../middleware.js");
const {saveRedirectUrl} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage });

router.route("/")
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn,
    upload.single("listing[image]"),
    wrapAsync(listingController.createListing)
);



router.route("/new")
.get(isLoggedIn,wrapAsync(listingController.renderNewForm));

//update route
router.route("/:id")
.get(isLoggedIn, wrapAsync(listingController.showListing))
.put(
isLoggedIn,
isOwner,
upload.single("listing[image]"),
wrapAsync(listingController.updateListing))
.delete(
isLoggedIn,
isOwner,
 wrapAsync(listingController.destroyListing));

 //Edit route
 router.get("/:id/edit",
 isLoggedIn,
 isOwner,
 wrapAsync(listingController.renderEditForm));

 module.exports = router;


// // index route
// router.get("/",wrapAsync(listingController.index));
//     //new route
//     router.get("/new", isLoggedIn,wrapAsync(listingController.renderNewForm));
//         // show route
   
//     router.get("/:id",isLoggedIn, wrapAsync(listingController.showListing)
// );
//         // create route
//     router.post("/",isLoggedIn,
//     wrapAsync(listingController.createListing)
     
//    );
    
    
       
        
       
    
    
    // //update route
    // router.put("/:id",
    // isLoggedIn,
    // isOwner,
    // wrapAsync(listingController.updateListing));
    // //delete route
    // router.delete("/:id",
    // isLoggedIn,
    // isOwner,
    //  wrapAsync(listingController.destroyListing));
 