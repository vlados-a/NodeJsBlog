module.exports = function(selector, $){
    if(! $) $ = jQuery;
    if(! $) return false;

      $(selector).barrating({
        theme: 'fontawesome-stars'
      });
}