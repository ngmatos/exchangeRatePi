import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  eurChf: string = 'fetching...';
  chfEur: string = 'fetching...';
  bitcoinUSD: any;
  bitcoinEUR: any;
  bitcoinCHF: any;

  apiKey: string = 'ba5934e4c2c7741a641dbb55';
  baseUrl: string = 'https://v3.exchangerate-api.com/bulk/';

  constructor(private http: Http) {
    this.getData();
    setInterval(() => {
      this.getData();
    }, 3600000);
  }

  getData() {
    // EUR to CHF
    this.http.get(this.baseUrl + this.apiKey + '/EUR').subscribe(res => {
      var json = res.json();
      this.eurChf = json.rates.CHF;
    });
    // CHF TO EUR
    this.http.get(this.baseUrl + this.apiKey + '/CHF').subscribe(res => {
      var json = res.json();
      this.chfEur = json.rates.EUR;
    });

    // BITCOIN
    // USD CHF EUR
    this.http.get('https://blockchain.info/pt/ticker').subscribe(res => {
      var json = res.json();
      this.bitcoinUSD = json.USD;
      this.bitcoinEUR = json.EUR;
      this.bitcoinCHF = json.CHF;
    });
  }
}
