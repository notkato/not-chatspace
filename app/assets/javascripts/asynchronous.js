$(function(){
  function buildMessageHTML(message){
    var image_url = (message.image_url)? `<image class="LowerMessage_image" src="${message.image_url}">`:"";
    var html = `<div class="Message" data-message-id=${message.id}>
                  <div class="UpperMessage" >
                    <div class="UpperMessage__user-name">
                    ${message.name}
                    </div>
                    <div class="UpperMessage__date">
                    ${message.time}
                    </div>
                  </div>
                  <div class="LowerMessage">
                    <p class="LowerMessage__content">
                    ${message.content}
                    </p>
                    <img src='${image_url}'>
                  </div>`
    return html;
  }


  $('.new_message').on('submit', function(e){
    e.preventDefault();

    var formData = new FormData(this);
    var url = $('.Footer').attr('action');

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
      $('.Messages').append(html); 
      $('.new_message')[0].reset();
      $('.Footer__btn').attr("disabled",false);
      $('.Messages').animate({scrollTop: $(".Messages")[0].scrollHeight }, 'fast');
    })
    
    .fail(function(){
      alert('入力してください');
      $(".Footer__btn").attr("disabled",false);
    })
  });
  $(function(){
    autoUpdateTimer = setInterval(autoMessageUpdate, 5000);
  });
  function autoMessageUpdate(){
    var url = location.href;
    if(url.match(/\/groups\/\d+\/messages/)){
      var message_id = $('.Message').last().data('message-id');
      $.ajax({
        url: url,
        type: 'GET',
        data: {id : message_id},
        dataType: 'json'
      })
      
      .done(function(messages){
        if (messages.length !== 0){
          messages.forEach(function(message){
            var html = buildMessageHTML(message);
            $('.Messages').append(html);
            $('.Messages').animate({scrollTop: $(".Messages")[0].scrollHeight }, 'fast');  
          })
        }
      })
      .fail(function(){
        alert('自動更新に失敗しました')
      })
    } else {
      clearInterval(autoUpdateTimer);
    }
  }
});