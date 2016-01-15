module.exports = function(err, req, res, next){
	res.status(err.status || 500);
  if(req.xhr){
		res.send({error: err.message});
		return;
	}
  switch(err.status){
    case 403:
      res.render('errors/403',{
        message: err.message,
        error: err
      });
      break;
    case 404:
      res.render('errors/404',{
        message: err.message,
        error: err
      });
      break;
    case 500:
      res.render('errors/500',{
        message: err.message,
        error: err
      });
      break;
      default:
        next(err);
  }
}