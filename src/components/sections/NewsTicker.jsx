import { useMemo } from 'react';
import { useCountry } from '../../contexts/CountryContext';
import { TICKER_ITEMS } from '../../constants';
import { PAISES_DATA } from '../../data/countries';

export default function NewsTicker() {
  const { country } = useCountry();

  const items = useMemo(() => {
    if (country && PAISES_DATA[country]?.ticker) {
      const custom = PAISES_DATA[country].ticker;
      return [...custom, ...custom];
    }
    return [...TICKER_ITEMS, ...TICKER_ITEMS];
  }, [country]);

  return (
    <div className="news-ticker" id="newsTicker">
      <div className="container">
        <span className="ticker-label"><i className="fas fa-bolt" /> URGENTE</span>
        <div className="ticker-content">
          <div className="ticker-scroll">
            {items.map((item, i) => (
              <span key={i} className="ticker-item">
                <i className="fas fa-circle" /> {item.icon} {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
