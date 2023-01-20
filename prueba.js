
/* 
  Para resolver el ejercicio planteado lo primero que hice fue analizar la matriz mostrada en el ejemplo.
  21 22 23 24 25
  20  7  8  9 10
  19  6  1  2 11
  18  5  4  3 12git
  17 16 15 14 13

  Objetivos:
  -Crear matriz n numero
  -Llenar matriz hasta el largo total de la matriz en forma de espiral a traves de distintos bucles
  -Buscar Diagonal principal, secundaria y guardarlo en un arreglo 
  -Sumar ambos arreglos a traves del metodo reduce
  -return de suma

*/

//creamos la funcion con parametro n correspondiente a la dimension de la matriz cuadrada
const matrizEspiral = (n)=>{

  let matrix = [];  //se crea el arreglo > filas
  let num = n*n+1; // se crea el ultimo numero de la matriz para luego ir restando por cada bucle for que entra (se suma 1 para que no se cuente el 0)
  let i=0; //variable i que servira para indicar el final de la matriz
  let x =0; 
  let a=0; //variable a que servira para indicar el comienzo de la matriz

  //crear matriz
  for (i; i < n; i++) {  //filas
    matrix[i] = [] 
    for (x; x < n; x++) { //columnas
      matrix[i][x] = 0
    }
  }


  /* 
  Para hacer el efecto espiral y que comience desde el centro,derecha,abajo,izquierda; 
   condiciono si la matriz es par o impar.
   En caso de ser PAR el recorrido que hace comienza desde la esquina inferior izquierda hacia la derecha, por ejemplo:

   (0,4)   (4,1)

    4 3    1 2
    1 2    4 3
    ->     (al reves)

   En caso de ser IMPAR, entonces el recorrido comienza desde la esquina superior derecha hacia la izquierda, por ejemplo:
    
     3 2 1      
     4 9 8 
     5 6 7       
     <-

     7 8 9    
     6 1 2 
     5 4 3
    
  */

  if(n%2==0){
    //recorre par
    for ( let recorrerMatriz = 0; recorrerMatriz < matrix.length; recorrerMatriz++ ){  //llenamos la matriz solo mientas recorreMatriz sea menor al largo de la matriz
      //derecha
      for (let j = a; j < i; j++) {//comenzamos en la inferior izquierda hacia la derecha. es decir necesitaremos siempre la ultima fila (i-1) y la columna(j) desde 0 hasta llenar el arreglo
        num-- //restamos el numero 
        matrix[i-1][j] = num // la ultima fila siempre (i-1) y la columna j++ 
      }
      //arriba
      for (let u = i-1; u > a+1; u--) { //esta vez, hay que subir desde la penultima fila(la ultima esta ocupada), siguiendo por las ultimas columnas 
        num--
        matrix[u-1][i-1] = num //en la penultima fila (u-1) y siempre la ultima columna (i-1)
      }
      //izquierda
      for (let d = i-1; d >= a+1; d--) {//siguiendo, hay que llenar la matriz de derecha a izquierda, la misma fila siempre (a) y las columnas en forma descendente (d--)
        num--
      matrix[a][d] = num //siempre la fila A(0) y desde la ultima columna a la primera (d--)
      }
      //abajo
      for (let b = a; b < i-1; b++) {
        num--
      matrix[b][a] = num //finalmente llenamos la matriz con la misma columna siempre (a) pero en todas las filas (b)
      }  
        a++  // para llenar la matriz de forma dinamica en el proximo for
        i-- // para llenar la matriz de forma dinamica en el proximo for
    }  
  }

  //Mismo procedimiento comenzando desde la izquierda.
  else{
    //recorre impar
    for ( let recorrerMatriz = 0; recorrerMatriz < matrix.length; recorrerMatriz++ ){ 
      //izquierda
      for (let d = i; d >= a+1; d--) {
        num--
        matrix[a][d-1] = num
        }

        //abajo
        for (let b = a; b < i-2; b++) {
          num--
          matrix[b+1][a] = num
        }  
        //derecha
        for (let b = a; b < i-1; b++) {
          num--
          matrix[i-1][b] = num
        }  
        //arriba
        for (let u = i-1; u >= a+1; u--) {
          num--
        matrix[u][i-1] = num
        } 
        a++
        i--
    } 
  }

  /* 
    *Al ser una matriz cuadrada quiere decir que tiene el mismo numero de filas y columnas, es decir todo los elementos que tengan fila y columna igual forman
  parte de la diagonal. 
   */

  let diagonalPrincipal = [];
  let diagonalSecundaria= [];
  for (let f = 0; f < matrix.length; f++) {
      for (let g = 0; g < matrix[f].length; g++) {
          if (f === g) {
            diagonalPrincipal.push(matrix[f][g]); //en caso f y g de ser igual lo guardo en un arreglo de diagonales principales
          }
          if (f + g === matrix.length - 1) {
            diagonalSecundaria.push(matrix[g][f])//en caso de f+g ser igual al largo-1 lo guardo en un arreglo de diagonales secundarias
          }
      }
  }

  let suma = 0 //creo variable para retornar la suma de las diagonales

  if(n%2==0){
    suma = diagonalPrincipal.reduce((acc, val) => acc + val, 0) + diagonalSecundaria.reduce((acc, val) => acc + val, 0) ; 
    /* 
       metodo Reduce con dos parametros(acumulador y elemento del arreglo)
       que recorre a traves de una funcion los elementos del arreglo y los suma para luego almacenarlos en la variable suma
    */
  }else{
     /* 
       metodo Reduce con dos parametros(acumulador y elemento del arreglo)
       que recorre a traves de una funcion los elementos del arreglo y los suma para luego almacenarlos en la variable suma.
       Al final se resta un numero porque al ser una matriz impar la diagonal cuenta dos veces el uno.
    */
    suma = diagonalPrincipal.reduce((acc, val) => acc + val, 0) + diagonalSecundaria.reduce((acc, val) => acc + val, 0)-1 ;
  }
  console.log(matrix)
  return suma
}

console.log(matrizEspiral(1003));

