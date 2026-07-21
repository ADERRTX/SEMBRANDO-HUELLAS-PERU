import { TICKER_ITEMS } from '../../constants';

export default function NewsTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

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
