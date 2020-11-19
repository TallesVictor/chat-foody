import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import * as $ from 'jquery';
export class LIBRARY {
  static cnpjValidation(value: AbstractControl): { [key: string]: boolean } {
    value = value.value;
    if (!value) {
      return { cnpjValidation: true };
    }

    // Aceita receber o valor como string, número ou array com todos os dígitos
    const validTypes =
      typeof value === 'string' ||
      Number.isInteger(value) ||
      Array.isArray(value);

    // Elimina valor em formato inválido
    if (!validTypes) {
      return { cnpjValidation: true };
    }

    // Guarda um array com todos os dígitos do valor
    const match = value.toString().match(/\d/g);
    const numbers = Array.isArray(match) ? match.map(Number) : [];

    // Valida a quantidade de dígitos
    if (numbers.length !== 14) {
      return { cnpjValidation: true };
    }

    // Elimina inválidos com todos os dígitos iguais
    const items = [...new Set(numbers)];
    if (items.length === 1) {
      return { cnpjValidation: true };
    }

    // Cálculo validador
    const calc = (x) => {
      const slice = numbers.slice(0, x);
      let factor = x - 7;
      let sum = 0;

      for (let i = x; i >= 1; i--) {
        const n = slice[x - i];
        sum += n * factor--;
        if (factor < 2) {
          factor = 9;
        }
      }

      const result = 11 - (sum % 11);

      return result > 9 ? 0 : result;
    };

    // Separa os 2 últimos dígitos de verificadores
    const digits = numbers.slice(12);

    // Valida 1o. dígito verificador
    const digit0 = calc(12);
    if (digit0 !== digits[0]) {
      return { cnpjValidation: true };
    }

    // Valida 2o. dígito verificador
    const digit1 = calc(13);
    if (digit1 === digits[1]) {
      return null;
    }
    return { cnpjValidation: true };
  }

  static carregando(): void {
    $('#carregando').show();
  }
  static ocultar(): void {
    $('#carregando').hide();
  }

  static verificar(name: string, valid: any, message: string, form: FormGroup): void {
    let html = null;
    const verificacao =
      (form.get(name).errors?.required ||
        form.get(name).errors?.minlength ||
        form.get(name).errors?.maxlength) &&
      (form.get(name).touched || valid);

    if (verificacao) {
      html = `<div class="col-sm-12">
                    <div class="alert alert-danger">
                        Informe ${message} corretamente!
                    </div>
                </div>`;
    }
    return html;
  }
}
