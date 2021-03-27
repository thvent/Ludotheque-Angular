import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';

declare var solver: any;

@Component({
  selector: 'app-lp-solver-test',
  templateUrl: './lp-solver-test.component.html',
  styleUrls: ['./lp-solver-test.component.css']
})
export class LpSolverTestComponent implements OnInit {


  readonly probleme = {
    variables: {
      s1: {
        p1: 5,
        p2: 8,
        p3: 5,
        benefice: 4.2
      },
      s2: {
        p1: 7,
        p2: 3,
        p3: 8,
        benefice: 5.1
      }
    },
    ints: {s1: 1, s2: 1},
    binaries: {},
    constraints: {
      p1: {max: 200},
      p2: {max: 250},
      p3: {max: 220}
    },
    opType: 'max',
    optimize: 'benefice'
  };

  constructor(public messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  resolutionProbleme(): void {
    const resultat = solver.Solve(this.probleme);
    console.log(resultat);
    const nbS1 = resultat.s1;
    const nbS2 = resultat.s2;
    const beneficeTotal = resultat.result;
    const affiche = `Solution : Sachets S1 :  ${nbS1}, Sachets S2 : ${nbS2}, Bénéfice : ${beneficeTotal}`;
    this.messageService.add({
      key: 'main',
      severity: 'info',
      detail: `${affiche}`,
    });
  }

}
