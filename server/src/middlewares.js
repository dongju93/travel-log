// just for NOT FOUND error handler
const notFound = (req, res, next) => {
   const error = new Error(`Not Found - ${req.originalUrl}`);
   res.status(404);
   next(error);
};

// general error handler
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
   res.status(statusCode);
   res.json({
      message: error.message,
      // when this application goes to deploy step then don't show whole error stack for security issues
      stack: process.env.NODE_ENV === 'production' ? '👀' : error.stack,
   });
};

module.exports = {
   notFound,
   errorHandler
};