import React from 'react';

function Icons() {
  const items = [
    { id: 1, content: 'Top Travel App in India', image: 'https://zen.wego.com/web/illustrations/look-no-further.png',text1:'Highly rated in App Store & Play Store' },
    { id: 2, content: 'Shop with confidence', image: 'https://zen.wego.com/web/illustrations/shop-with-confidence.png',text1:'No hidden fees, taxes or other nasty surprises' },
    { id: 3, content: 'Pay the way you want', image: 'https://zen.wego.com/web/illustrations/pay-the-way-you-want.png',text1:'See only sellers who support your preferred methods' },
    { id: 4, content: 'Instant booking', image: '	https://zen.wego.com/web/illustrations/instant-booking.png',text1:'For selected sellers, book with just a couple of clicks' },
  ];

  return (
    <div className="w-full p-8 md:mt-44 mt-60">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center p-20">
        {items.map((item) => (
          <div key={item.id} className="bg-transparent overflow-hidden flex-col items-center justify-center">
            <img src={item.image} alt={item.content} className="flex object-contain w-full h-80" />
            <div className='text-center'>
              <h2 className="text-2xl font-bold mb-0">{item.content}</h2>
              <p className="text-black mb-2 text-xl">{item.text1} </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Icons;

