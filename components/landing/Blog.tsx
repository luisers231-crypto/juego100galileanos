import React from 'react';

const BlogCard: React.FC<{ title: string; excerpt: string; date: string; tag: string; }> = ({ title, excerpt, date, tag }) => (
    <a href="#" className="block bg-slate-800 p-6 rounded-lg shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 transform hover:-translate-y-1 group">
        <div className="flex justify-between items-center mb-4">
            <span className="bg-cyan-900/50 text-cyan-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">{tag}</span>
            <p className="text-sm text-slate-400">{date}</p>
        </div>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">{title}</h3>
        <p className="text-slate-400">{excerpt}</p>
    </a>
);


const Blog: React.FC = () => (
    <section id="blog" className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold font-orbitron text-center text-white mb-12">Últimos Artículos</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <BlogCard 
                    title="Crea tu Primer Agente de IA en 27 Minutos"
                    excerpt="Tutorial completo para construir un agente que organice tus actividades lúdicas automáticamente."
                    date="Hace 6 días"
                    tag="Actividades"
                />
                <BlogCard 
                    title="El Futuro del Aprendizaje con IA"
                    excerpt="Descubre cómo la IA puede generar y personalizar actividades educativas para cada estudiante de forma automática."
                    date="Hace 2 semanas"
                    tag="IA"
                />
                <BlogCard 
                    title="Guía de React para Educadores"
                    excerpt="Aprende a usar React para construir aplicaciones educativas interactivas que automaticen tareas de aprendizaje."
                    date="Hace 1 mes"
                    tag="Desarrollo"
                />
            </div>
             <div className="text-center mt-12">
                <a href="mailto:luisers23@gmail.com" className="text-cyan-400 hover:text-cyan-300 font-semibold text-lg">
                    ¿Tienes una idea para un artículo? Contáctanos &rarr;
                </a>
            </div>
        </div>
    </section>
);

export default Blog;