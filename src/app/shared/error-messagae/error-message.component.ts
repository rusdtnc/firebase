import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

/**
 * Composant gérant l'affichage d'un message d'erreur, si le champ associé est dirty et en erreur
 */
@Component({
    selector: 'app-error-message',
    templateUrl: './error-message.component.html'
})
export class ErrorMessageComponent {

    @Input()
    fieldName: string;

    @Input()
    errorName: string;

    @Input()
    formGroup: AbstractControl;


    /**
     * @return {boolean} true si le champ contient l'erreur
     */
    hasFieldErrors(): boolean {

        let ctrl: AbstractControl;
        if (this.fieldName) {
            ctrl = this.formGroup.get(this.fieldName);
            if (ctrl) {
                return ctrl.touched && ctrl.hasError(this.errorName);
            }
        } else {
            ctrl = this.formGroup;
            if (ctrl) {
                return ctrl.hasError(this.errorName);
            }
        }
        return false;
    }

}
