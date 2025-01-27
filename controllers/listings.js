const Listing =require("../models/listing");

module.exports.index = async (req,res) => {
    const allListing =  await Listing.find({});
    res.render("listings/index.ejs", {allListing});
};

module.exports.renderNewForm = async(req,res) => {
       
    res.render("listings/new.ejs");
    
    };

    module.exports.showListing = async(req,res) => {
        let {id} = req.params;
        const  listing = await Listing.findById(id)
        .populate({
            path:"reviews",
    populate:{
         path:"author",
        },
    })
    .populate("owner");
            if(!listing) {
                req.flash("error" , "Listing you requested for does not exits");
                res.redirect("/listings");

            }
            res.render("listings/show.ejs", {listing});
        };
         module.exports.createListing = async(req,res,next) =>  {
            let url =req.file.path;
            let filename = req.file.filename;
            console.log(url,"..",filename);
       
            const newListing = new Listing(req.body.listing);
            newListing.owner = req.user._id;
            newListing.image = {url,filename};
            await newListing.save(); 
            req.flash("success", "New Lisreqting Created");
            res.redirect("/listings");
        };
        module.exports.renderEditForm = async(req,res) => {
            let {id} = req.params;
            const  listing = await Listing.findById(id);
            
            res.render("listings/edit.ejs",{listing});
            req.flash("success", "Listing Edited");
        };
        module.exports.updateListing = async(req,res) => {
            let{id} =req.params;
            let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
            if (typeof req.file !== "undefined") {
            let url =req.file.path;
            let filename = req.file.filename;
            listing.image = {url,filename}
            await listing.save()
           }
            req.flash("success", "Listing Updated");
            res.redirect(`/listings/${id}`);
        };

        module.exports.destroyListing = async(req,res) => {
            let {id} =req.params;
           let deletedListing= await Listing.findByIdAndDelete(id);
           console.log(deletedListing);
           req.flash("success", "A Listing Delete");
           res.redirect("/listings");
        };

