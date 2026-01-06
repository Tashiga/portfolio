import { NgFor } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, inject } from '@angular/core';
import { EtapeSkills, SkillsService } from '../../services/skills.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-skills',
  imports: [NgFor, TranslateModule, MatTooltipModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements AfterViewInit {

  skills: EtapeSkills[] = [];
  private skillsService = inject(SkillsService);
  destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    this.skillsService
      .getSkills()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => (this.skills = data));
  }
}
