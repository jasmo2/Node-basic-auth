/**
 * Como vimos en el Readme pricipal.
 *
 * Tenemos las funciones para encryptar y para verificar
 *
 *
 * bcrypt.compare("constrasena-correcta", hash)
 * .then(function(res) {
 *   // res == true
 * });
 *
 * bcrypt.compare("contrasena-incorecta", hash)
 * .then(function(res) {
 *   // res == false
 * });
 *
 * El ejercicio se dividirá en 3 partes.
 *
 * A) Dado el siguiente arrays de objetos de contraseñas encryotarlas todas y
 *    almacenarlas en una llave llamada "hashed"
 * ej: const arrsObjs = [
 *      {visible: 'contrasena', hashed: "..."}
 *     ]
 *
 * B) Una vez tengamos encryptados todas las contraseñas. Crear una fn que
 *    verifique si la contraseña que pasemos está dentro de nuestro Array
 *
 * C) Ahora envolver estos dos metodos en Promesas
 **/
// https://www.dragonjar.org/los-peores-passwords-en-espanol.xhtml
// https://www.welivesecurity.com/la-es/2018/12/19/las-25-contrasenas-mas-populares-del-2018/

let arrsObjs = [
  { visible: '!@#$%^&*' },
  { visible: '123456' },
  { visible: '123456789' },
  { visible: 'abc123' },
  { visible: 'amor' },
  { visible: 'bonita' },
  { visible: 'mariposa' },
  { visible: 'password' },
  { visible: 'password1' },
  { visible: 'qwerty' },
  { visible: 'qwerty123' }
]
