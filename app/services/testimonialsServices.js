const Testimonials = require("../models/Testimonials");

/********** create Testimonials ****************/
exports.createTestimonials = async (data)=>{
  try {
    const testimonialsData = {
        name: data.name,
        image: data.image,
        message: data.message,
        designation: data.designation
    };

    const testimonials =await Testimonials.create(testimonialsData);
    return { message: "testimonials created successfully", testimonials: testimonials };

  } catch (err) {
    return { err: err.message };
  }
};


/********** show all testimonials ****************/
exports.getAllTestimonials = async ()=>{
    try {
      const testimonials =await Testimonials.find();
      return { message: "testimonials successfully fetched", testimonials: testimonials };
  
    } catch (err) {
      return { err: err.message };
    }
  };


/********** edit testimonials ****************/
exports.editTestimonials = async ( id ,data)=>{
    try {
      const testimonials =await Testimonials.findByIdAndUpdate({ _id : id }, data ,{ new : true });
      if(!testimonials){ return { message : "error in updation please check the detail" , testimonials: null }}
      return { message: "testimonials successfully updated", testimonials: testimonials };
  
    } catch (err) {
      return { err: err.message };
    }
  };
  

  

/********** delete testimonials ****************/
exports.deleteTestimonials = async ( id )=>{
    try {
      const testimonials =await Testimonials.findByIdAndDelete({ _id: id });
      if(!testimonials){ return { message : "error in delete please check the detail" , testimonials: null }}
      return { message: "testimonials successfully deleted", testimonials: testimonials };
  
    } catch (err) {
      return { err: err.message };
    }
  };
  