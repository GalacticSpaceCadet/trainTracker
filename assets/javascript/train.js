var config = {
    apiKey: "AIzaSyB_D6jU5m4bSDWQSHewQMOKCGaYHDWGqlU",
    authDomain: "trainsched-1db71.firebaseapp.com",
    databaseURL: "https://trainsched-1db71.firebaseio.com",
    storageBucket: "trainsched-1db71.appspot.com",
    messagingSenderId: "818190182791"
};

firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var destination = "";
var time = "";
var frequency = 0;
var nextArrival = 0;

$("#submit").on("click", function(event) {


    event.preventDefault();
    name = $("#name").val().trim();
    destination = $("#destination").val().trim();
    time = $("#time").val().trim();
    frequency = $("#frequency").val().trim();

   
    // setting data back to ensure time continium is ok
    var initialTConverted = moment(time, "hh:mm").subtract(1, "years");
    //log current time to have a start point for calculation
    var currentTime = moment();
    //calculate the time diff
    var timeDiff = moment().diff(moment(initialTConverted), "minutes");
    // using module to cal time remaining to train arrival at station
    var tRemaining = timeDiff % frequency;
    //returns minutes to the next train
    var minutesAway = frequency - tRemaining;
    //shows the time the train is scheduled to arrive in station
    var arrival = moment().add(minutesAway, "minutes");
    var nextArrival = moment(arrival).format("hh:mm");
      
 /*console.log("ARRIVALTIME: " + moment(arrival).format("hh:mm"));
 console.log(initialTConverted);
 console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
 console.log("DIFFRENCEINTIME: " + timeDiff);
 console.log(tRemaining);
 console.log("MINUTESTOTRAIN: " + minutesAway);*/

 $(".form-control").val("");




    database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        tRemaining: tRemaining,
        nextArrival: nextArrival,
        minutesAway: minutesAway,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    });
});

database.ref().orderByChild("dateAdded").on("child_added", function(snapshot){

      $(".table").append("<tr><td>" + snapshot.val().name + "</td><td>" + snapshot.val().destination + "</td><td>" +  snapshot.val().frequency + "</td><td>" + snapshot.val().nextArrival + "</td><td>" + snapshot.val().minutesAway + "</td><td>" + "</td></tr>");

  });
