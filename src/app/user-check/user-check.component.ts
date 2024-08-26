import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '../../../supabase.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-check',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-check.component.html',
  styleUrls: ['./user-check.component.css']
})
export class UserCheckComponent implements OnInit {
  email: string = '';
  password: string = '';
  message: string = '';
  tokenExists: boolean = false;
  showSignUp: boolean = true;

  constructor(private supabaseService: SupabaseService, private route: ActivatedRoute) {}
  

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const params = new URLSearchParams(fragment);
        const token = params.get('access_token');
        const refreshToken = params.get('refresh_token');

        if (token) {
          localStorage.setItem('access_token', token);
          localStorage.setItem('refresh_token', refreshToken ?? '');
          this.message = 'Email confirmé avec succès !';
          this.tokenExists = true;
        } else {
          this.message = 'Échec de la confirmation de l\'email.';
        }
      }
    });
  }

  async signUp() {
    const { data, error } = await this.supabaseService.signUp(this.email, this.password);
  
    if (data?.user) {
      // Use the client to insert the role
      const { error: insertError } = await this.supabaseService.getClient()
        .from('profiles')
        .insert([{ id: data.user.id, role: 'user' }]);
  
      if (insertError) {
        this.message = 'Inscription réussie, mais erreur lors de la mise à jour du rôle.';
      } else {
        this.message = 'Inscription réussie !';
      }
    } else {
      this.message = error?.message ?? 'Erreur lors de l\'inscription.';
    }
  }

  async login() {
    const { data, error } = await this.supabaseService.signInWithPassword(this.email, this.password);
    
    if (data?.user) {
      this.message = 'Connexion réussie !';
      localStorage.setItem('access_token', data.session?.access_token ?? '');
      
      // Retrieve the user's role from the `profiles` table
      const { data: profileData, error: profileError } = await this.supabaseService.getClient()
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();
  
      if (profileError) {
        console.error('Erreur lors de la récupération du rôle:', profileError.message);
      } else {
        console.log('Role:', profileData?.role);
        // You can store the role in localStorage or elsewhere if needed
        localStorage.setItem('user_role', profileData?.role ?? '');
      }
    } else {
      this.message = error?.message ?? 'Erreur lors de la connexion.';
    }
  }
}