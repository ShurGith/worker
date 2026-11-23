import * as React from 'react';

const menuItems = [
  {
    name: 'Peach Blossom',
    price: '16 €',
    description: 'Gin, elderflower liqueur, fresh lime juice, lavender syrup',
  },
  {
    name: 'Lavender Mist',
    price: '15 €',
    description: 'Gin, lavender syrup, fresh lime juice, soda water',
  },
  {
    name: 'Mint Cloud',
    price: '17 €',
    description: 'White rum, fresh mint, lime juice, coconut cream',
  },
  {
    name: 'Rose Garden',
    price: '17.50 €',
    description: 'Gin, rose syrup, grapefruit juice, elderflower liqueur',
  },
  {
    name: 'Blue Lagoon',
    price: '16 €',
    description: 'Vodka, blue curaçao, lemonade, lime juice',
  },
  {
    name: 'Lemon Velvet',
    price: '15 €',
    description: 'Limoncello, fresh lemon juice, sparkling water, sugar rim',
  },
  {
    name: 'Sunset Spritz',
    price: '18 €',
    description: 'Aperol, prosecco, orange juice, soda water',
  },
  {
    name: 'Crimson Glow',
    price: '16 €',
    description: 'Vodka, cranberry juice, lime juice, grenadine',
  },
];

export function StructuredDataSection() {
  return (
    <section
      id="cocteles"
      className="bg-stone-950 text-stone-100 py-16 sm:py-20 lg:py-24 border-t border-stone-800/80"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow & Title */}
        <div>
          <span className="text-amber-500 font-semibold text-xs sm:text-sm tracking-widest uppercase mb-2 block">
            Barra & Coctelería de Autor
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-stone-100 leading-[1.1] m-0">
            Cocktails
          </h2>
          <p className="text-stone-400 text-sm sm:text-base max-w-2xl mt-3 mb-0">
            Creaciones exclusivas de nuestros bartenders con destilados premium, botánicos frescos y jarabes artesanales elaborados a diario.
          </p>
        </div>

        {/* Wide Banner Image */}
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-stone-800/80 my-8 sm:my-12 shadow-2xl">
          <img
            src="https://byqsupply-components.netlify.app/Velvet_Shaker/images/Cocktails_1Cocktails.webp"
            loading="lazy"
            sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 1280px"
            srcSet="https://byqsupply-components.netlify.app/Velvet_Shaker/images/Cocktails_1Cocktails.webp 500w, https://byqsupply-components.netlify.app/Velvet_Shaker/images/Cocktails_1Cocktails.webp 800w, https://byqsupply-components.netlify.app/Velvet_Shaker/images/Cocktails_1Cocktails.webp 1080w, https://byqsupply-components.netlify.app/Velvet_Shaker/images/Cocktails_1Cocktails.webp 1600w, https://byqsupply-components.netlify.app/Velvet_Shaker/images/Cocktails_1Cocktails.webp 2000w, https://byqsupply-components.netlify.app/Velvet_Shaker/images/Cocktails_1Cocktails.webp 2600w, https://byqsupply-components.netlify.app/Velvet_Shaker/images/Cocktails_1Cocktails.webp 2768w"
            alt="Cócteles de autor en elRest"
            className="w-full h-auto max-h-[460px] object-cover max-[767px]:min-h-[140px] max-[479px]:min-h-[100px]"
          />
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col border-t border-stone-800/80 pt-6 pb-8 sm:pb-10 gap-2.5 group hover:border-amber-500/40 transition-colors"
            >
              {/* Name + Price Row */}
              <div className="flex justify-between items-center gap-4">
                <div className="font-serif text-xl sm:text-2xl font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                  {item.name}
                </div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-amber-400 whitespace-nowrap">
                  {item.price}
                </div>
              </div>
              {/* Description */}
              <div className="text-stone-400 text-sm sm:text-base font-normal leading-relaxed">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StructuredDataSection;
