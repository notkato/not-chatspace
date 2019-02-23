$(function(){
  function buildMessageHTML(message){
    var image_url = (message.image_url)? `<image class="lower-message__image" src="${message.image.url}">`:"";
    var html = `<div class="message" data-message-id=${message.id}>
                  <div class="upper-message" >
                    <div class="upper-message__user-name">
                    ${message.name}
                    </div>
                    <div class="upper-message__date">
                    ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                    ${message.text}
                    </p>
                    <img src='${image_url}'>
                  </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();

    var formData = new FormData(this);
    var url = $('.form').attr('action');

    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){
      var html = buildMessageHTML(message);
      $('.messages').append(html); 
      $('#new_message')[0].reset();
      $('.form__submit').removeAttr("disabled");
      $('.message').animate({scrollBottom:$('.messages')[0].scrollHeight},500, 'fast');
    })
    
    .fail(function(){
      alert('入力してください');
      $(".form__submit").removeAttr("disabled");
    })
  });
  if (location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(function(){
      $.ajax({
        type: 'GET',
        url: location.href,
        dataType: 'json'
      })
      .done(function(messages){
        $('.messages').empty();
        messages.forEach(function(message){
          var html = buildMessageHTML(message);
          $('.messages').append(html);
        });
      })
      .fail(function(){
        alert('自動更新に失敗しました');
      });
    },5000)
  };
});
