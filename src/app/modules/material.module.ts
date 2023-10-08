import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule ({
  exports: [
    MatSlideToggleModule,
    MatFormFieldModule, 
    MatInputModule,

  ]
})

export class MaterialModule {}