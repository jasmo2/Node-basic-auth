# Authtentication with NodeJS

Las aplicaciones algunas veces requieren que los usuarios tengan paso restringido a las aplicaciones si estos
_NO_ estan registrados en nuestra plataforma.

Hay una cosa más que cabe resaltar aquí y es que el protocolo **_HTTP_ es sin estado** lo que quiere decir que
el registro de quien está visitando nuestra web es nulo.

Por ese motivo hay formas en las cuales se requiere registrar usuarios con usuario y **contraseña** para porder
llevar seguimiento de nuestros usuarios.

## Almacenar contraseñas

Aunque como 1ºpaso debemos instalar una libreria de NodeJS (`yarn add bcrypt`).

Esto se debe a que las contraseñas **NO** deberían ir en text plano y encontrario
deben estar encriptadas. Para esto usaremos _bcrypt_ y una de sus funciones que
nos ayudará **"hashear"** las contraseñas de texto plano.

```
var bcrypt = require('bcrypt')
bcrypt.hash("constrasena-correcta", 10)
.then((hash) => {
  // ohhh si Callback!
})
```

###### por el momento bycrypt NO soportar async/await, en ese caso más adelante usaremos promesas para envolver esta función.

Del mismo modo en el que encryptamos la contraseña. También debemos ser capaces de verificar si
la contraseña en un `login` es correcta. Afortunadamente, **bycrypt** cuenta con una función para eso.

```
bcrypt.compare("constrasena-correcta", hash)
.then(function(res) {
  // res == true
})

bcrypt.compare("contrasena-incorecta", hash)
.then(function(res) {
  // res == false
})
```

#### Ejercicio: [1-encrypting.js](./Exercises/1-encrypting.js)

---

## Peticiones HTTP

En esta parte veremos como es flujo al realizar una petición HTTP cuando se usa autenticación en una aplicación

### Sesión

Para poder saber quien está pidiendo acceso a nuestro registro lo mejor es hacer un manejo de sesión.
Un manera sería por medio de uso de cookies como vimos en el modulo de _Middleware_.

También para la explicación supondré que se está usando MongoDB(Mongoose). Por lo tanto nuestra ruta de login será de la siguiente manera.

### Ruta HTTP

```
app.post("/login", (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.authenticate(email, password)
    if (user) {
      req.session.userId = user._id // <== acá guardamos el id en la sesión
      return res.redirect("/")
    } else {
      res.render("/login", { error: "Wrong email or password. Try again!" })
    }
  } catch (e) {
    return next(e)
  }
})
```

### Verificación de Seguridad

Como sabemos por Mongoose podemos crear _**Metodos estaticos**_ en este caso en el
modelo User.

Sobre este metodo lo que haremos es usar la librería bycrypt para verificar si este **hash** está previamente guardado en nuestra base de datos.

```
const UserSchema = new mongoose.Schema({ // ... })

UserSchema.statics.authenticate = async (email, password) => {
  // buscamos el usuario utilizando el email
  const user = await mongoose.model("User").findOne({ email: email })

  if (user) {
    // si existe comparamos la contraseña
    return functionPromiseBycrypt(password, user.password) //Implementada en el ejercicio anterior
  }

  return null
}
```

### Middleware de Seguridad

Super importante Middleware! .Esto nos va a dar la posibilidad de preguntar todas
las veces que se haga un llamado HTTP para saber si el usuario tiene permisos de acceder
a esta ruta o sinó lo redirijimos a una ruta "segura".

```
async function requireUser(req, res, next) {
  const userId = req.session.userId // la sesión que ya tenemos guardada
  if (userId) {
    const user = await User.findOne({ _id: userId })
    res.locals.user = user
    next()
  } else {
    return res.redirect("/login")
  }
}
```

#### Aplicar Middleware:

Ya definido el Middleware lo podemos usar encualquiera de nuestras rutas.

```
app.get("/ruta-segura", requireUser, (req, res) => {
  res.render("index-seguro");
});
```

---

---

---

Hagamos un projecto con este Middleware!!!
