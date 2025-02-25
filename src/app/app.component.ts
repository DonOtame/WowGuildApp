import { Component, inject, Renderer2 } from '@angular/core';
import { HeaderComponent } from '@core/components/header/header.component';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import LayoutComponent from '@core/layout/layout.component';
import { LanguajeSelectorComponent } from "./core/components/languaje-selector/languaje-selector.component";
import { environment } from '@env/environment';


@Component({
  selector: 'app-root',
  imports: [LayoutComponent, HeaderComponent, NavbarComponent, LanguajeSelectorComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'AbyssApp';

  private renderer = inject(Renderer2)

  ngOnInit(): void {
    this.updateFavicon();
  }

  private updateFavicon(): void {
    const link = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (link) {
      this.renderer.setAttribute(link, 'href', environment.favicon);
    }
  }

}
