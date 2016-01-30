module.exports = function(selector, title, $){
    if(! title) return false;
    if(! $) $ = jQuery;
    if(! $) return false;

    $(selector).barrating({
        theme: 'fontawesome-stars',
        onSelect: function(value, text, event){
            console.log('works');
            $.ajax({
                url: '/articles/rate',
                method: 'POST',
                data: {
                    rating: value,
                    title: title
                }
            });
        }
    });
}