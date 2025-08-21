import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EtapeSkills {
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private http = inject(HttpClient);

  getSkills(): Observable<EtapeSkills[]> {
    return this.http.get<EtapeSkills[]>('assets/data/skills.json');
  }
}
