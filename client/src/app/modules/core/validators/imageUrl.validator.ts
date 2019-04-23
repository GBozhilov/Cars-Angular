import { AbstractControl } from "@angular/forms";

function imageUrlValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value === "" || control.value === null) {
        return;
    }

    if (control.value.startsWith('http') && (control.value.endsWith('.jpg') || control.value.endsWith('.jpeg') || control.value.endsWith('.png'))) {
        return null;
    } else {
        return { 'image': true };
    }
}

export default imageUrlValidator;