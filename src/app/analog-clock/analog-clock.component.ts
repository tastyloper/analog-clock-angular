import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analog-clock',
  template: `
    <div class="clock">
      <div class="analog-clock">
        <div class="hour hand" [style.transform]="hour"></div>
        <div class="minute hand" [style.transform]="minute"></div>
        <div class="second hand" [style.transform]="second"></div>
        <div class="center-circle"></div>
      </div>
      <div class="digital-clock">{{nowTime}}</div>
    </div>
  `,
  styles: [`
    .analog-clock {
      position: relative;
      margin: 100px auto 0;
      width: 200px;
      height: 200px;
      background-color: aliceblue;
      border-radius: 50%;
    }
    .hand {
      position: absolute;
      left: 50%;
      width: 1px;
      height: 100px;
      /* 자바스크립트에 의해 덮어써진다. */
      /* transform: translate3d(-50%, 0, 0); */
      transform-origin: 100% 100%;
    }
    .hour {
      background-color: #f44336;
    }
    .minute {
      background-color: #3f51b5;
    }
    .second {
      background-color: #9e9e9e;
    }
    .center-circle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      width: 12px;
      height: 12px;
      background-color: black;
      border-radius: 50%;
    }
    .digital-clock {
      position: absolute;
      top: 350px;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
      font-size: 2em;
      font-family: 'Source Code Pro', monospace;
    }
  `]
})
export class AnalogClockComponent implements OnInit {
  nowTime: string;
  hour: string;
  minute: string;
  second: string;

  constructor() { }

  ngOnInit() {
    this.time();
  }

  time() {
    setInterval(() => {
      const date = new Date;
      const dateTime = date.toTimeString();
      this.nowTime = dateTime.substring(0, 8);
      const dateLocalTime = date.toLocaleTimeString().split(' ')[1];
      const dateLocalTimeSplit = dateLocalTime.split(':');
      const dateHour = +dateLocalTimeSplit[0];
      const dateMinute = +dateLocalTimeSplit[1];
      const dateSecond = +dateLocalTimeSplit[2];
      this.hour = `rotate(${(dateHour + ((dateMinute + (dateSecond / 60)) / 60)) / 12 * 360}deg)`;
      this.minute = `rotate(${(dateMinute + (dateSecond / 60)) / 60 * 360}deg)`;
      this.second = `rotate(${dateSecond / 60 * 360}deg)`;
    }, 1000);
  }
}
