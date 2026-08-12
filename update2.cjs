const fs = require('fs');
let html = fs.readFileSync('./public/content.html', 'utf8');

// ─── 1. LADIES ONLY: Remove "Community" label ────────────────────────────────
html = html.replace(
  /<p class="sh-sf-card-label">Community<\/p>\s*\n?\s*<h3 class="sh-sf-card-title">Ladies<br>Only<\/h3>/,
  `<h3 class="sh-sf-card-title">Ladies<br>Only</h3>`
);

// ─── 2. REPLACE BANNER WITH COUNTDOWN TIMER ONLY ────────────────────────────
html = html.replace(
  /<aside[^>]*aria-label="Coming Soon"[^>]*>[\s\S]*?<\/aside>/,
  `<aside aria-label="Coming Soon" id="sh-countdown-bar" style="position:fixed;top:0;left:0;right:0;z-index:9999;background:#0d0d0d;border-bottom:1px solid rgba(131,135,90,0.4);padding:10px 24px;display:flex;align-items:center;justify-content:center;gap:32px;">
  <span style="color:#83875a;font-family:monospace;font-size:11px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;">Coming Soon</span>
  <div id="sh-timer" style="display:flex;align-items:center;gap:16px;">
    <div class="sh-tick"><span id="sh-days" style="font-family:condensed,monospace;font-size:28px;font-weight:700;color:#fffefd;letter-spacing:-0.5px;">00</span><span class="sh-tick-label">days</span></div>
    <span style="color:#83875a;font-size:20px;font-weight:300;line-height:1;padding-bottom:14px;">:</span>
    <div class="sh-tick"><span id="sh-hours" style="font-family:condensed,monospace;font-size:28px;font-weight:700;color:#fffefd;letter-spacing:-0.5px;">00</span><span class="sh-tick-label">hrs</span></div>
    <span style="color:#83875a;font-size:20px;font-weight:300;line-height:1;padding-bottom:14px;">:</span>
    <div class="sh-tick"><span id="sh-mins" style="font-family:condensed,monospace;font-size:28px;font-weight:700;color:#fffefd;letter-spacing:-0.5px;">00</span><span class="sh-tick-label">min</span></div>
    <span style="color:#83875a;font-size:20px;font-weight:300;line-height:1;padding-bottom:14px;">:</span>
    <div class="sh-tick"><span id="sh-secs" style="font-family:condensed,monospace;font-size:28px;font-weight:700;color:#83875a;letter-spacing:-0.5px;">00</span><span class="sh-tick-label">sec</span></div>
  </div>
  <style>
    .sh-tick { display:flex;flex-direction:column;align-items:center;gap:2px; }
    .sh-tick-label { color:#555;font-family:monospace;font-size:9px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase; }
  </style>
  <script>
    (function(){
      var target = new Date('2027-01-15T09:00:00');
      function pad(n){ return String(n).padStart(2,'0'); }
      function tick(){
        var now = new Date(), diff = target - now;
        if(diff <= 0){ diff = 0; }
        var d = Math.floor(diff/86400000);
        var h = Math.floor((diff%86400000)/3600000);
        var m = Math.floor((diff%3600000)/60000);
        var s = Math.floor((diff%60000)/1000);
        document.getElementById('sh-days').textContent = pad(d);
        document.getElementById('sh-hours').textContent = pad(h);
        document.getElementById('sh-mins').textContent = pad(m);
        document.getElementById('sh-secs').textContent = pad(s);
      }
      tick();
      setInterval(tick, 1000);
    })();
  </script>
</aside>`
);

// ─── 3. BLOG SECTION: Floating cards from right ──────────────────────────────
// Find blog section and extract card data, then replace with marquee
const blogSectionMatch = html.match(/<div[^>]*class="[^"]*blog[^"]*"[^>]*>[\s\S]{0,50000}?(?=<div class="classpack_|<div class="sh-studio|<footer|<div class="footer)/);

// Replace the blog section with a scrolling marquee version
// First find the blog container
const blogReplace = `
<section class="sh-blog-section">
<style>
  .sh-blog-section {
    background: #131313;
    padding: 80px 0;
    overflow: hidden;
  }
  .sh-blog-header {
    padding: 0 72px 56px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 24px;
  }
  @media(max-width:799px){ .sh-blog-header { padding: 0 24px 40px; } }
  .sh-blog-label {
    color: #83875a;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    margin-bottom: 12px;
  }
  .sh-blog-title {
    color: #fffefd;
    font-family: condensed, sans-serif;
    font-size: clamp(48px, 6vw, 80px);
    font-weight: 700;
    letter-spacing: -2px;
    line-height: 88%;
    text-transform: uppercase;
  }
  .sh-blog-cta {
    color: #83875a;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: underline;
    cursor: pointer;
    align-self: flex-end;
  }

  /* Marquee — scrolls right to left (items enter from the right) */
  .sh-blog-marquee-wrap {
    position: relative;
    overflow: hidden;
  }
  .sh-blog-marquee-wrap::before,
  .sh-blog-marquee-wrap::after {
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    width: 80px;
    z-index: 2;
    pointer-events: none;
  }
  .sh-blog-marquee-wrap::before {
    left: 0;
    background: linear-gradient(to right, #131313, transparent);
  }
  .sh-blog-marquee-wrap::after {
    right: 0;
    background: linear-gradient(to left, #131313, transparent);
  }

  .sh-blog-track {
    display: flex;
    gap: 24px;
    width: max-content;
    padding: 12px 0 24px;
    /* Scroll from RIGHT: starts at -50% (right side), moves to 0% (left) */
    animation: sh-blog-scroll 35s linear infinite;
  }
  .sh-blog-track:hover { animation-play-state: paused; }

  @keyframes sh-blog-scroll {
    0%   { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }

  .sh-blog-card {
    background: #1a1a1a;
    border: 1px solid rgba(131,135,90,0.25);
    border-radius: 20px;
    padding: 36px 32px;
    min-width: 320px;
    max-width: 320px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    transition: border-color 0.3s ease, transform 0.3s ease;
    cursor: pointer;
  }
  .sh-blog-card:hover {
    border-color: #83875a;
    transform: translateY(-4px);
  }
  .sh-blog-tag {
    display: inline-block;
    background: rgba(131,135,90,0.15);
    color: #83875a;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 5px 12px;
    border-radius: 100px;
    width: fit-content;
  }
  .sh-blog-card-title {
    color: #fffefd;
    font-family: condensed, sans-serif;
    font-size: 26px;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 95%;
    letter-spacing: -0.3px;
  }
  .sh-blog-card-excerpt {
    color: #777;
    font-size: 13px;
    line-height: 160%;
    flex: 1;
  }
  .sh-blog-card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    padding-top: 16px;
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  .sh-blog-date { color: #555; font-size: 12px; letter-spacing: 0.05em; }
  .sh-blog-arrow {
    width: 32px; height: 32px;
    border-radius: 50%;
    border: 1px solid rgba(131,135,90,0.4);
    display: flex; align-items: center; justify-content: center;
    color: #83875a;
    font-size: 14px;
    transition: background 0.3s;
  }
  .sh-blog-card:hover .sh-blog-arrow { background: #83875a; color: #fff; }
</style>

  <div class="sh-blog-header">
    <div>
      <p class="sh-blog-label">[ Insights & stories ]</p>
      <h2 class="sh-blog-title">From<br>Our Blog</h2>
    </div>
    <span class="sh-blog-cta">View all posts →</span>
  </div>

  <div class="sh-blog-marquee-wrap">
    <div class="sh-blog-track">

      <!-- SET 1 -->
      <div class="sh-blog-card">
        <span class="sh-blog-tag">Wellness</span>
        <h3 class="sh-blog-card-title">Why Pilates Is The Perfect Workout For Women</h3>
        <p class="sh-blog-card-excerpt">Discover how Pilates builds core strength, improves posture, and supports hormonal balance — especially for women at every stage of life.</p>
        <div class="sh-blog-card-footer">
          <span class="sh-blog-date">Aug 2026</span>
          <span class="sh-blog-arrow">→</span>
        </div>
      </div>

      <div class="sh-blog-card">
        <span class="sh-blog-tag">Movement</span>
        <h3 class="sh-blog-card-title">Reformer vs Mat Pilates: Which Is Right For You?</h3>
        <p class="sh-blog-card-excerpt">Both offer incredible benefits, but the right choice depends on your goals, fitness level, and what kind of challenge you're seeking.</p>
        <div class="sh-blog-card-footer">
          <span class="sh-blog-date">Jul 2026</span>
          <span class="sh-blog-arrow">→</span>
        </div>
      </div>

      <div class="sh-blog-card">
        <span class="sh-blog-tag">Community</span>
        <h3 class="sh-blog-card-title">Building Confidence Through Movement</h3>
        <p class="sh-blog-card-excerpt">How our women-only space is helping members reconnect with their bodies, build self-trust, and move through life with greater confidence.</p>
        <div class="sh-blog-card-footer">
          <span class="sh-blog-date">Jun 2026</span>
          <span class="sh-blog-arrow">→</span>
        </div>
      </div>

      <div class="sh-blog-card">
        <span class="sh-blog-tag">Nutrition</span>
        <h3 class="sh-blog-card-title">Fueling Your Body Around Your Pilates Classes</h3>
        <p class="sh-blog-card-excerpt">What you eat before and after class makes a real difference. Here's a simple guide to nutrition that supports your practice and recovery.</p>
        <div class="sh-blog-card-footer">
          <span class="sh-blog-date">May 2026</span>
          <span class="sh-blog-arrow">→</span>
        </div>
      </div>

      <div class="sh-blog-card">
        <span class="sh-blog-tag">Mindfulness</span>
        <h3 class="sh-blog-card-title">The Power of Breathwork in Your Workout Routine</h3>
        <p class="sh-blog-card-excerpt">Intentional breathing isn't just for meditation. Learn how breathwork amplifies your Pilates session and reduces stress from within.</p>
        <div class="sh-blog-card-footer">
          <span class="sh-blog-date">Apr 2026</span>
          <span class="sh-blog-arrow">→</span>
        </div>
      </div>

      <!-- SET 2 (mirror for seamless loop) -->
      <div class="sh-blog-card">
        <span class="sh-blog-tag">Wellness</span>
        <h3 class="sh-blog-card-title">Why Pilates Is The Perfect Workout For Women</h3>
        <p class="sh-blog-card-excerpt">Discover how Pilates builds core strength, improves posture, and supports hormonal balance — especially for women at every stage of life.</p>
        <div class="sh-blog-card-footer">
          <span class="sh-blog-date">Aug 2026</span>
          <span class="sh-blog-arrow">→</span>
        </div>
      </div>

      <div class="sh-blog-card">
        <span class="sh-blog-tag">Movement</span>
        <h3 class="sh-blog-card-title">Reformer vs Mat Pilates: Which Is Right For You?</h3>
        <p class="sh-blog-card-excerpt">Both offer incredible benefits, but the right choice depends on your goals, fitness level, and what kind of challenge you're seeking.</p>
        <div class="sh-blog-card-footer">
          <span class="sh-blog-date">Jul 2026</span>
          <span class="sh-blog-arrow">→</span>
        </div>
      </div>

      <div class="sh-blog-card">
        <span class="sh-blog-tag">Community</span>
        <h3 class="sh-blog-card-title">Building Confidence Through Movement</h3>
        <p class="sh-blog-card-excerpt">How our women-only space is helping members reconnect with their bodies, build self-trust, and move through life with greater confidence.</p>
        <div class="sh-blog-card-footer">
          <span class="sh-blog-date">Jun 2026</span>
          <span class="sh-blog-arrow">→</span>
        </div>
      </div>

      <div class="sh-blog-card">
        <span class="sh-blog-tag">Nutrition</span>
        <h3 class="sh-blog-card-title">Fueling Your Body Around Your Pilates Classes</h3>
        <p class="sh-blog-card-excerpt">What you eat before and after class makes a real difference. Here's a simple guide to nutrition that supports your practice and recovery.</p>
        <div class="sh-blog-card-footer">
          <span class="sh-blog-date">May 2026</span>
          <span class="sh-blog-arrow">→</span>
        </div>
      </div>

      <div class="sh-blog-card">
        <span class="sh-blog-tag">Mindfulness</span>
        <h3 class="sh-blog-card-title">The Power of Breathwork in Your Workout Routine</h3>
        <p class="sh-blog-card-excerpt">Intentional breathing isn't just for meditation. Learn how breathwork amplifies your Pilates session and reduces stress from within.</p>
        <div class="sh-blog-card-footer">
          <span class="sh-blog-date">Apr 2026</span>
          <span class="sh-blog-arrow">→</span>
        </div>
      </div>

    </div>
  </div>
</section>
`;

// Replace blog section - find it by its class patterns
html = html.replace(
  /<div[^>]*class="[^"]*blog[^"]*_container[^"]*"[^>]*>[\s\S]*?(?=<div class="classpack_|<div class="footer_|<footer)/,
  blogReplace + '\n'
);

// ─── 4. FOOTER REDESIGN ───────────────────────────────────────────────────────
const footerReplace = `
<footer class="sh-footer">
<style>
  .sh-footer {
    background: #0d0d0d;
    border-top: 1px solid rgba(131,135,90,0.2);
    padding: 64px 72px 32px;
  }
  @media(max-width:799px){ .sh-footer { padding: 48px 24px 24px; } }

  .sh-footer-top {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 48px;
    margin-bottom: 56px;
    align-items: start;
  }
  @media(max-width:899px){ .sh-footer-top { grid-template-columns: 1fr; gap: 32px; } }

  .sh-footer-logo-col {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .sh-footer-logo-col img {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }
  .sh-footer-tagline {
    color: #555;
    font-size: 13px;
    line-height: 160%;
    max-width: 220px;
  }

  .sh-footer-col-title {
    color: #83875a;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  .sh-footer-info-row {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .sh-footer-info-item {
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }
  .sh-footer-info-icon {
    color: #83875a;
    font-size: 14px;
    margin-top: 1px;
    flex-shrink: 0;
  }
  .sh-footer-info-text {
    color: #aaa;
    font-size: 13px;
    line-height: 160%;
  }
  .sh-footer-info-text a { color: #aaa; text-decoration: none; }
  .sh-footer-info-text a:hover { color: #83875a; }

  .sh-footer-links-col { display: flex; flex-direction: column; }
  .sh-footer-links {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .sh-footer-links a {
    color: #aaa;
    font-size: 13px;
    text-decoration: none;
    letter-spacing: 0.05em;
    transition: color 0.2s;
  }
  .sh-footer-links a:hover { color: #fffefd; }

  .sh-footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 28px;
    border-top: 1px solid rgba(255,255,255,0.05);
    flex-wrap: wrap;
    gap: 12px;
  }
  .sh-footer-copy {
    color: #444;
    font-size: 12px;
    letter-spacing: 0.05em;
  }
  .sh-footer-socials {
    display: flex;
    gap: 16px;
  }
  .sh-footer-socials a {
    color: #555;
    font-size: 12px;
    text-decoration: none;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: color 0.2s;
  }
  .sh-footer-socials a:hover { color: #83875a; }
</style>

  <div class="sh-footer-top">

    <!-- Logo col -->
    <div class="sh-footer-logo-col">
      <img src="/extracted_images/luk.svg" alt="ShapeHause Wellness Logo" />
      <p class="sh-footer-tagline">A premium women-only Pilates studio built for balance, strength, and community.</p>
    </div>

    <!-- Contact col -->
    <div>
      <p class="sh-footer-col-title">Contact Us</p>
      <div class="sh-footer-info-row">
        <div class="sh-footer-info-item">
          <span class="sh-footer-info-icon">📍</span>
          <span class="sh-footer-info-text">147 King Street West, Suite 302<br>Toronto, ON M5H 1J8, Canada</span>
        </div>
        <div class="sh-footer-info-item">
          <span class="sh-footer-info-icon">📞</span>
          <span class="sh-footer-info-text"><a href="tel:+14165550247">+1 (416) 555-0247</a></span>
        </div>
        <div class="sh-footer-info-item">
          <span class="sh-footer-info-icon">✉️</span>
          <span class="sh-footer-info-text"><a href="mailto:hello@shapehausewellness.com">hello@shapehausewellness.com</a></span>
        </div>
      </div>
    </div>

    <!-- Links col -->
    <div class="sh-footer-links-col">
      <p class="sh-footer-col-title">Quick Links</p>
      <div class="sh-footer-links">
        <a href="/about">About</a>
        <a href="/pricing">Pricing</a>
        <a href="/careers">Careers</a>
        <a href="/blog">Blog</a>
        <a href="/contact">Contact</a>
        <a href="https://app.deanscheduling.com/sage-she-wellness" target="_blank">Book a Class →</a>
      </div>
    </div>

  </div>

  <div class="sh-footer-bottom">
    <p class="sh-footer-copy">© 2026 ShapeHause Wellness. All rights reserved.</p>
    <div class="sh-footer-socials">
      <a href="https://www.instagram.com/shapehause.wellness/" target="_blank">Instagram</a>
      <a href="https://www.tiktok.com/@Sageandshe.wellness" target="_blank">TikTok</a>
    </div>
  </div>

</footer>
`;

// Replace the existing footer
html = html.replace(
  /<footer[\s\S]*?<\/footer>/,
  footerReplace
);

// Also replace any footer_ div containers
html = html.replace(
  /<div[^>]*class="[^"]*footer[^"]*"[^>]*>[\s\S]*?(?=<\/body>)/,
  footerReplace + '\n'
);

fs.writeFileSync('./public/content.html', html);
console.log('✅ All changes applied!');
