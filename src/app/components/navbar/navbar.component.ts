import { AfterViewInit, Component, HostListener, signal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgClass, NgFor } from '@angular/common';
import { DEFAULT_LANG, LANGUAGES } from '../../constants';

import { inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [NgClass, NgFor, TranslateModule, RouterLink, 
    // RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  currentLang: string = DEFAULT_LANG;
  languages = LANGUAGES;
  private translate = inject(TranslateService);
  private scrollHost: HTMLElement | Window | null = null;

  compact = signal(false);

  private lastY = 0;
  private ticking = false;
  private downThreshold = 16; // évite le jitter
  private upThreshold = 8; // hysteresis légère

  @HostListener('window:scroll')
  onScroll() {
    const y = window.scrollY || 0;

    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(() => {
        // Si on est tout en haut → reset en "grand"
        if (y <= 0) {
          this.compact.set(false);
          this.lastY = 0;
          this.ticking = false;
          return;
        }

        // Descente suffisante → compact
        if (y - this.lastY > this.downThreshold) {
          this.compact.set(true);
          this.lastY = y;
          this.ticking = false;
          return;
        }

        // Montée suffisante → taille initiale
        if (this.lastY - y > this.upThreshold) {
          this.compact.set(false);
          this.lastY = y;
          this.ticking = false;
          return;
        }

        // Mise à jour légère sans changer d'état
        this.lastY = y;
        this.ticking = false;
      });
    }
  }

  constructor() {
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
  }

  scrollToParcours(): void {
    document.getElementById('parcours')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToAbout(): void {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToItem(item: string): void {
    if(item) {
      document.getElementById(item)?.scrollIntoView({behavior: 'smooth'});
    }
  }

  scrollTop() {
    const host = this.scrollHost;
    if (!host || host === window)
      window.scrollTo({ top: top ? 0 : 283, behavior: 'smooth' });
    else
      (host as HTMLElement).scrollTo({ top: top ? 0 : 283, behavior: 'smooth' });
  }
}
