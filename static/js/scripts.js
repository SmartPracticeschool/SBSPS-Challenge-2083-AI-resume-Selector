function message(status, shake=false, id="") {
  if (shake) {
    $("#"+id).effect("shake", {direction: "right", times: 2, distance: 8}, 250);
  } 
  document.getElementById("feedback").innerHTML = status;
  $("#feedback").show().delay(2000).fadeOut();
}

function error(type) {
  $("."+type).css("border-color", "#E14448");
}

var login = function() {
  $.post({
    type: "POST",
    url: "/",
    data: {"username": $("#login-user").val(), 
           "password": $("#login-pass").val()},
    success(response){
      var status = JSON.parse(response)["status"];
      if (status === "Login successful") { location.reload(); }
      else { error("login-input"); }
    }
  });
};

$(document).ready(function() {
  
  $(document).on("click", "#login-button", login);
  $(document).keypress(function(e) {if(e.which === 13) {login();}});
  
  $(document).on("click", "#signup-button", function() {
    $.post({
      type: "POST",
      url: "/signup",
      data: {"username": $("#signup-user").val(), 
             "password": $("#signup-pass").val(), 
             "email": $("#signup-mail").val()},
      success(response) {
        var status = JSON.parse(response)["status"];
        if (status === "Signup successful") { location.reload(); }
        else { message(status, true, "signup-box"); }
      }
    });
  });

  $(document).on("click", "#save", function() {
    $.post({
      type: "POST",
      url: "/settings",
      data: {"username": $("#settings-user").val(), 
             "password": $("#settings-pass").val(), 
             "email": $("#settings-mail").val()},
      success(response){
        message(JSON.parse(response)["status"]);
      }
    });
  });
});

$("#navbar-burger-id").click(function () {
  if($("#navbar-burger-id").hasClass("is-active")){
    $("#navbar-burger-id").removeClass("is-active");
    $("#navbar-menu-id").removeClass("is-active");
  }else {
    $("#navbar-burger-id").addClass("is-active");
    $("#navbar-menu-id").addClass("is-active");
  }
});

$("#imageUpload").change(function () {
  $('.image-section').show();
  $('#btn-predict').show();
  $('#result').text('');
  $('#result').hide();
});

$('#btn-predict').click(function () {
  var form_data = new FormData($('#upload-file')[0]);
  $(this).hide();
  $('.loader').show();

  $.ajax({
      type: 'POST',
      url: '/predict',
      data: form_data,
      contentType: false,
      cache: false,
      processData: false,
      async: true,
      success: function (data) {
          $('.loader').hide();
          $('#result').fadeIn(1000);
          $('#result').text(data);
      },
  });
});