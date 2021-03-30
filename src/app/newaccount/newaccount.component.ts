import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthentificationService} from '../_services/authentification.service';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-newaccount',
  templateUrl: './newaccount.component.html',
  styleUrls: ['./newaccount.component.css']
})
export class NewaccountComponent implements OnInit {

  form: any = {
	nom: null,
	prenom: null,
	pseudo: null,
    email: null,
    password: null
  };
  
  loading = false;
  returnUrl: string;
  error = '';

  formulaire = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    prenom: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    pseudo: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*[0-9]).*$')]),
    confirmPassword: new FormControl('')
  }, this.checkPasswords);

    constructor(private messageService: MessageService, private authService: AuthentificationService, private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
	  this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;

    return password !== confirmPassword ? { invalid: true } : null;
  }
  
  	get nom(): AbstractControl {
		return this.formulaire.get('nom');
	}

	get prenom(): AbstractControl {
		return this.formulaire.get('prenom');
	}

    get pseudo(): AbstractControl {
        return this.formulaire.get('pseudo');
    }
    
    get email(): AbstractControl {
        return this.formulaire.get('email');
    }
    
    get password(): AbstractControl {
		return this.formulaire.get('password');
	}
	
	get confirmPassword(): AbstractControl {
		return this.formulaire.get('confirmPassword');
	}
    
    onSubmit(): void {
		this.form = {...this.form, ...this.formulaire.value};
		this.loading = true;
		this.authService.register(this.form.prenom, this.form.nom, this.form.pseudo, this.form.email, this.form.password)
		.pipe(first())
      .subscribe(
        () => {
          this.router.navigate([this.returnUrl]);
          this.messageService.add({severity: 'info', summary: 'Création', detail: `Compte créé`, key: 'main'});
        },
        error => {
          console.log('Erreur: ', error);
          // this.error = error.error.data.values[0];
          this.loading = false;
          this.messageService.add({severity: 'error', summary: 'Erreur', detail: this.error, key: 'main'});
        }
      );
    

  }

}


