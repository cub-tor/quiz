<template>
    <div id="instrucciones">
        <p><br></p>
        <h1><b>Instrucciones</b></h1>
       <ol>
        <li>Haz click en una de las tres opciones de respuesta</li>
        <li>Haz click en el botón responder</li>
        <li>Si la respuesta es incorrecta el círculo de la categoría correspondiente se volverá rojo</li>
        <li>Si la respuesta es correcta el círculo se coloreará del color correspondiente a la categoría y sumará un punto</li>
        <li>Una vez que completes todos los círculos, habrás terminado una partida. Podrás ver tú puntuación de esa partida, los puntos que llevas acumulados y/o volver a jugar</li>
       </ol>
       <p>¡Recuerda que el rojo significa que está mal y no suma puntos!</p>
    </div>
    
</template>

<style>
#instrucciones{
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family:monospace;
    font-size: large;
    text-align:left;
    margin-top: 5%;
    margin: 0px auto;/*centrar el contenido*/
}

#instrucciones h1 {
    text-align: center;
    margin-bottom: 5%;
    color: green

}

#instrucciones ol, p {
    margin-left: 30%;
    margin-right: 30%;
}


</style>