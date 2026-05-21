# Umamusume Wiki - React Project

Examen Práctico: Sistema Web con React | FullStackOpen Partes 1-3

## Descripción del Proyecto

Umamusume Wiki es una aplicación web interactiva dedicada a la franquicia Umamusume: Pretty Derby. El proyecto proporciona información completa sobre personajes jugables (trainees), cartas de apoyo (support cards), habilidades (skills), banners activos y eventos. La aplicación integra gestión avanzada de estados con React, consumo de datos externos mediante APIs, y un sistema de autenticación con permisos administrativos para edición de contenido.

## Requerimientos del Proyecto

Los siguientes requerimientos han sido implementados conforme a la evaluación de competencias:

### Desarrollo (React - Componentes Funcionales y Hooks)

El proyecto utiliza exclusivamente componentes funcionales con hooks de React:

- `useState`: Gestión de estados para búsqueda, filtros, ordenamiento, formularios de adición/edición, y estados administrativos.
- `useEffect`: Control del ciclo de vida con obtención de datos al montar componentes y manejo de cancelación de peticiones.

Arquitectura de componentes:

- **App.jsx**: Componente raíz que orquesta la navegación, autenticación y gestión de permisos administrativos mediante states (isAdmin, isLogged, view).
- **Navbar.jsx**: Componente de navegación que renderiza una lista de tabs.
- **Tab.jsx**: Componente presentacional que recibe nombre, imagen y event handler para cambiar de vista.
- **MainPage.jsx**: Página de bienvenida con efecto de fondo dinámico usando useEffect.
- **TierlistPage.jsx**: Componente con tabulación para mostrar tier lists de trainees y support cards con Promise.all para cargas paralelas.
- **BannerPage.jsx**: Visualización de banners activos con obtención de datos asincrónica.
- **TraineePage.jsx y SupportPage.jsx**: Páginas con búsqueda en tiempo real, filtrado por criterios, ordenamiento dinámico, y funcionalidades CRUD para administradores.
- **SkillPage.jsx y EventPage.jsx**: Páginas informativas con diferentes estructuras de presentación.
- **Tierlist.jsx**: Componente que mapea arrays de tiers y sus miembros, renderizando imágenes dentro de celdas.
- **TierDataSheet.jsx**: Componente de tabla con edición inline, eliminación, y botones administrativos que cambian según el estado (rowInEdition, rowToDelete).
- **BannerDataSheet.jsx y SkillDataSheet.jsx**: Componentes presentacionales que mapean datos en filas de tabla.
- **Login.jsx**: Sistema de autenticación con validación de credenciales y renderización condicional de overlay.

### Datos (API Externa con Axios y Servicio Personalizado)

Se implementó un servicio centralizado de base de datos que abstrae las llamadas HTTP:

- Servicio `dbService` con métodos CRUD: `getData()`, `addData()`, `editData()`, `deleteData()`
- Uso de `axios` con `AbortController` para cancelar peticiones pendientes y prevenir memory leaks
- Manejo de promesas encadenadas con `.then()`, `.catch()`, `.finally()` en múltiples componentes
- Estados de carga (`isLoading`) para mejorar la experiencia de usuario
- Integración con `db.json` mediante JSON Server para simular una API REST local
- Manejo de cancelación de peticiones verificando `axios.isCancel(error)` antes de mostrar errores

### Interactividad (Formularios con Validación y Renderización Dinámica)

Se implementaron múltiples niveles de interactividad avanzada:

- **Búsqueda en Tiempo Real**: Búsqueda insensible a mayúsculas con `.toLowerCase().includes()` y `.trim()` en TraineePage y SupportPage.
- **Ordenamiento Dinámico**: Método `.toSorted()` con mapeos de rareza y tier para conversión de valores textuales a numéricos.
- **Formularios Validados**: Validación de campos obligatorios con `window.alert()` antes de submit en adición y edición.
- **Edición Inline**: Estados `rowInEdition` y `draft` que permiten editar registros directamente en la tabla sin modales.
- **Eliminación Confirmada**: Estado `rowToDelete` para confirmar eliminación antes de ejecutar la acción.
- **Control de Acceso**: Funcionalidades CRUD visibles solo para usuarios con `isAdmin === true`.
- **Renderización Condicional**: Múltiples vistas basadas en estados (isAdmin, isLogged, view, activeTierlist) usando operadores ternarios.
- **Tabulación Interactiva**: Sistema de tabs en TierlistPage que permite cambiar entre trainees y support cards.
- **Manejo de Efectos Secundarios**: useEffect con cleanup functions para abortar controladores y limpiar listeners.

### Código (Estructura Modular y Limpia)

Se siguieron convenciones profesionales de React:

- Separación clara de responsabilidades entre componentes de página, dataSheets y componentes de navegación.
- Componentes presentacionales sin lógica (BannerDataSheet, SkillDataSheet) que reciben datos vía props.
- Componentes contenedores con lógica de estado complejos (TraineePage, SupportPage, TierlistPage).
- Nombres descriptivos siguiendo convención camelCase para variables y PascalCase para componentes.
- Reutilización mediante props drilling para paso de datos, callbacks y event handlers.
- Código limpio sin variables globales, console.logs de depuración mantenidos donde corresponde.
- Estados organizados de forma lógica (datos principales, UI, formularios).

## Instrucciones de Ejecución

### Prerequisitos

- Node.js versión 14 o superior (descargar desde https://nodejs.org/)
- npm versión 6 o superior (se instala con Node.js)

### Pasos para ejecutar la aplicación

1. Clonar el repositorio:

```bash
git clone https://github.com/JCRD05/umamusume-wiki--react
cd umamusume-wiki--react
```

2. Instalar las dependencias del proyecto:

```bash
npm install
```

3. En una terminal, iniciar el servidor JSON (backend local):

```bash
npm run server
```

4. En otra terminal, iniciar el servidor de desarrollo:

```bash
npm run dev
```

5. Abrir la aplicación en el navegador:

La aplicación estará disponible en http://localhost:5173

### Credenciales de Prueba

Para acceder con permisos de administrador:
- Usuario: Admin
- Contraseña: Admin

Para acceder como usuario normal, ingresa cualquier usuario y contraseña no vacíos.

## Reflexión Técnica: Retos Enfrentados y Soluciones

### Gestión de Datos Asíncronos con Cancelación de Peticiones

Desafío: Cuando el usuario navega rápidamente entre páginas, las peticiones pendientes pueden completarse después de desmontar el componente, causando memory leaks y actualizaciones de estado en componentes desmontados. Esto genera warnings de React y comportamiento impredecible.

Solución: Se implementó `AbortController` en todos los `useEffect` que realizan peticiones HTTP. Cada petición recibe `{ signal: controller.signal }` como parámetro, permitiendo cancelarla en el cleanup function. Se verifica `!axios.isCancel(error)` antes de mostrar errores en consola, evitando alertas sobre cancelaciones intencionales. Ejemplos en TierlistPage donde se cargan dos recursos en paralelo con Promise.all, y en TraineePage/SupportPage donde se cargan datos individuales. Este patrón garantiza que no se intenten actualizar estados de componentes desmontados.

### Filtrado y Ordenamiento Combinado sin Duplicación de Estado

Desafío: Permitir que el usuario filtre por búsqueda y ordene por criterios diferentes simultáneamente sin duplicar datos ni crear estados separados que se desincronicen.

Solución: Se creó un patrón en funciones como `renderSupports()` y `renderTrainees()` que primero filtra sobre el estado original con `.filter(element => element.name.toLowerCase().includes(search.toLowerCase().trim()))`, obteniendo un subconjunto. Luego se ordena ese resultado con `.toSorted()` según el criterio seleccionado. El ordenamiento utiliza objetos de mapeo como `{ 'SSR': 1, 'SR': 2, 'R': 3}` para convertir valores de rareza a valores numéricos. Esto mantiene un source of truth único (el estado original) y evita duplicación de datos.

### Edición Inline en Tabla con Validación y Feedback

Desafío: Permitir que administradores editen datos directamente en la tabla sin abrir un modal, manteniendo control sobre qué fila está siendo editada y validando cambios antes de enviar al servidor.

Solución: TierDataSheet implementa dos estados: `rowInEdition` (número de ID) para trackear cuál fila está siendo editada y `draft` (objeto) para almacenar cambios temporales. Cuando se hace click en editar, se copia el contenido del registro a `draft` y la fila se convierte en inputs controlados. Los botones cambian dinámicamente según el estado: muestran guardar/cancelar en modo edición, o editar/eliminar en modo visualización. Al guardar, se valida que todos los campos estén completos con `if(draft.name == '' || draft.rarity == '' || draft.tier == '')`. Esto proporciona una UX fluida dentro del contexto de la tabla.

### Sistema de Autenticación y Autorización con Estados Globales

Desafío: Implementar un sistema de login que diferencie entre usuarios normales y administradores, mostrando u ocultando funcionalidades según permisos sin perder estado al navegar.

Solución: Se mantienen dos estados globales en App.jsx: `isAdmin` (boolean) e `isLogged` (boolean). El componente Login valida credenciales simples (Usuario: "Admin" y Contraseña: "Admin" otorgan isAdmin=true). Las funcionalidades CRUD se renderizan condicionalmente verificando `isAdmin === true` antes de mostrar botones. El overlay de login persiste con `{!isLogged && <div className="login-overlay"><Login /></div>}` hasta que isLogged sea true. Estos estados se pasan como props a componentes de página que los necesitan (TraineePage, SupportPage). Este enfoque simple es apropiado para un proyecto educativo y puede escalarse a autenticación más robusta.

## Stack Tecnológico Utilizado

- React 18: Framework para construcción de interfaces dinámicas con componentes funcionales y hooks
- Axios: Cliente HTTP para comunicación asincrónica con el servidor backend
- JavaScript ES6+: Arrow functions, destructuring, spread operator, template literals
- CSS3: Estilos responsivos, flexbox, grid, transiciones visuales
- Vite: Herramienta de construcción ultrarrápida con Hot Module Replacement para desarrollo
- JSON Server: Servidor backend local que simula una API REST desde db.json

## Estructura del Proyecto

```
umamusume-wiki--react/
├── node_modules/
├── public/
│   └── assets/
│       └── images/
│           ├── events/
│           ├── miscellaneous/
│           └── [otras carpetas de recursos]
├── src/
│   ├── components/
│   │   ├── dataSheets/
│   │   │   ├── BannerDataSheet.jsx
│   │   │   ├── SkillDataSheet.jsx
│   │   │   └── TierDataSheet.jsx
│   │   ├── pages/
│   │   │   ├── MainPage.jsx
│   │   │   ├── TierlistPage.jsx
│   │   │   ├── BannerPage.jsx
│   │   │   ├── TraineePage.jsx
│   │   │   ├── SupportPage.jsx
│   │   │   ├── SkillPage.jsx
│   │   │   └── EventPage.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── Login.jsx
│   │   ├── Navbar.jsx
│   │   ├── Tab.jsx
│   │   └── Tierlist.jsx
│   ├── services/
│   │   └── db.js
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── db.json
├── eslint.config.js
├── index.html
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

## Funcionalidades Implementadas

Página Principal: Bienvenida interactiva con efecto de fondo dinámico que se aplica y se limpia al cambiar de vista.

Tier Lists Interactivas: Visualización de rankings de trainees y support cards mediante componente Tierlist que mapea arrays y renderiza imágenes de miembros.

Gestión de Trainees: Listado con búsqueda en tiempo real, ordenamiento por rareza/tier, y funcionalidades CRUD (agregar, editar inline, eliminar) para administradores.

Gestión de Support Cards: Listado con características idénticas a trainees, permitiendo gestión completa del inventario.

Catálogo de Skills: Visualización de habilidades con búsqueda y ordenamiento por tipo de habilidad.

Banners Activos: Información actualizada de banners con trainees y support cards disponibles.

Eventos Actuales: Descripción detallada de eventos con recompensas, análisis de cartas y bonificaciones.

Autenticación: Sistema de login con overlay que persiste hasta autenticación exitosa.

Edición Administrativa: Interfaz inline para agregar, editar y eliminar datos sin salir del contexto de la tabla.

Cancelación de Peticiones: Todas las peticiones HTTP se cancelan correctamente al desmontar componentes.

## Patrones de Desarrollo Utilizado

Lifting State Up: Estados en componentes padres (App.jsx, TraineePage) se pasan a componentes hijos vía props para compartir estado.

Props Drilling: Paso de datos y callbacks a través de múltiples niveles de componentes (App -> TraineePage -> TierDataSheet).

Renderización Condicional: Operador ternario y && para mostrar/ocultar elementos según estados booleanos.

Composición de Componentes: Componentes pequeños y enfocados que se combinan para crear funcionalidades complejas.

Componentes Presentacionales vs Contenedores: DataSheets son presentacionales, páginas actúan como contenedores.

Manejo de Promesas: .then(), .catch(), .finally() para control fluido de operaciones asincrónicas.

AbortController Pattern: Cancelación automática de peticiones en cleanup de useEffect.

## Recursos de Aprendizaje

React Official Documentation: https://react.dev/

Axios Documentation: https://axios-http.com/

Vite Documentation: https://vitejs.dev/

FullStackOpen Course: https://fullstackopen.com/

## Información de Licencia

Este proyecto está bajo licencia MIT. Ver archivo LICENSE para más detalles.

---

Última actualización: Mayo 2026