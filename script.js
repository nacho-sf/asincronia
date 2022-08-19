const iterations = 10;
const numbers = [];

for (let i = 0; i < iterations; i++) {
  const number = 1 + Math.floor(Math.random() * 6);
  numbers.push(number);
  if (number === 6) {
    console.log("ERROR");
    break;
  }
}

console.log(numbers);






console.log("");
// Ejemplo sin función Callback

const list = ["A", "B", "C"];

for (let i = 0; i < list.length; i++) {
  console.log("i=", i, " list=", list[i]);
}





console.log("");
// Ejemplo con función Callback

list.forEach(function(currentValue, index) {
    console.log("i=", index, " list=", currentValue);
  });






console.log("");
// setTimeout(Callback 'function', time 'number'):

setTimeout(function() {
    //console.log("He ejecutado la función");
  }, 2000);





/////////////// ASINCRONÍA CON CALLBACKS ///////////////

// Se declara la función primaria como la variable 'doTask'.

// Se le pasa por parámetros:
    // Nº iteraciones para el bucle for (tiradas de dados)
    // Nombre de la función Callback

// El código de la función primaria consiste en un bucle 'for', el cual, en cada iteración genera un número entero aleatorio del 1 al 6 y lo guarda en el array 'numbers'

// Si el número generado es 6:
    // Devuelve el parámetro/función 'Callback' con su primer argumento 'err' (Objeto error)

// Si tras completar las iteraciones, no se saca 6:
    // Devuelve el parámetro/función 'Callback' con su segundo argumento 'result' (Objeto resultado)


const doTask = (iterations, miCallback) => {
    const numbers = [];
    for (let i = 0; i < iterations; i++) {
      const number = 1 + Math.floor(Math.random() * 6);
      numbers.push(number);
      if (number === 6) {
        /* Error, se ha sacado un 6 */
        return miCallback({
          error: true,
          message: "doTask err: Se ha sacado un 6"
        });
      };
    };
    /* Termina bucle y no se ha sacado 6 */
    return miCallback(null, {
      error: false,
      value: numbers
    });
  };




// Ejecución de la función primaria. Mete el number 10 como 'iterations' y mete una función anónima como parámetro 'miCallback'.

// Si el condicional se deriva al 'return' de 'miCallback' con la 1ª posición de los parámetros ocupada, se tomara esta (en la declaración de la función se le llama a este parámetro 'err')

// Si el condicional se deriva al 'return' de 'miCallback' con la 1ª posición paramétrica como 'null', tomará la 2ª posición (se ha nombrado 'result')

// Entonces los parámetros de la función anónima (referida paramétricamente como miCallback), se han nombrado como 'err' y 'result', y son:
    // El objeto error, con una propiedad booleana de error == true y otra de mensaje de error
    // El objeto resultado, con una propiedad booleana de error == false y otra con el array de tiradas


doTask(10, function(err, result) {
  if (err) {
    return console.error(err.message);
  }
  return console.log("doTask Fine: ", result.value);
});






console.log("");
//////////////// ASINCRONÍA CON PROMISES ///////////////



const doTask2 = (iterations) => new Promise((resolve, reject) => {
    const numbers = [];
    for (let i = 0; i < iterations; i++) {
      const number = 1 + Math.floor(Math.random() * 6);
      numbers.push(number);
      if (number === 6) {
        reject({
          error: true,
          message: "Se ha sacado un 6"
        });
      }
    }
    resolve({
      error: false,
      value: numbers
    });
  });


doTask2(10)
    .then(result => console.log("doTask2 Fine: ", result.value))
    .catch(err => console.error("doTask2 err:", err.message));








////////// CON ASYNC/AWAIT ////////////

const doTask3 = async (iterations) => {
  const numbers = [];
  for (let i = 0; i < iterations; i++) {
    const number = 1 + Math.floor(Math.random() * 6);
    numbers.push(number);
    if (number === 6) {
      return {
        error: true,
        message: "Se ha sacado un 6"
      };
    }
  }
  return {
    error: false,
    value: numbers
  };
}


document.querySelector("button").addEventListener("click", async () => {
  const resultado = await doTask3(10);
  console.log(resultado);
});