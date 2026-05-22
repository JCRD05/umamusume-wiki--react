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
- **TraineePage.jsx y SupportPage.jsx**: Páginas con búsqueda en tiempo real, filtrado por criterios, ordenamiento dinámico, y funcionalidades CRUD completas (agregar, editar, eliminar) para administradores. Incluyen manejo de formularios validados y estados de carga.
- **SkillPage.jsx y EventPage.jsx**: Páginas informativas con diferentes estructuras de presentación.
- **Tierlist.jsx**: Componente que mapea arrays de tiers y sus miembros, renderizando imágenes dentro de celdas.
- **TierDataSheet.jsx**: Componente de tabla con edición inline mediante dos estados (rowInEdition, rowToDelete), inputs controlados para edición, y botones administrativos dinámicos que cambian según el estado actual de la fila.
- **BannerDataSheet.jsx y SkillDataSheet.jsx**: Componentes presentacionales puros que mapean datos en filas de tabla sin lógica de estado.
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

- **Búsqueda en Tiempo Real**: Búsqueda insensible a mayúsculas con `.toLowerCase().includes()` y `.trim()` en TraineePage y SupportPage. Se actualiza instantáneamente mientras el usuario escribe.
- **Ordenamiento Dinámico**: Método `.toSorted()` con mapeos de rareza y tier para conversión de valores textuales a numéricos (rarities, tiers). Permite ordenamiento por defecto, rareza o tier.
- **Formularios Validados**: En TraineePage y SupportPage, el formulario de adición valida que todos los campos (nombre, rareza, tier) estén completos antes de permitir submit. Utiliza `window.alert()` para notificar al usuario de campos faltantes.
- **Edición Inline en Tabla**: En TierDataSheet, los estados `rowInEdition` y `draft` permiten editar registros directamente en la tabla. La fila en edición convierte sus campos de solo lectura en inputs controlados que actualizan el estado `draft`.
- **Eliminación Confirmada**: Estado `rowToDelete` que modifica los botones de acción para mostrar confirmar/cancelar antes de ejecutar la eliminación.
- **Control de Acceso**: Funcionalidades CRUD (agregar, editar, eliminar) visibles solo para usuarios con `isAdmin === true`. Los botones administrativos se renderizan condicionalmente mediante `renderAdminButtons()`.
- **Renderización Condicional**: Múltiples vistas basadas en estados (isAdmin, isLogged, view, activeTierlist, rowInEdition, rowToDelete) usando operadores ternarios y &&.
- **Tabulación Interactiva**: Sistema de tabs en TierlistPage que permite cambiar entre trainees y support cards sin recargar la página.
- **Manejo de Efectos Secundarios**: useEffect con cleanup functions para abortar controladores y evitar memory leaks.
- **Estados de Carga**: Flag `isLoading` que previene renderizado de datos mientras se obtienen del servidor.

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

Solución: Se implementó `AbortController` en todos los `useEffect` de TraineePage, SupportPage, BannerPage y TierlistPage. Cada petición recibe `{ signal: controller.signal }` como parámetro en `dbService.getData()`, permitiendo cancelarla en el cleanup function. Se verifica `!axios.isCancel(error)` antes de mostrar errores en consola, evitando alertas sobre cancelaciones intencionales. Ejemplo en TraineePage:

```javascript
useEffect(() => {
    const controller = new AbortController()
    dbService
        .getData('trainee', { signal: controller.signal })
        .then(returnedTrainees => setTrainees(returnedTrainees))
        .catch(error => {
            if(!axios.isCancel(error)) console.error(error)
        })
        .finally(() => setIsLoading(false))
}, [])
```

### Filtrado y Ordenamiento Combinado sin Duplicación de Estado

Desafío: Permitir que el usuario filtre por búsqueda y ordene por criterios diferentes simultáneamente (Default, Rarity, Tier) sin duplicar datos ni crear estados separados que se desincronicen.

Solución: Se implementó un patrón en `renderSupports()` y `renderTrainees()` que primero filtra sobre el estado original con `.filter()`, obteniendo un subconjunto filtrado. Luego se ordena ese resultado con `.toSorted()` según el criterio seleccionado. El ordenamiento utiliza objetos de mapeo como `{ 'SSR': 1, 'SR': 2, 'R': 3}` para convertir valores rareza/tier a números comparables. Esto mantiene un source of truth único (estado original) y evita duplicación:

```javascript
const renderSupports = () => {
    const currentSupports = supports.filter(support => 
        support.name.toLowerCase().includes(search.toLowerCase().trim()))
    
    if(sortCriteria === 'Sort By: Default') {
        return currentSupports
    } else if(sortCriteria === 'Sort By: Rarity') {
        const rarities = { 'SSR': 1, 'SR': 2, 'R': 3}
        return currentSupports.toSorted((a, b) => 
            rarities[a.rarity] - rarities[b.rarity])
    }
}
```

### Edición Inline en Tabla con Estados Dinámicos

Desafío: Permitir que administradores editen datos directamente en la tabla sin abrir un modal, manteniendo control sobre qué fila está siendo editada, validando cambios y mostrando botones diferentes según el estado actual.

Solución: TierDataSheet implementa dos estados: `rowInEdition` (ID de la fila en edición) y `rowToDelete` (ID de la fila marcada para eliminar). El estado `draft` almacena cambios temporales de la fila siendo editada. La función `renderAdminButtons()` cambia dinámicamente los botones según el estado:

- Estado normal: muestra botones de editar (✏️) y eliminar (🗑️)
- En edición: muestra guardar (💾) y cancelar (❌)
- Confirmando eliminación: muestra confirmar (🗑️) y cancelar (❌)

Los campos de la fila se convierten en inputs controlados cuando `rowInEdition === element.id`, permitiendo edición inline. Al guardar con `editTrainee()`, se valida que todos los campos estén completos, se envía al servidor via `dbService.editData()`, y se usa el callback `onEditSuccess()` para actualizar el estado padre.

### Sistema de Autenticación y Autorización con Estados Globales

Desafío: Implementar un sistema de login que diferencie entre usuarios normales y administradores, mostrando u ocultando funcionalidades según permisos sin perder estado al navegar entre páginas.

Solución: Se mantienen dos estados globales en App.jsx: `isAdmin` (boolean) e `isLogged` (boolean). El componente Login valida credenciales simples (Usuario: "Admin" y Contraseña: "Admin" otorgan isAdmin=true, cualquier usuario/contraseña no vacíos otorgan isLogged=true). 

Las funcionalidades CRUD se renderizan condicionalmente verificando `isAdmin === true`:

```javascript
{
    isAdmin
    ? <button onClick={() => setIsAdding(!isAdding)}>
        {isAdding ? '❌' :'✚'}
      </button>
    : null
}
```

El overlay de login persiste con `{!isLogged && <LoginComponent />}` hasta que isLogged sea true. Estos estados se pasan como props a TraineePage, SupportPage, y TierDataSheet. Este enfoque simple y efectivo es apropiado para un proyecto educativo y puede escalarse a autenticación JWT más robusta.

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

Página Principal: Bienvenida interactiva con efecto de fondo dinámico que se aplica y se limpia al cambiar de vista usando useEffect.

Tier Lists Interactivas: Visualización de rankings de trainees y support cards mediante componente Tierlist que mapea arrays y renderiza imágenes de miembros organizados por tier.

Gestión de Trainees: Listado completo con búsqueda en tiempo real, ordenamiento dinámico por rareza/tier, y CRUD completo (Create, Read, Update, Delete) para administradores. Permite agregar nuevos trainees mediante formulario validado, editar datos inline en la tabla, y eliminar con confirmación.

Gestión de Support Cards: Listado con características idénticas a trainees, permitiendo gestión completa del inventario de cartas de apoyo con las mismas funcionalidades de búsqueda, ordenamiento y CRUD.

Catálogo de Skills: Visualización de habilidades con búsqueda en tiempo real y ordenamiento por tipo de habilidad, con información detallada (nombre, descripción, rareza, tipo).

Banners Activos: Información actualizada de banners con trainees y support cards disponibles, mostrando períodos de disponibilidad y nombres de elementos en banner.

Eventos Actuales: Descripción detallada de eventos con recompensas por puntos, análisis de cartas evento, bonificaciones especiales y requisitos de uncap.

Autenticación: Sistema de login con overlay que persiste hasta autenticación exitosa, diferenciando entre usuarios normales y administradores.

Edición Administrativa: Interfaz inline en TierDataSheet para agregar nuevos elementos mediante formulario modal, editar datos directamente en las celdas, y eliminar con confirmación antes de ejecutar.

Cancelación de Peticiones: Todas las peticiones HTTP se cancelan correctamente al desmontar componentes, previniendo memory leaks y warnings de React.

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