$(document).ready(function() {

  //Timepicker for 24 hour format
  var timepicker = new TimePicker('time', {
  lang: 'en',
  theme: 'dark'
  });
  timepicker.on('change', function(evt) { 
  var value = (evt.hour || '00') + ':' + (evt.minute || '00');
  evt.element.value = value;
  });


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD6E1dx5DRgEFMHztPCk2eBjCfRlkOG-5k",
    authDomain: "train-scheduler-336a3.firebaseapp.com",
    databaseURL: "https://train-scheduler-336a3.firebaseio.com",
    projectId: "train-scheduler-336a3",
    storageBucket: "train-scheduler-336a3.appspot.com",
    messagingSenderId: "118713276930"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Initial Values
    var trainName = "";
    var destination = "";
    var time = "";
    var frequency = "";
    var nextArrival = "";
    var minAway = "";

    // Capture Button Click
    $("#submit").on("click", function(event) {
      event.preventDefault();
      console.log("can you see me");
      
      trainName = $("#train_input").val().trim();
      destination = $("#destination_input").val().trim();
      time = $("#time").val().trim();
      frequency = $("#frequency_input").val().trim();

      // Code for the push
      database.ref().push({
        trainName: trainName,
        destination: destination,
        time: time,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

      // Code to clear input fields
      $("#train_input").val("");
      $("#destination_input").val("");
      $("#time").val("");
      $("#frequency_input").val("");

    });

    // Update Train Schedule
    database.ref().on("child_added", function(childSnapshot) {

    //   Log everything that's coming out of snapshot
       console.log(childSnapshot.val().trainName);
       console.log(childSnapshot.val().destination);
       console.log(childSnapshot.val().time);
       console.log(childSnapshot.val().frequency);
       
    //Calculate times
    var time = childSnapshot.val().time.trim();
    // console.log(time);
    // var timeConverted = moment(time.toString()).format("H:mm");
    // var timeConverted = moment(time, "H:mm");
    var timeConverted = moment(time, "H:mm");
    // var timeConverted = moment(childSnapshot.val().time, "H:mm").subtract(1, "years");
    // console.log(timeConverted);

    // alert(moment(timeConverted,"H:mm").isValid());

    // timeConverted = moment(timeConverted).subtract(1, "years");
    // console.log(timeConverted);

    // var currentTime = moment().format("X");
    // console.log(currentTime); 
    // // alert(moment(currentTime,"H:mm").isValid());
    // // var diffTime = currentTime.diff(timeConverted, "seconds");
    // // console.log(diffTime);
    // var a = "03:50";
    // var convertedA = moment(a, "H:mm");
    // // var diffTime = moment().diff(moment(convertedA), "minutes");

    var diffTime = moment().diff(moment(timeConverted), "minutes");
    console.log(diffTime);
    
    var diffTime = moment().diff(moment(timeConverted), "minutes");
    // // var subTime = moment(currentTime, "H:mm").subtract(timeConverted, "minutes");
    console.log(diffTime);

    // var diffTime = moment().diff(childSnapshot.val().time);
    // console.log(diffTime);

    // full list of trains
       $("#trainList").append("<tr><td> " + childSnapshot.val().trainName +
         " </td><td> " + childSnapshot.val().destination +
         " </td><td> " + childSnapshot.val().frequency +
         " </td><td> " + "placeholder next arrival" +
         " </td><td> " + "placeholder minutes away" + " </td></tr>");

     // Handle the errors
     }, function(errorObject) {
       console.log("Errors handled: " + errorObject.code);
    });

    // dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

    //   // Change the HTML to reflect
    //   $("#name-display").html(snapshot.val().name);
    //   $("#email-display").html(snapshot.val().email);
    //   $("#age-display").html(snapshot.val().age);
    //   $("#comment-display").html(snapshot.val().comment);
    // });




});//document ready