import { NgFor } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, inject } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { EtapeParcours, ParcoursService } from '../../services/parcours.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-journey',
  imports: [TranslateModule, MatTooltipModule, NgFor],
  templateUrl: './journey.component.html',
  styleUrl: './journey.component.css',
})
export class JourneyComponent implements AfterViewInit{

    parcours: EtapeParcours[] = [];
    private parcoursService = inject(ParcoursService);
    destroyRef = inject(DestroyRef);

    ngAfterViewInit(): void {
        this.parcoursService
            .getParcours()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((data) => {
                this.parcours = data.sort((a, b) => this.extractYear(b.annee) - this.extractYear(a.annee));

                // Animation GSAP
                // gsap.from('.etape', {
                // scrollTrigger: {
                //     trigger: '#parcours',
                //     start: 'top 80%',
                //     toggleActions: 'play none none none',
                // },
                // y: 50,
                // opacity: 0,
                // duration: 1,
                // stagger: 0.2,
                // });
            });
    }

    extractYear(annee: string): number {
        if (annee.toLowerCase().includes('aujourd')) return 9999;
        const matches = annee.match(/\d{4}/g);
        if (matches && matches.length > 0) return Math.max(...matches.map(Number));
        return 0;
    }
}
