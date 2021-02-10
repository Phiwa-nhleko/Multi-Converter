import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
    imports:[MatButtonModule, MatSidenavModule, MatToolbarModule, MatIconModule,
        MatListModule, MatInputModule, MatFormFieldModule, MatSelectModule,
        MatCardModule, MatSnackBarModule],

    exports:[MatButtonModule, MatSidenavModule, MatToolbarModule, MatIconModule,
        MatListModule, MatInputModule, MatFormFieldModule, MatSelectModule, 
        MatCardModule, MatSnackBarModule]
})

export class MaterialModule{}