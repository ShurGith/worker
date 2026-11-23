import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Clock, 
  MapPin, 
  Phone, 
  Calendar, 
  Users, 
  ChevronRight, 
  Star, 
  Sparkles, 
  Menu as MenuIcon, 
  X, 
  CheckCircle2, 
  Heart,
  Award
} from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS, TESTIMONIALS } from './data/menuData';
import { StructuredDataSection } from '@/components/sections/StructuredDataSection';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [reservationData, setReservationData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '2',
    date: '',
    time: '21:00',
    notes: ''
  });

  const filteredItems = activeCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    setReservationSuccess(true);
  };

  const resetReservation = () => {
    setReservationSuccess(false);
    setReservationData({
      name: '',
      phone: '',
      email: '',
      guests: '2',
      date: '',
      time: '21:00',
      notes: ''
    });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-600 selection:text-white">
      {/* Top Notification Bar */}
      <div className="bg-amber-600/10 border-b border-amber-600/20 py-2 px-4 text-center text-xs md:text-sm text-amber-200/90 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>Nueva carta de temporada ya disponible. Menú degustación con maridaje todos los fines de semana</span>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-stone-950 border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-5 h-5 text-stone-950 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-stone-100">
                el<span className="text-amber-500">Rest</span>
              </span>
              <span className="text-xs text-stone-400 font-medium">
                Gastronomía de Autor
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-300">
            <a href="#inicio" className="hover:text-amber-400 transition-colors">Inicio</a>
            <a href="#carta" className="hover:text-amber-400 transition-colors">Nuestra Carta</a>
            <a href="#cocteles" className="hover:text-amber-400 transition-colors">Cocktails</a>
            <a href="#historia" className="hover:text-amber-400 transition-colors">Filosofía</a>
            <a href="#opiniones" className="hover:text-amber-400 transition-colors">Opiniones</a>
            <a href="#contacto" className="hover:text-amber-400 transition-colors">Ubicación</a>
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a 
              href="#reservar" 
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-sm transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservar Mesa</span>
            </a>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-stone-900 border-b border-stone-800 px-6 py-6 flex flex-col gap-4 text-base font-medium animate-fadeIn">
            <a 
              href="#inicio" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-stone-200 hover:text-amber-400 transition-colors"
            >
              Inicio
            </a>
            <a 
              href="#carta" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-stone-200 hover:text-amber-400 transition-colors"
            >
              Nuestra Carta
            </a>
            <a 
              href="#cocteles" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-stone-200 hover:text-amber-400 transition-colors"
            >
              Cocktails
            </a>
            <a 
              href="#historia" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-stone-200 hover:text-amber-400 transition-colors"
            >
              Filosofía
            </a>
            <a 
              href="#opiniones" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-stone-200 hover:text-amber-400 transition-colors"
            >
              Opiniones
            </a>
            <a 
              href="#contacto" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-stone-200 hover:text-amber-400 transition-colors"
            >
              Ubicación y Horarios
            </a>
            <a 
              href="#reservar" 
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 w-full text-center py-3 rounded-xl bg-amber-500 text-stone-950 font-bold"
            >
              Reservar Mesa
            </a>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section id="inicio" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-16">
          {/* Background image with dramatic dark overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=2000&q=85" 
              alt="Ambiente del restaurante elRest" 
              className="w-full h-full object-cover object-center brightness-40"
            />
            <div className="absolute inset-0 bg-stone-950/50"></div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/80 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium mb-6">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Experiencia culinaria mediterránea contemporánea</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.15] [overflow-wrap:break-word]">
              Sabores auténticos, <br />
              <span className="text-amber-400">
                momentos inolvidables
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-stone-300 mb-10 font-normal leading-relaxed">
              En <strong className="text-white font-semibold">elRest</strong> fusionamos el respeto por la materia prima de proximidad con técnicas de vanguardia, creando platos que despiertan recuerdos y celebran la buena mesa.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#reservar" 
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-base transition-colors"
              >
                Reservar una Mesa
              </a>
              <a 
                href="#carta" 
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 hover:border-stone-500 font-semibold text-base transition-colors"
              >
                Explorar la Carta
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="mt-16 pt-8 border-t border-stone-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="font-serif text-3xl font-bold text-amber-400">+12</p>
                <p className="text-xs text-stone-400 mt-1">Años de Tradición</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-bold text-amber-400">100%</p>
                <p className="text-xs text-stone-400 mt-1">Producto Local</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-bold text-amber-400">+120</p>
                <p className="text-xs text-stone-400 mt-1">Vinos de Selección</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-bold text-amber-400">4.9 ★</p>
                <p className="text-xs text-stone-400 mt-1">Valoración Media</p>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section id="carta" className="py-24 bg-stone-900/60 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-amber-400 font-semibold text-sm">
                Propuesta Gastronómica
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100 mt-2 mb-4">
                Nuestra Carta
              </h2>
              <p className="text-stone-400 text-sm sm:text-base">
                Platos diseñados con devoción por el producto fresco, el equilibrio de matices y el fuego de nuestra cocina abierta.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
              {MENU_CATEGORIES.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === category.id
                      ? 'bg-amber-500 text-stone-950 font-semibold'
                      : 'bg-stone-800/80 text-stone-400 hover:text-stone-200 hover:bg-stone-700/80 border border-stone-800'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredItems.map(item => (
                <div 
                  key={item.id}
                  className="group bg-stone-900 border border-stone-800/80 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-colors duration-300 flex flex-col"
                >
                  {/* Dish Image */}
                  <div className="relative h-56 sm:h-60 overflow-hidden bg-stone-800">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 bg-stone-950/80 px-3 py-1 rounded-full text-amber-400 text-xs font-semibold border border-stone-700">
                      {item.tag}
                    </div>
                  </div>

                  {/* Dish Details */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between gap-4 mb-2">
                        <h3 className="font-serif text-lg font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                          {item.name}
                        </h3>
                        <span className="text-amber-400 font-bold text-base whitespace-nowrap font-serif">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-stone-400 text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-800/60 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {item.dietary.map((d, index) => (
                          <span 
                            key={index} 
                            className="text-xs font-medium px-2 py-0.5 rounded bg-stone-800 text-stone-300"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-amber-500/80 group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                        Pedir en sala <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chef suggestion note */}
            <div className="mt-14 p-6 rounded-2xl bg-stone-900 border border-stone-800 text-center max-w-2xl mx-auto">
              <p className="text-stone-300 text-sm">
                ¿Tienes alguna alergia o intolerancia alimentaria? Consúltanos. Disponemos de carta específica con detalle de los 14 alérgenos y opciones adaptadas.
              </p>
            </div>
          </div>
        </section>

        {/* Cocktails & Signature Drinks Section */}
        <StructuredDataSection />

        {/* Philosophy / About Section */}
        <section id="historia" className="py-24 bg-stone-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image Collage */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden border border-stone-800">
                  <img 
                    src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1000&q=80" 
                    alt="Chef cocinando en elRest" 
                    className="w-full h-[450px] object-cover"
                  />
                  <div className="absolute inset-0 bg-stone-950/20"></div>
                </div>

                {/* Floating highlight badge */}
                <div className="absolute -bottom-6 -right-2 sm:right-6 bg-stone-900/90 border border-amber-500/30 p-5 rounded-2xl max-w-xs">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
                      <Heart className="w-6 h-6 fill-amber-500/20" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-white text-base">Pasión por el detalle</h4>
                      <p className="text-xs text-stone-400">Cada plato cuenta la historia de nuestros productores.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text content */}
              <div className="space-y-6">
                <span className="text-amber-400 font-semibold text-sm">
                  Nuestra Filosofía
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100 leading-tight">
                  La honestidad en la mesa es nuestro credo
                </h2>
                <p className="text-stone-300 text-base leading-relaxed">
                  En <strong className="text-white">elRest</strong> creemos que la buena cocina nace de la complicidad con la tierra y el mar. Trabajamos mano a mano con agricultores locales, lonjas cercanas y bodegas independientes para llevar a tu mesa solo lo mejor de cada estación.
                </p>
                <p className="text-stone-400 text-sm leading-relaxed">
                  No buscamos disfraces para la comida: buscamos potenciar los sabores que nos emocionan, en un entorno cálido, acogedor y con un servicio que te hace sentir como en casa desde el primer saludo.
                </p>

                {/* Pillar Points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800">
                    <h5 className="font-semibold text-white text-sm mb-1">Materia Prima Noble</h5>
                    <p className="text-xs text-stone-400">Carnes maduradas, pescados de lonja y huerta ecológica.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800">
                    <h5 className="font-semibold text-white text-sm mb-1">Bodega con Alma</h5>
                    <p className="text-xs text-stone-400">Vinos de pequeños viticultores y denominaciones singulares.</p>
                  </div>
                </div>

                <div className="pt-2">
                  <a 
                    href="#reservar" 
                    className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-sm group"
                  >
                    <span>Ven a vivir la experiencia elRest</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="opiniones" className="py-24 bg-stone-900/40 border-y border-stone-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-amber-400 font-semibold text-sm">
                Testimonios
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100 mt-2 mb-4">
                Lo que dicen nuestros comensales
              </h2>
              <p className="text-stone-400 text-sm sm:text-base">
                La satisfacción de quienes nos visitan es el motor de todo lo que hacemos en elRest.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map(t => (
                <div 
                  key={t.id}
                  className="bg-stone-900 p-8 rounded-2xl border border-stone-800 relative flex flex-col justify-between hover:border-amber-500/30 transition-colors"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex gap-1 text-amber-400 mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
                      "{t.comment}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-stone-100 text-sm">{t.name}</h4>
                      <p className="text-xs text-stone-400">{t.role}</p>
                    </div>
                    <span className="text-xs text-stone-500">{t.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reservation Section */}
        <section id="reservar" className="py-24 bg-stone-950 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden">
              <div className="text-center max-w-xl mx-auto mb-10">
                <span className="text-amber-400 font-semibold text-sm">
                  Mesa Garantizada
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2 mb-3">
                  Reserva en elRest
                </h2>
                <p className="text-stone-400 text-sm">
                  Asegura tu mesa en unos segundos. Te enviaremos una confirmación inmediata por WhatsApp o llamada.
                </p>
              </div>

              {reservationSuccess ? (
                <div className="text-center py-10 space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-2 border border-amber-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white">¡Solicitud recibida con éxito!</h3>
                  <p className="text-stone-300 text-sm max-w-md mx-auto">
                    Gracias, <strong className="text-white">{reservationData.name}</strong>. Hemos registrado tu reserva para <strong className="text-white">{reservationData.guests} personas</strong> el día <strong className="text-white">{reservationData.date || 'seleccionado'}</strong> a las <strong className="text-white">{reservationData.time}</strong>.
                  </p>
                  <p className="text-xs text-stone-400">Te enviaremos los detalles al teléfono {reservationData.phone}.</p>
                  <button 
                    onClick={resetReservation}
                    className="mt-6 px-6 py-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 text-sm font-medium transition-colors"
                  >
                    Hacer otra reserva
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReservationSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-2">
                        Nombre Completo *
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="Ej. Sofía Martín"
                        value={reservationData.name}
                        onChange={(e) => setReservationData({ ...reservationData, name: e.target.value })}
                        className="w-full bg-stone-950/80 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:border-amber-500 transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-2">
                        Teléfono de Contacto *
                      </label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+34 600 000 000"
                        value={reservationData.phone}
                        onChange={(e) => setReservationData({ ...reservationData, phone: e.target.value })}
                        className="w-full bg-stone-950/80 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:border-amber-500 transition-colors"
                      />
                    </div>

                    {/* Guests */}
                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-2">
                        Número de Comensales *
                      </label>
                      <div className="relative">
                        <select 
                          value={reservationData.guests}
                          onChange={(e) => setReservationData({ ...reservationData, guests: e.target.value })}
                          className="w-full bg-stone-950/80 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:border-amber-500 transition-colors appearance-none"
                        >
                          <option value="1">1 Persona</option>
                          <option value="2">2 Personas (Mesa íntima)</option>
                          <option value="3">3 Personas</option>
                          <option value="4">4 Personas</option>
                          <option value="5">5 Personas</option>
                          <option value="6">6 Personas</option>
                          <option value="7+">Grupo (+7 personas)</option>
                        </select>
                        <Users className="w-4 h-4 text-stone-400 absolute right-4 top-3.5 pointer-events-none" />
                      </div>
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-2">
                        Fecha *
                      </label>
                      <input 
                        type="date" 
                        required
                        value={reservationData.date}
                        onChange={(e) => setReservationData({ ...reservationData, date: e.target.value })}
                        className="w-full bg-stone-950/80 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:border-amber-500 transition-colors"
                      />
                    </div>

                    {/* Time */}
                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-2">
                        Turno / Hora *
                      </label>
                      <select 
                        value={reservationData.time}
                        onChange={(e) => setReservationData({ ...reservationData, time: e.target.value })}
                        className="w-full bg-stone-950/80 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:border-amber-500 transition-colors"
                      >
                        <optgroup label="Almuerzo">
                          <option value="13:30">13:30 h</option>
                          <option value="14:00">14:00 h</option>
                          <option value="14:30">14:30 h</option>
                          <option value="15:00">15:00 h</option>
                        </optgroup>
                        <optgroup label="Cena">
                          <option value="20:30">20:30 h</option>
                          <option value="21:00">21:00 h</option>
                          <option value="21:30">21:30 h</option>
                          <option value="22:00">22:00 h</option>
                        </optgroup>
                      </select>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-2">
                        Correo Electrónico
                      </label>
                      <input 
                        type="email" 
                        placeholder="tu@email.com"
                        value={reservationData.email}
                        onChange={(e) => setReservationData({ ...reservationData, email: e.target.value })}
                        className="w-full bg-stone-950/80 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-2">
                      Peticiones especiales o intolerancias (Opcional)
                    </label>
                    <textarea 
                      rows="2"
                      placeholder="Indícanos si celebráis alguna ocasión especial o si tenéis alergias alimentarias..."
                      value={reservationData.notes}
                      onChange={(e) => setReservationData({ ...reservationData, notes: e.target.value })}
                      className="w-full bg-stone-950/80 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:border-amber-500 transition-colors resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-2 text-center">
                    <button 
                      type="submit"
                      className="w-full sm:w-auto px-10 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 transition-colors text-stone-950 font-bold text-base"
                    >
                      Confirmar Reserva de Mesa
                    </button>
                    <p className="text-xs text-stone-500 mt-3">
                      Cancelación gratuita con hasta 2 horas de antelación.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Location & Opening Hours Section */}
        <section id="contacto" className="py-20 bg-stone-900/80 border-t border-stone-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Horarios */}
              <div className="p-8 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-5">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white mb-4">Horarios de Apertura</h3>
                  <ul className="space-y-3 text-sm text-stone-300">
                    <li className="flex justify-between border-b border-stone-800/80 pb-2">
                      <span className="text-stone-400">Martes a Viernes</span>
                      <span className="font-medium text-stone-100">13:30 - 16:30 | 20:30 - 23:30</span>
                    </li>
                    <li className="flex justify-between border-b border-stone-800/80 pb-2">
                      <span className="text-stone-400">Sábados</span>
                      <span className="font-medium text-stone-100">13:30 - 17:00 | 20:30 - 00:00</span>
                    </li>
                    <li className="flex justify-between border-b border-stone-800/80 pb-2">
                      <span className="text-stone-400">Domingos</span>
                      <span className="font-medium text-stone-100">13:30 - 17:00</span>
                    </li>
                    <li className="flex justify-between pt-1">
                      <span className="text-stone-400">Lunes</span>
                      <span className="text-amber-500/80 font-medium">Cerrado por descanso</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card 2: Dirección */}
              <div className="p-8 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-5">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white mb-4">Dónde Encontrarnos</h3>
                  <p className="text-stone-300 text-sm leading-relaxed mb-4">
                    Calle de la Gastronomía, 24 <br />
                    Zona Centro Histórico <br />
                    28001 Madrid, España
                  </p>
                  <p className="text-xs text-stone-400">
                    A 3 minutos caminando del Metro y con parking concertado a 50 metros.
                  </p>
                </div>
                <div className="mt-6">
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <span>Ver mapa en Google Maps</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Card 3: Reservas & Contacto Directo */}
              <div className="p-8 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-5">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white mb-4">Atención y Eventos</h3>
                  <p className="text-stone-300 text-sm leading-relaxed mb-2">
                    ¿Quieres reservar para grupos grandes o eventos privados? Llámanos directamente:
                  </p>
                  <a 
                    href="tel:+34912345678" 
                    className="block text-2xl font-serif font-bold text-amber-400 hover:text-amber-300 transition-colors my-2"
                  >
                    +34 912 345 678
                  </a>
                  <p className="text-xs text-stone-400">
                    Email: reservas@elrestaurante.es
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <a 
                    href="#" 
                    className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                    aria-label="Instagram de elRest"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                    aria-label="Facebook de elRest"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-stone-950 border-t border-stone-900 py-12 text-stone-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-serif text-xl font-bold tracking-tight text-white">
              el<span className="text-amber-500">Rest</span>
            </span>
            <span className="text-stone-600">|</span>
            <span>© {new Date().getFullYear()} elRest Restaurante. Todos los derechos reservados.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-stone-200 transition-colors">Aviso Legal</a>
            <a href="#" className="hover:text-stone-200 transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-stone-200 transition-colors">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
