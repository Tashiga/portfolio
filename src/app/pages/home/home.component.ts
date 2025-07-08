import { Component, AfterViewInit, ElementRef, ViewChild, inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ParcoursService, EtapeParcours } from '../../services/parcours.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, CommonModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('container', { static: true }) container!: ElementRef;

  parcours: EtapeParcours[] = [];
  private parcoursService = inject(ParcoursService);

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

    this.parcoursService.getParcours().subscribe((data) => {
      this.parcours = data.sort((a, b) => this.extractYear(b.annee) - this.extractYear(a.annee));

      // Animation GSAP
      gsap.from('.etape', {
        scrollTrigger: {
          trigger: '#parcours',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
      });
    });
  }

  scrollToParcours(): void {
    document.getElementById('parcours')?.scrollIntoView({ behavior: 'smooth' });
  }

  extractYear(annee: string): number {
    if (annee.toLowerCase().includes('aujourd')) return 9999;
    const matches = annee.match(/\d{4}/g);
    if (matches && matches.length > 0) return Math.max(...matches.map(Number));
    return 0;
  }
}
