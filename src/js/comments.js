module.exports = function(commentsContainer, commentsForm, $){
    if(!$) $ = jQuery;
    if(!$) return false;

    var $container = $(commentsContainer),
        $form = $(commentsForm),
        commentsCount = $container.data('count');

    if($form && $container){
        $form.submit(function(e){
            e.preventDefault();
            var $input = $form.find('textarea');
            if($input.val() != ''){
                $.post($form.attr('action') , {commentText: $input.val()}, function(data){
                    var $item = $('<li></li>').addClass('list-group-item'),
                        creator = $('<a></a>').text(data.creator.username + ' :'),
                        text = $('<p></p>').text(data.text);
                    $item.append(creator).append(text);
                    console.log($item);
                    var list = $container.find('ul.list-group');
                    $container.find('ul.list-group').append($item);
                });
            }
        });
    }
}