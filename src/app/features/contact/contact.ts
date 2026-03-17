import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="py-24 max-w-7xl mx-auto px-6">
      <div class="grid md:grid-cols-2 gap-16">
        <div>
          <h2 class="text-4xl font-bold mb-8 gradient-text inline-block">Get In Touch</h2>
          <p class="text-lg opacity-70 mb-12">
            Have a project in mind or just want to say hi? Feel free to 
            reach out through the form or my social media channels.
          </p>
          
          <div class="space-y-6">
            <div class="flex items-center gap-6">
              <div class="w-14 h-14 glass rounded-2xl flex items-center justify-center text-2xl">📧</div>
              <div>
                <p class="text-sm opacity-60">Email Me</p>
                <p class="text-lg font-bold">bilal.hamwia1&#64;gmail.com</p>
              </div>
            </div>
            <div class="flex items-center gap-6">
              <div class="w-14 h-14 glass rounded-2xl flex items-center justify-center text-2xl">📱</div>
              <div>
                <p class="text-sm opacity-60">Call Me</p>
                <p class="text-lg font-bold">+963 932329731</p>
              </div>
            </div>
            <div class="flex items-center gap-6">
              <div class="w-14 h-14 glass rounded-2xl flex items-center justify-center text-2xl">📍</div>
              <div>
                <p class="text-sm opacity-60">Location</p>
                <p class="text-lg font-bold">Damascus, Syria</p>
              </div>
            </div>
          </div>
        </div>

        <div class="glass p-8 md:p-12 rounded-[2rem]">
          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div>
              <label class="block text-sm font-bold mb-2">Full Name</label>
              <input type="text" formControlName="name"
                     class="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary-start outline-none transition-colors"
                     placeholder="John Doe">
            </div>
            <div>
              <label class="block text-sm font-bold mb-2">Email Address</label>
              <input type="email" formControlName="email"
                     class="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary-start outline-none transition-colors"
                     placeholder="john&#64;example.com">
            </div>
            <div>
              <label class="block text-sm font-bold mb-2">Message</label>
              <textarea formControlName="message" rows="4"
                        class="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary-start outline-none transition-colors resize-none"
                        placeholder="Your project details..."></textarea>
            </div>
            <button type="submit" [disabled]="contactForm.invalid"
                    class="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-primary-start to-primary-end hover:shadow-xl hover:shadow-primary-start/20 transition-all disabled:opacity-50">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  `
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      // Handle form submission
      this.contactForm.reset();
      alert('Thank you! Your message has been sent.');
    }
  }
}
