/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/maps.js":
/*!************************!*\
  !*** ./src/js/maps.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\r\n    const lat = document.querySelector('#lat').value || 27.4827347;\r\n    const lng = document.querySelector('#lng').value || -109.9304027;\r\n    const mapa = L.map('mapa').setView([lat, lng ], 14);\r\n    let marker;\r\n\r\n    //Utilizar provider y geocoder \r\n    const geocodeService = L.esri.Geocoding.geocodeService();\r\n\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(mapa);\r\n\r\n\r\n    //el pin\r\n    marker = new L.marker([lat, lng], {\r\n        draggable:true,\r\n        autoPan: true,\r\n    })\r\n    .addTo(mapa)\r\n\r\n    //detectar el movimiento del pin\r\n    marker.on('moveend', function(e){\r\n        marker = e.target \r\n        const position = marker.getLatLng()\r\n        mapa.panTo(new L.latLng(position.lat, position.lng))\r\n\r\n        //obtener la calle donde esta el pin \r\n        geocodeService.reverse().latlng(position, 14).run(function(error, result){\r\n            marker.bindPopup(result.address.LongLabel)\r\n\r\n            //llenar los campos ocultos\r\n            document.querySelector('.calle').value = result?.address?.Address ?? '';\r\n            document.querySelector('#street').value = result?.address?.Address ?? '';\r\n            document.querySelector('#lat').value = result?.latlng?.lat ?? ''\r\n            document.querySelector('#lng').value = result?.latlng?.lng ?? ''\r\n        })\r\n    })\r\n})()\n\n//# sourceURL=webpack://bienesraices_mvc/./src/js/maps.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/maps.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;