import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { delay, map, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "ATAL Registration"

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private loader: LoadingBarService) {
    
  }

  loaders = this.loader.value$.pipe(
    delay(500),
    withLatestFrom(this.loader.value$),
    map(v => v[1])
  )
}
