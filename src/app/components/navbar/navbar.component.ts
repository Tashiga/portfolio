import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgClass, NgFor } from '@angular/common';
import { DEFAULT_LANG, LANGUAGES } from '../../constants';

import { inject } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [NgClass, NgFor, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  currentLang: string = DEFAULT_LANG;
  languages = LANGUAGES;
  private translate = inject(TranslateService);

  constructor() {
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
  }
}
