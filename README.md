# 🎵 Sonido Vivo — E-commerce de Instrumentos Musicales

![Version](https://img.shields.io/badge/version-1.0.0-orange.svg)
![Subject](https://img.shields.io/badge/Asignatura-Fullstack_2-blue.svg)

Bienvenido al repositorio oficial de **Sonido Vivo**, una plataforma e-commerce web orientada a la venta de instrumentos musicales, equipos de sonido y accesorios para músicos. Este proyecto ha sido desarrollado como parte de la evaluación práctica para la asignatura **Fullstack 2**.

---

## 📌 Información del Proyecto

* **Asignatura:** Desarrollo Fullstack II
* **Institución:** Duoc UC — Sede Plaza Norte
* **Docente:** Cristian Vega
* **Semestre / Año:** 2026-2

### 👥 Integrantes / Alumnos
* **Thomas Escobar** — *Desarrollador* — [GitHub Profile](https://github.com/ThomassEscobar)
* **Matias Pavez** — *Desarrollador* — [GitHub Profile](https://github.com/Fimchart)

---

## 🚀 Tecnologías Utilizadas

* **Frontend:** HTML5, CSS3 (CSS Variables, Flexbox, CSS), JavaScript.
* **Diseño & UI:** Google Fonts (Inter, Montserrat), FontAwesome 6 (Iconografía).
* **Control de Versiones:** Git & GitHub.

---

## 🔀 Modelo de Ramas (GitFlow Workflow)

En este proyecto aplicamos una estrategia de ramificación basada en **GitFlow** para mantener un historial limpio y un flujo de trabajo colaborativo ordenado.

| Rama | Descripción | Permisos / Tipo |
| :--- | :--- | :--- |
| `main` | Código estable y listo para producción / entrega final. | Protegida (Merge mediante PRs) |
| `release` | Preparación y pruebas finales previas a la liberación. | Temporal |
| `develop` | Rama principal de integración para el desarrollo continuo. | Base de trabajo activa |
| `feature/*` | Funcionalidades específicas (ej. `feature/login`, `feature/carrito`). | Ramas de trabajo de integrantes |
| `hotfix/*` | Correcciones urgentes aplicadas directamente sobre main. | Temporales |

## ⚙️ Scripts Utilitarios

El proyecto cuenta con un script de automatización en Python para la gestión de recursos multimedia:

* **`descargar_imagenes.py`**: Descarga y organiza automáticamente las imágenes necesarias para el catálogo y los productos desde fuentes externas.

Para ejecutarlo:
```bash
python descargar_imagenes.py




