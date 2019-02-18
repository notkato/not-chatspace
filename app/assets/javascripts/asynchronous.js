$(function() {
    var messages = $('#messages');
    var path = location.pathname;
  
    function buildHTML(message) {
      var userName = $('#user-name').text();
      var messageImage = message.image ? `<img src="${message.image}" alt="Plofile fb n">` : `` ;
      var html = $('<li class="message" data-message-id=' + message.id + '>').append(
            `<p class="message__name">
               ${userName}
               <span>
                 ${message.created_at}
               </span>
             </p>
             <p class="message__text">
               ${message.text}
             </p>
             ${messageImage}`
            );
      return html;
    };
  
    $('#new_message').on('submit', function(e) {
      var $form = this;
      e.preventDefault();
      var textField = $('#message_text');
      var fileField = $('#message_image');
      if ( textField.val() || fileField.val()) {
        var formData = new FormData($(this)[0]);
        $.ajax({
          type: 'POST',
          url: './messages.json',
          processData: false,
          contentType: false,
          data: formData
        })
        .done(function(data) {
          var html = buildHTML(data);
          messages.append(html);
          textField.val("");
        })
      } else {
        alert('メッセージを入力してください');
      };
      $form.reset();
      return false;
    });
  
    if (path.match('/messages')) {
      var timer = setInterval(function(){
        var lastMessageId = messages.children().last().data('messageId');
        $.ajax({
          type:     'GET',
          url:       path,
          data: {
            last_message_id: lastMessageId
          },
          dataType: 'json'
        })
        .done(function(data) {
          $.each(data, function(i, message) {
            var html = buildHTML(message);
            messages.append(html);
          });
        });
      }, 5000);
    }
  
    // turbolinksによってページ遷移先にsetIntervalが引き継がれるバグを解消
    $(this).on('turbolinks:click', function() {
      clearInterval(timer);
    });
  });