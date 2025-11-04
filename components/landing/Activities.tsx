import React from 'react';

const activities = [
  {
    title: "Cadena Alimenticia Interactiva",
    description: "Arrastra y suelta organismos para construir una red trófica y observa cómo fluye la energía en el ecosistema."
  },
  {
    title: "Identificador de Especies con IA",
    description: "Toma una foto de una planta o insecto y nuestra IA te ayudará a identificar la especie y aprender sobre ella."
  },
  {
    title: "Simulador de Ecosistemas",
    description: "Gestiona un ecosistema virtual, balanceando poblaciones de presas y depredadores para mantener el equilibrio."
  },
  {
    title: "Mapa de Biomas del Mundo",
    description: "Viaja virtualmente por el planeta, explorando los diferentes biomas y la fascinante vida que albergan."
  },
  {
    title: "Trivia de Adaptaciones Animales",
    description: "Pon a prueba tu conocimiento sobre cómo los animales sobreviven en desiertos, selvas y océanos profundos."
  },
  {
    title: "Laboratorio de Genética Virtual",
    description: "Aprende sobre la herencia mendeliana cruzando plantas virtuales y prediciendo los rasgos de la descendencia."
  },
  {
    title: "Diario de Campo Digital",
    description: "Conviértete en un naturalista. Registra tus observaciones de la flora y fauna local y compártelas."
  },
  {
    title: "Constructor de Células 3D",
    description: "Arma un modelo tridimensional de una célula, colocando cada organelo en su lugar y aprendiendo su función."
  },
  {
    title: "Desafío: Sonidos de la Naturaleza",
    description: "Escucha el canto de un ave o el rugido de un felino y adivina a qué animal pertenece. ¡Afina tu oído!"
  },
  {
    title: "Línea de Tiempo Evolutiva",
    description: "Explora un viaje interactivo desde los primeros microorganismos hasta la aparición de los seres humanos."
  }
];

const Activities: React.FC = () => (
    <section id="actividades" className="py-20 bg-slate-800">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold font-orbitron text-center text-white mb-12">
                Actividades Lúdicas Educativas
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
                {activities.map((activity, index) => (
                    <div key={index} className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-cyan-500 transition-all duration-300 transform hover:-translate-y-1">
                        <h3 className="text-xl font-bold text-cyan-300 mb-2">{index + 1}. {activity.title}</h3>
                        <p className="text-slate-400">{activity.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Activities;