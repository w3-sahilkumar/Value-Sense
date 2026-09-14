/* ==========================================================================
   ValueSense — lookup logic
   ========================================================================== */

const ICONS = {
  earbuds: '<path d="M17 12c0-4-3-7-7-7S3 8 3 12v6a3 3 0 003 3 3 3 0 003-3v-5a3 3 0 00-3-3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M17 12v6a3 3 0 01-3 3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="6" cy="18" r="1.6" fill="currentColor"/><circle cx="14" cy="21" r="1.6" fill="currentColor"/>',
  lamp: '<path d="M7 21h10M12 21v-6M4 9l8-6 8 6M4 9h16l-2.5 6h-11L4 9z" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round" stroke-linecap="round"/>',
  backpack: '<rect x="5" y="8" width="14" height="13" rx="3" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M8 8V6a4 4 0 018 0v2M8 12h8M9 21v-5h6v5" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/>',
  watch: '<rect x="7" y="7" width="10" height="10" rx="3" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M9 7V4h6v3M9 17v3h6v-3M12 10v2.3l1.6 1" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  kettle: '<path d="M6 10h9a3 3 0 013 3v0a3 3 0 01-3 3h-1" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M5 8h9l-1 10a2 2 0 01-2 2H8a2 2 0 01-2-2L5 8z" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round"/><path d="M8 8V6a2 2 0 114 0v2" stroke="currentColor" stroke-width="1.6" fill="none"/>',
  keyboard: '<rect x="3" y="7" width="18" height="11" rx="2.2" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M6.5 10.5h.01M10 10.5h.01M13.5 10.5h.01M17 10.5h.01M6.5 14h.01M17 14h.01M9.5 14h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  bottle: '<path d="M10 3h4v3.2l1.4 1.8v11a2 2 0 01-2 2h-2.8a2 2 0 01-2-2V8l1.4-1.8V3z" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round"/><path d="M9.5 13h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  shoe: '<path d="M3 16.5c0-1.2.8-2 1.8-2.4L11 11.8c.7-.3 1.2-.9 1.5-1.6l.6-1.6a1.4 1.4 0 012.5-.2l1.6 2.7 2.6 1.6c.8.5 1.2 1.3 1.2 2.2V17a2 2 0 01-2 2H5a2 2 0 01-2-2v-.5z" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round" stroke-linecap="round"/>',
  box: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round"/><path d="M4 7.5L12 12l8-4.5M12 12v9" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round"/>'
};

function iconSvg(name) {
  const path = ICONS[name] || ICONS.box;
  return `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">${path}</svg>`;
}

function formatPrice(currency, amount) {
  return currency + amount.toLocaleString('en-IN');
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  let out = '';
  for (let i = 0; i < 5; i++) {
    if (i < full) out += '★';
    else if (i === full && half) out += '⯨';
    else out += '☆';
  }
  return out;
}

function productMedia(media, alt) {
  if (media.image) {
    return `<img src="${media.image}" alt="${alt}" loading="lazy">`;
  }
  return `<div class="media-icon">${iconSvg(media.icon)}</div>`;
}

/* Merges a variant's overrides (image/price/originalPrice) on top of the
   product's own defaults, so a variant only has to specify what's different. */
function resolveVariant(product, variantIndex) {
  if (!product.variants || !product.variants.length) return null;
  const variant = product.variants[variantIndex] || product.variants[0];
  return {
    label: variant.label,
    affiliateLink: variant.affiliateLink,
    image: variant.image || product.image,
    icon: variant.icon || product.icon,
    price: variant.price ?? product.price,
    originalPrice: variant.originalPrice ?? product.originalPrice
  };
}

function buildResultCard(product, variantIndex) {
  const variant = resolveVariant(product, variantIndex || 0);
  const media = variant || product;
  const link = variant ? variant.affiliateLink : product.affiliateLink;
  const price = variant ? variant.price : product.price;
  const originalPrice = variant ? variant.originalPrice : product.originalPrice;

  const discount = originalPrice
    ? Math.round(100 - (price / originalPrice) * 100)
    : null;

  const variantPicker = product.variants ? `
    <div class="variant-picker" role="group" aria-label="Choose an option">
      ${product.variants.map((v, i) => `
        <button
          type="button"
          class="variant-pill ${i === (variantIndex || 0) ? 'active' : ''}"
          data-variant-index="${i}"
        >${v.label}</button>
      `).join('')}
    </div>
  ` : '';

  return `
    <div class="result-media">
      ${productMedia(media, product.name)}
      ${discount ? `<span class="discount-pill">${discount}% off</span>` : ''}
    </div>
    <div class="result-body">
      <span class="result-category">${product.category}</span>
      <h2 class="result-name">${product.name}</h2>
      <p class="result-tagline">${product.tagline}</p>

      <div class="result-rating">
        <span class="stars" aria-hidden="true">${renderStars(product.rating)}</span>
        <span class="rating-text">${product.rating} · ${product.reviews.toLocaleString('en-IN')} reviews</span>
      </div>

      <ul class="result-highlights">
        ${product.highlights.map(h => `<li>${h}</li>`).join('')}
      </ul>

      ${variantPicker}

      <div class="result-footer">
        <div class="result-price">
          <span class="price-now">${formatPrice(product.currency, price)}</span>
          ${originalPrice ? `<span class="price-was">${formatPrice(product.currency, originalPrice)}</span>` : ''}
        </div>
        <a class="result-cta" href="${link}" target="_blank" rel="noopener sponsored">
          Get this deal
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h11M10 5l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>
      <p class="result-code">Code ${product.id}${variant ? ` · ${variant.label}` : ''}</p>
    </div>
  `;
}

function showResult(product, variantIndex, isNewSearch = true) {
  const resultSection = document.getElementById('resultSection');
  const resultCard = document.getElementById('resultCard');
  const emptyState = document.getElementById('emptyState');

  emptyState.hidden = true;
  resultCard.innerHTML = buildResultCard(product, variantIndex || 0);
  resultSection.hidden = false;

  // Swapping a variant re-renders just the card body — attach picker
  // listeners each time, and only replay the reveal animation on a
  // brand-new search, not on every variant click.
  resultCard.querySelectorAll('.variant-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = Number(btn.getAttribute('data-variant-index'));
      showResult(product, index, false);
    });
  });

  if (isNewSearch) {
    resultSection.classList.remove('reveal');
    void resultSection.offsetWidth; // restart animation
    resultSection.classList.add('reveal');
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function showEmpty() {
  const resultSection = document.getElementById('resultSection');
  const emptyState = document.getElementById('emptyState');

  resultSection.hidden = true;
  emptyState.hidden = false;
  emptyState.classList.remove('reveal');
  void emptyState.offsetWidth;
  emptyState.classList.add('reveal');
  emptyState.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function handleLookup(rawValue) {
  const value = rawValue.trim();
  if (!value) return;

  const product = PRODUCTS[value] || PRODUCTS[value.toUpperCase()];
  if (product) {
    showResult(product);
  } else {
    showEmpty();
  }
}

function buildTrendingCard(product) {
  const hasVariants = product.variants && product.variants.length > 0;
  return `
    <a class="trend-card" href="#" data-code="${product.id}">
      <div class="trend-media">${productMedia(product, product.name)}</div>
      <div class="trend-body">
        <span class="trend-category">${product.category}${hasVariants ? ' · ' + product.variants.length + ' options' : ''}</span>
        <h3>${product.name}</h3>
        <div class="trend-price">
          <span>${formatPrice(product.currency, product.price)}</span>
          <span class="trend-code">Code ${product.id}</span>
        </div>
      </div>
    </a>
  `;
}

function renderTrending() {
  const grid = document.getElementById('trendingGrid');
  const items = Object.values(PRODUCTS);
  grid.innerHTML = items.map(buildTrendingCard).join('');

  grid.querySelectorAll('.trend-card').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const code = card.getAttribute('data-code');
      document.getElementById('productId').value = code;
      handleLookup(code);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderTrending();

  const form = document.getElementById('lookupForm');
  const input = document.getElementById('productId');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleLookup(input.value);
  });
});