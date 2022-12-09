import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Gym';

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
      this.primengConfig.ripple = true;
      this.primengConfig.setTranslation({
        "startsWith": "Comienza con",
        "contains": "Contiene",
        "notContains": "No contiene",
        "endsWith": "Termina con",
        "equals": "Es igual",
        "notEquals": "No es igual",
        "noFilter": "Sin filtro",
        "lt": "Es menor que",
        "lte": "Es menor o igual que",
        "gt": "Es mayor que",
        "gte": "Es mayor o igual que",
        "is": "Es",
        "isNot": "No es",
        "before": "Antes de",
        "after": "Despues de",
        "dateIs": "La fecha es",
        "dateIsNot": "La fecha no es",
        "dateBefore": "La fecha es anterior a",
        "dateAfter": "La fecha es despues a",
        "clear": "Borrar",
        "apply": "Aplicar",
        "matchAll": "Concidir con todos",
        "matchAny": "Concidir con cualquiera",
        "addRule": "Agregar regla",
        "removeRule": "Remover regla",
        "accept": "Si",
        "reject": "No",
        "choose": "Elegir",
        "upload": "Subir",
        "cancel": "Cancelar",
        "dayNames": ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
        "dayNamesShort": ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
        "dayNamesMin": ["Do","Lu","Ma","Mi","Ju","Vu","Sa"],
        "monthNames": ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
        "monthNamesShort": ["Ene", "Feb", "Mar", "Abr", "May", "Jun","Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        "dateFormat": "dd/mm/yy",
        "firstDayOfWeek": 0,
        "today": "Hoy",
        "weekHeader": "sm",
        "weak": "Débil",
        "medium": "Medio",
        "strong": "Alto",
        "passwordPrompt": "Ingrese una contraseña",
        "emptyMessage": "No se encontraron resultados",
        "emptyFilterMessage": "No se encontraron resultados"
    });
  }
}
