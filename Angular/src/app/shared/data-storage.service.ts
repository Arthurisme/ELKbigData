import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

import {Legend} from '../Legends/Legend.model';
import {LegendService} from '../Legends/Legend.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private LegendService: LegendService) {

  }


  //HttpHeaders headers1 = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
  headers1 = new HttpHeaders().set('Access-Control-Allow-Origin', 'localhost');

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',

      'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Max-Age': '3600',

      'Access-Control-Allow-Credentials': 'true'
    })
  };


  storeLegends() {
    const Legends = this.LegendService.getLegends();
    this.http
      .put(
        'https://ng-course-Legend-book-65f10.firebaseio.com/Legends.json',
        Legends
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchLegends(startDate: string, endDate: string, pageNumber?: number) {

    if(startDate === undefined || endDate === undefined){
      return ;
    }


    //return this.http.get('http://localhost:8001/api/welcome', httpOptions);
    //return this.http.get('http://localhost:8001/api/legend/v1/legends/a/a');

    // let startDate = '2011-06-01';
    // let endDate = '2013-08-01';

    var urlString;

    if (pageNumber === null || pageNumber === undefined) {
      urlString = 'http://localhost:8001/api/legend/v1/legends/datebetween?startdate=' + startDate + '&enddate=' + endDate;

    } else {
      urlString = 'http://localhost:8001/api/legend/v1/legends/datebetween?startdate=' + startDate + '&enddate=' + endDate + '&page=' + pageNumber + '&size=25';
    }
    console.log('urlString:', urlString);


    return this.http
      .get<Legend[]>(urlString)
      .pipe(
        map(Legends => {
          console.log('data:', Legends);
          return Legends.map(Legend => {
            return {
              ...Legend,
              ingredients: Legend.ingredients ? Legend.ingredients : []
            };
          });
        }),
        tap(Legends => {
          this.LegendService.setLegends(Legends);
        })
      );
  }

  fetchLegend(uuid: string) {


    return this.http
      .get<Legend>(
        'http://localhost:8001/api/legend/v1/legends/' + uuid
      )
      .pipe(
        map(Legend => {
          console.log('data:', Legend);
          return Legend;
        }),
        tap(Legend => {
          this.LegendService.setLegend(Legend);
        })
      );
  }

}
