module.exports = function(commentsContainer, commentsForm, $){
    if(!$) $ = jQuery;
    if(!$) return false;

    var $container = $(commentsContainer),
        $form = $(commentsForm),
        commentsCount = $container.data('count'),
        socketConnected = false;

    if($form && $container){
        var addComment = function(text, author){
            var $item = $('<li></li>').addClass('list-group-item'),
                $creator = $('<a></a>').text(author + ' :'),
                $text = $('<p></p>').text(text);
            $item.append($creator).append($text);
            var list = $container.find('ul.list-group');
            $container.find('ul.list-group').append($item);
            var count = $('#commentsCount').text();
            $('#commentsCount').html(++count);
        }
        $form.submit(function(e){
            e.preventDefault();
            var $input = $form.find('textarea');
            if($input.val() != ''){
                $.post($form.attr('action') , {commentText: $input.val()}, function(data){
                    if(!socketConnected) addComment(data.text, data.creator.username);
                });
            }
        });

        var socket = io('', {
            reconnect: true
        });
        socket.on('connect', function(){
            socketConnected = true;
        });
        socket.on('error', function(){
            socketConnected = false;
        });
        socket.on('comment', function(data){
            addComment(data.text, data.creator.username);
        });
    }
}
