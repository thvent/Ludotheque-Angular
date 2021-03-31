import {User} from './user';
import {Observable} from 'rxjs';
import {Jeu} from './jeu';

export interface UserInfo extends User{
  jeux: Observable<Jeu>;
  created_at: string;
  updated_at: string;
}
