import React from 'react'

export const TopBottons = ({ setQuery }) => {

    const cities = [
        {
            id: 1,
            title: "Accra",
        },
        {
            id: 2,
            title: "Lagos",
        },
        {
            id: 3,
            title: "Nairobi",
        },
        {
            id: 4,
            title: "Cape Town",
        },
        {
            id: 5,
            title: "Lilongwe",
        },
    ];

  return (
    <div className="flex itemss-center justify-around my-6">
        {
            cities.map((city) => (
                <button
                key={city.id}
                className="text-lg font-medium hover:bg-gray-700/20 px-3 py-2
                rounded-md transition ease-in"
                onClick={() => setQuery({q: city.title})}
                >
                 {city.title}
                </button>
            ))
        }
    </div>
  )
}

