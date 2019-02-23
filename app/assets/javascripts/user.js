$(function() {

    var search_list = $("#user-search-result");
    
    function appendUser(user) {
      var html = `<div id='chat-group-users'>
                    <div class='chat-group-user clearfix'>
                      <input name='chat_group[user_ids][]' type='hidden' value=${user.id}>
                      <p class='chat-group-user__name'>${user.name}</p>
                      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                    </div>
                  </div>`
        search_list.append(html);
     }
    
    function appendNoUser(user) {
      var html = `<div id='chat-group-users'>
                    <div class='chat-group-user clearfix'>
                      <p class='chat-group-user__name'>${user}</p>
                    </div>
                  </div>`
        search_list.append(html);
      }
    
      $("#user-search-field").on("keyup", function() {
        var input = $("#user-search-field").val();
        if(input.length != 0){
          $.ajax({
            type: 'GET',
            url: '/users',
            data: { keyword: input },
            dataType: 'json'
          })
      
          .done(function(users) {
            $("#user-search-result").empty();
            if (users.length !== 0) {
              users.forEach(function(user){
                appendUser(user);
              });
            }
            else {
              appendNoUser("一致するユーザは存在しません");
            }
          })
          .fail(function() {
            alert('ユーザ検索に失敗しました');
          });
        }
      });
    
    var search_list_add = $(".user-add-result");
    function addUser(user_id, user_name) {
      var html = `<div class='chat-group-user clearfix'>
                    <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                    <p class='chat-group-user__name'>${user_name}</p>
                    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                  </div>`
      search_list_add.append(html);
    }
  
    // 追加クリック時
    $('#user-search-result').on('click','.chat-group-user__btn--add',function(){
      var user_id = $('.user-search-add').attr('data-user-id');
      var user_name = $('.user-search-add').attr('data-user-name');
      console.log(user_id, user_name);
      addUser(user_id, user_name);
      $(this).parent().remove();
    });
    // 削除クリック時
    $('.chat-group-form__field--right').on('click','.user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn',function(){
      $(this).parent().remove();
    });
  });