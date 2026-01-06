import { AfterViewInit, Component, DestroyRef, ElementRef, inject, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NgIf } from '@angular/common';
import { AboutComponent } from '../../components/about/about.component';
import { JourneyComponent } from '../../components/journey/journey.component';
import { SkillsComponent } from '../../components/skills/skills.component';
import { ProfessionalExperienceComponent } from '../../components/professional-experience/professional-experience.component';
import { ProfilComponent } from '../../components/profil/profil.component';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  imports: [
    TranslateModule,
    ProfilComponent,
    AboutComponent,
    JourneyComponent,
    SkillsComponent,
    ProfessionalExperienceComponent,
    NgIf,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit{
  @ViewChild('sections', { static: true }) sections!: ElementRef<HTMLElement>;
  @ViewChild('container', { static: true }) container!: ElementRef;
  sectionActive = false;
  destroyRef = inject(DestroyRef);
  private scrollHost: HTMLElement | Window | null = null;
  atTop: boolean = true;

  private onScroll = () => {
    const host = this.scrollHost;
    if (!host || host === window)
      this.atTop = window.scrollY === 0;
    else
      this.atTop = (host as HTMLElement).scrollTop === 0;
  };

  ngAfterViewInit(): void {
    gsap.context(() => {
      const tl = gsap.timeline();
      tl.from('.intro-title', {
                y: -50,
                opacity: 0,
                duration: 1,
                ease: 'power2.out',
              })
        .from(
                '.intro-subtitle',
                {
                  y: 20,
                  opacity: 0,
                  duration: 1,
                  ease: 'power2.out',
                },
                '-=0.5'
              )
        .from(
                '.intro-button',
                {
                  scale: 0.8,
                  opacity: 0,
                  duration: 0.8,
                  ease: 'back.out(1.7)',
                  clearProps: 'opacity,scale',
                },
                '-=0.5'
              );
    }, this.container.nativeElement);
    this.scrollHost = this.findScrollHost();

    if (!this.scrollHost || this.scrollHost === window)
      window.addEventListener('scroll', this.onScroll);
    else
      (this.scrollHost as HTMLElement).addEventListener('scroll', this.onScroll);
    this.onScroll();

    this.destroyRef.onDestroy(() => {
      const host = this.scrollHost;
      if (!host) return;
      if (host === window) 
        window.removeEventListener('scroll', this.onScroll);
      else
        (host as HTMLElement).removeEventListener('scroll', this.onScroll);
    });
  }

  private findScrollHost(): HTMLElement | Window {
    let el: HTMLElement | null = this.sections.nativeElement;
    while (el && el.parentElement) {
      const style = getComputedStyle(el);
      const overflowY = style.overflowY;
      const canScroll = el.scrollHeight > el.clientHeight;
      if (canScroll && (overflowY === 'auto' || overflowY === 'scroll')) {
        console.log('[ContactComponent] scrollHost trouvé :', el);
        return el;
      }
      el = el.parentElement;
    }
    console.log('[ContactComponent] scrollHost = window');
    return window;
  }

  scrollToPortfolio(): void {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToTop() {
    const host = this.scrollHost;
    if (!host || host === window)
      window.scrollTo({ top: top ? 0 : 283, behavior: 'smooth' });
    else
      (host as HTMLElement).scrollTo({ top: top ? 0 : 283, behavior: 'smooth' });
  }

}
