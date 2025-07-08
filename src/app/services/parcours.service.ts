import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EtapeParcours {
  annee: string;
  titre: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ParcoursService {
  constructor(private http: HttpClient) {}

  getParcours(): Observable<EtapeParcours[]> {
    return this.http.get<EtapeParcours[]>('assets/data/parcours.json');
  }
}
