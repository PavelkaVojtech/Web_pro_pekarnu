import React from 'react';
import Image from 'next/image';

const MeziSekce = () => {
  const imagePath1 = '/images/pekar_s_bochnikem_mezisekce.webp';
  const imagePath2 = '/images/pekar_a_bochnik_mezisekce.webp';

  const gridItems = [
    {
      type: 'quote',
      text: '„Každý bochník má svůj příběh.“',
      position: 'top-left',
    },
    {
      type: 'image',
      imageSrc: imagePath1,
      alt: 'Pekař drží bochníky čerstvého chleba',
    },
    {
      type: 'image',
      imageSrc: imagePath2,
      alt: 'Dva bochníky chleba na pečicím papíru',
    },
    {
      type: 'quote',
      text: '„Z naší pece rovnou na váš stůl.“',
      position: 'bottom-right',
    },
  ];

  const quoteClasses = `
    font-serif 
    text-2xl 
    md:text-4xl 
    max-w-xs 
    italic 
    leading-snug
    text-white 
  `;

  return (
    <section className="bg-gray-900 py-16 md:py-24 border-y border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 gap-6 md:gap-10 max-w-6xl mx-auto">
          
          {gridItems.map((item, index) => (
            <div 
              key={index} 
              className={`
                relative flex items-center justify-center
                
                ${item.type === 'image' 
                  ? 'aspect-[4/3] bg-gray-950 rounded-lg overflow-hidden shadow-2xl border border-amber-400/30' 
                  : 'p-4 md:p-8'
                }
                
                // Centrování obsahu vertikálně
                ${item.position === 'top-left' 
                   ? 'justify-start items-center' 
                   : ''
                }
                ${item.position === 'bottom-right' 
                   ? 'justify-end items-center' 
                   : ''
                }
              `}
            >

              {item.type === 'image' && item.imageSrc && typeof item.imageSrc === 'string' && (
                <Image
                  src={item.imageSrc}
                  alt={item.alt}
                  fill={true}
                  objectFit="cover"
                  className="transition-transform duration-500 hover:scale-[1.02]" 
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}

              {item.type === 'quote' && (
                <p 
                  className={`
                    ${quoteClasses}
                    // Zarovnání textu vlevo/vpravo v rámci buňky
                    ${item.position === 'top-left' ? 'text-left' : 'text-right'}
                  `}
                >
                  {item.text}
                </p>
              )}

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default MeziSekce;
