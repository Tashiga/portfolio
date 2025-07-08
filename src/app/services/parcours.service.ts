import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EtapeParcours {
  annee: string;
  titre: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class ParcoursService {
  private http = inject(HttpClient);

  getParcours(): Observable<EtapeParcours[]> {
    return this.http.get<EtapeParcours[]>('assets/data/parcours.json');
  }
}
