import { Component } from '@angular/core';

import flights  from './../assets/flights.json';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public flightData = [];
 
  constructor (private httpService: HttpClient) { }
 

  ngOnInit() {
	 console.log(flights);
	  
	let items = [];

    let itineraries = flights.itineraries;

    let legs = flights.legs;

    if (itineraries && itineraries.length > 0) {

      itineraries.forEach(function (value) {

        if (value.legs && value.legs.length > 0) {

          let data = {
            price: value.price,
            agent: value.agent,
            img: "",
            from1: "",
            to1: "",
            from2: "",
            to2: "",

            fromTime1: "",
            toTime1: "",
            fromTime2: "",
            toTime2: "",
            stops1: "",
			stops2: "",
            duration1: "",
			duration2: "",
			color1: "",
			color2: "",
          };


          value.legs.forEach(function (item, index) {
            if (legs && legs.length > 0) {

              legs.forEach(function (leg) {
                if (leg.id === item) {
					
					var num = leg.duration_mins;
                    var hours = (num / 60);
                    var rhours = Math.floor(hours);
                    var minutes = (hours - rhours) * 60;
                    var rminutes = Math.round(minutes);

					
                  data.img = "https://logos.skyscnr.com/images/airlines/favicon/" + leg.airline_id + ".png";
				
				  
                  if (index === 0) {
					  if(leg.stops === 0)
				  {
					  data.color1="green";
				  }
				  else{
					  data.color1="red";
				  }
                    data.from1 = leg.departure_airport;
                    data.to1 = leg.arrival_airport;
                    data.fromTime1 = leg.departure_time;
                    data.toTime1 = leg.arrival_time;
					data.stops1 = leg.stops === 0 ? "Direct" : leg.stops + " Stop";
                  data.duration1 =rhours + "h " + rminutes;
                  }
                  else {
					  if(leg.stops === 0)
				  {
					  data.color2="green";
				  }
				  else{
					  data.color2="red";
				  }
					  data.from2 = leg.departure_airport;
                    data.to2 = leg.arrival_airport;
                    data.fromTime2 = leg.departure_time;
                    data.toTime2 = leg.arrival_time;
					data.stops2 = leg.stops === 0 ? "Direct" : leg.stops + " Stop";
                  data.duration2 = rhours + "h " + rminutes;
                  }

                  
                }
              });
            }
          });

          items.push(data);
        }
        
      });
    }
	  this.flightData=items;
  }
}
