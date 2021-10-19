$.ajax({
    type: "POST",
    url: "../sheets/sheets.py",
    success: function orders(){
       
    }
  }).done(function( o ) {
    
    function loadAnnouncements() {
      let accouncementData = require('../sheets/announcements.json')
      console.log(accouncementData);

      fetch(announcementData)
        .then(response => {
          return response.json();
        })
        .then(myJson => {

            let an = document.getElementById("announcements");

            myJson.forEach((announcement) => {
               let day = announcement.day;
               let time = announcement.time;
               let title = announcement.title;
               let description = announcement.description;

               let li = document.createElement("li");
               li.innerHTML = "[" + "(" + day + " " + time + ") " + title + ": " + description + "] ";
               an.appendChild(li);
               
            });
        });
    }

    function loadScheduleData() {
      let scheduleData = require('../sheets/schedule.json');
      console.log(scheduleData);

      fetch(scheduleData)
         .then(response => {
            return response.json();
         })
         .then(myJson => {
            let satSched = JSON.parse(myJson).filter(function (event) {
               return event.day == 'sat';
            })

            let sunSched = JSON.parse(myJson).filter(function (event) {
               return event.day == 'sun';
            })

            let scSat = document.getElementById("scheduleSat");
            let scSun = document.getElementById("scheduleSun");

            satSched.forEach((event) => {
               let time_begin = event.time_begin;
               let time_end = event.time_end;
               let title = event.title;
               let description = event.description;

               let event_el = document.createRange().createContextualFragment(
                 `
                   <div class="event">
                       <span class="time">` +
                   time_begin + " - " + time_end +
                   `</span>
                       <span class="eventName">` +
                   title +
                   `</span>
                   </div>
                `
               );
               scSat.appendChild(event_el);
             });
       
             sunSched.forEach((event) => {
               let time_begin = event.time_begin;
               let time_end = event.time_end;
               let title = event.title;
               let description = event.description;

               let event_el = document.createRange().createContextualFragment(
                 `
                   <div class="event">
                       <span class="time">` +
                   time_begin + " - " + time_end +
                   `</span>
                       <span class="eventName">` +
                   title +
                   `</span>
                   </div>
                `
               );
               scSun.appendChild(event_el);
             });
         })
    }
    
    function loadHappeningNow() {
       let happeningNowData = require('../sheets/happeningnow.json')
       console.log(happeningNowData);

       fetch(happeningNowData)
         .then(response => {
            return response.json();
         })
         .then(myJson => {
            let hapNow = document.getElementById("hapnow");

            myJson.forEach((now) => {
            let event_el = document.createRange().createContextualFragment(
               `
                  <div class="event">
                     <span class="eventName">` +
                        now.title + ": " + now.description +
                     `</span>
                  </div>
               `
            )
            hapNow.appendChild(event_el);
            })
         })
    }

    $(window).on("load", function() {
      loadAnnouncements();
      loadHappeningNow();
    
      setInterval(function() {
         loadHappeningNow();
      }, 5 * 1000);
    });
    
  });