import { FormGroup } from "@angular/forms";

function passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    if (group) {
        if (group.get("password").value !== group.get("repeatPassword").value) {
            return { notMatching: true };
        }
    }

    return null;
}

export default passwordMatchValidator;