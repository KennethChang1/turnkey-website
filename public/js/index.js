$(() => {
  $(document).scroll(function () {
    var $nav = $(".navbar");

    $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
  });

  const swiper = new Swiper(".swiper-container", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 3000,
      pauseOnMouseEnter: true,
    },
    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  const swiper2 = new Swiper(".testi-swiper-container", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 3000,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: ".testi-swiper-container .swiper-button-next",
      prevEl: ".testi-swiper-container .swiper-button-prev",
    },
    pagination: {
      el: ".testi-swiper-container .swiper-pagination",
      clickable: true,
    },
  });
});

/* send contact api */
const spreadsheet_url = "https://docs.google.com/spreadsheets/d/11AsKUcUoo62NVkhqiaK4UTJl3QDepNHlnSXDKCe-OZ8"; 
const api_key = "4d5v2h8i7syiu"; 
const api_key_subscribe = 'mkn7ho4ywpnnk';
function sendDataSheet(){
    // get data
    var fullname = $('#fullName').val();
    var institution = $('#institution').val();
    var product_of_interest = $('#product_of_interest').val();
    var country = $('#country').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var message = $('#message').val();
    var reach_me_through = $('#reach_me_through').val();
    var meeting_schedule = $('#day').val()+"-"+$('#month').val()+"-"+$('#year').val()+"-"+$('#time').val();
    var date_meeting = $('#day').val()+"-"+$('#month').val()+"-"+$('#year').val()+"-"+$('#time').val();;
    Notiflix.Loading.Circle();
     // check meet schedule availibity
  axios.post('/api/check-meet-schedule',{date:date_meeting}).then(function(response){
    console.log(response);
    if(response.data.data != null)
    {
      Notiflix.Loading.Remove();
      // date not available
      Notiflix.Report.Failure("Sorry, Date not available","Please choose different day/time");
    }else{
      // date available
      axios.post('https://sheetdb.io/api/v1/'+api_key,{
          "data": {
          "Name": fullname, 
          "Institutions": institution,
          "Product Of Interest":product_of_interest,
          "Country":country,
          "Email":email,
          "Phone":phone,
          "Message":message,
          "Reach me Through":reach_me_through,
          "Meeting Schedule":meeting_schedule
      }
      }).then( response => {
          console.log(response.data);
          if(response.data.created == 1)
          {
              Notiflix.Loading.Remove();
              // send email noification
              console.log(fullname);
              send_email(fullname,institution,product_of_interest,country,email,phone,message,reach_me_through,meeting_schedule)
              // insert meet schedule to backend
              axios.post('/api/insert-meet-schedule',{date:date_meeting})
              .then(function(response){console.log(response)})
              .catch(function(error){console.log('insert meet schedule fail')})
              Notiflix.Report.Success("Data submited","Thank you for contacting us");
            }else{
              Notiflix.Loading.Remove();
              Notiflix.Report.Failure("Error while sending message","Please try again later or contact our customer service");
          }
      });
    }
  })
  .catch(function(error){
    // execute when error
    Notiflix.Loading.Remove();
    Notiflix.Report.Failure("Something wrong","Can't connect to server");
  })
}


// send email
function send_email(fullname,institution,product_of_interest,country,email,phone,message,reach_me_through,meeting_schedule)
{
  // console.log(fullname);
  // empty input form
  $('#fullName').val('');
  $('#institution').val('');
  $('#product_of_interest').val('');
  $('#country').val('');
  $('#email').val('');
  $('#phone').val('');
  $('#message').val('');
  axios.post('/api/send-email',{
    "full_name": fullname,
    "institution": institution,
    "product_of_interest":product_of_interest,
    "country":country,
    "email":email,
    "phone":phone,
    "message":message,
    "reach_me_through":reach_me_through,
    "meeting_schedule":meeting_schedule
}).then(response => {
      console.log('response from email:');
      console.log(response);
      // $('#reach_me_through').val('');
      // $('#day').val('');
      // $('#month').val('');
      // $('#year').val('');
      // $('#time').val('');
})
}

/* subscribe email */
function subscribe_email(){
  Notiflix.Loading.Circle();
  // get input email value
  let email_val = $('#input-email').val();
  axios.post('https://sheetdb.io/api/v1/'+api_key_subscribe,{
    data : {
      "Email" : email_val
    }
  })
  .then(function(response){
    console.log(response);
    if(response.data.created == 1)
    {
      Notiflix.Loading.Remove();
      Notiflix.Report.Success("Success","you're now subscribing our news letter");
    }else{
      Notiflix.Loading.Remove();
      Notiflix.Report.Failure("Something wrong","Please try again later");
    }
  })
  .catch(function(error){
    console.log(error);
    Notiflix.Loading.Remove();
    Notiflix.Report.Failure("Something wrong","Please try again later");
  })
}