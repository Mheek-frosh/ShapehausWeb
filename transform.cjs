const fs = require('fs');
let html = fs.readFileSync('./public/content.html', 'utf8');

// ─── 1. COMING SOON BANNER ────────────────────────────────────────────────────
html = html.replace(
  /<aside[^>]*aria-label="Important notice"[^>]*>[\s\S]*?<\/aside>/,
  `<aside aria-label="Coming Soon" style="position:fixed;top:0;left:0;right:0;z-index:50;display:flex;align-items:center;justify-content:center;background:#0d0d0d;padding:12px 16px;border-bottom:1px solid #83875a;overflow:hidden;">
    <div style="display:flex;align-items:center;gap:20px;font-family:monospace;text-transform:uppercase;letter-spacing:0.15em;">
      <span style="color:#83875a;font-size:1.1em;font-weight:700;">✦ COMING SOON ✦</span>
      <span style="color:#555;font-size:0.85em;">|</span>
      <span style="color:#fffefd;font-size:0.8em;letter-spacing:0.12em;">ShapeHause is currently on an operational break</span>
      <span style="color:#555;font-size:0.85em;">|</span>
      <span style="color:#83875a;font-size:1.1em;font-weight:700;">✦ COMING SOON ✦</span>
    </div>
  </aside>`
);

// ─── 2. SAGE & SHE REMOVAL ───────────────────────────────────────────────────
html = html.replace(/SAGE &amp; SHE/gi, 'ShapeHause Wellness');
html = html.replace(/Sage &amp; She Wellness/gi, 'ShapeHause Wellness');
html = html.replace(/Sage &amp; She/gi, 'ShapeHause');
html = html.replace(/sage&amp;she/gi, 'shapehause');
html = html.replace(/sage-and-she/gi, 'shapehause');
html = html.replace(/sage\.?and\.?she/gi, 'shapehause');
html = html.replace(/<title>SAGE &amp; SHE<\/title>/gi, '<title>ShapeHause Wellness</title>');

// ─── 3. NAIRA → DOLLAR ───────────────────────────────────────────────────────
html = html.replace(/₦/g, '$');
html = html.replace(/NGN/g, 'USD');

// ─── 4. REMOVE YOGA REFERENCES ───────────────────────────────────────────────
// Remove yoga interest button in newsletter form
html = html.replace(/<button[^>]*class="form_interestButton__jfMer form_interestButtonActive__4FmtH"[^>]*>[\s\S]*?<\/button>/g, '');

// Remove yoga from "women-only Yoga & Pilates studio" descriptions
html = html.replace(/women-only Yoga &amp; Pilates studio/gi, 'women-only Pilates studio');
html = html.replace(/Yoga &amp; Pilates/gi, 'Pilates');
html = html.replace(/yoga and pilates/gi, 'Pilates');
html = html.replace(/yoga, the precision of Pilates,/gi, 'the precision of Pilates,');
html = html.replace(/Through the flow of yoga, /gi, 'Through ');
html = html.replace(/Yoga Classes ,/gi, '');
html = html.replace(/Yoga Classes,/gi, '');
html = html.replace(/Yoga for Anxiety,/gi, '');
html = html.replace(/Reformer Pilates, Chair Pilates, Yoga,/gi, 'Reformer Pilates, Chair Pilates,');
html = html.replace(/Reformer Pilates, Chair Pilates, Yoga/gi, 'Reformer Pilates, Chair Pilates');
html = html.replace(/Pilates, and Yoga/gi, 'Pilates');

// Remove yoga from the partner link text
html = html.replace(/sage-she-wellness/gi, 'shapehause-wellness');

// ─── 5. REDESIGN OUR CLASSES SECTION ─────────────────────────────────────────
// Extract the existing class container section and replace it entirely
const classesStyles = `
<style>
  .sh-classes-section {
    background: #0d0d0d;
    padding: 80px 0;
    overflow: hidden;
  }
  .sh-classes-header {
    padding: 0 72px 48px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  @media (max-width: 799px) {
    .sh-classes-header { padding: 0 24px 40px; flex-direction: column; align-items: flex-start; gap: 16px; }
  }
  .sh-classes-label {
    color: #83875a;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.384px;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .sh-classes-title {
    color: #fffefd;
    font-family: condensed, sans-serif;
    font-size: clamp(48px, 6vw, 80px);
    font-weight: 700;
    letter-spacing: -2.4px;
    line-height: 85%;
    text-transform: uppercase;
  }
  .sh-classes-desc {
    color: #aaa;
    font-size: 16px;
    line-height: 150%;
    max-width: 320px;
    text-align: right;
  }
  @media (max-width: 799px) { .sh-classes-desc { text-align: left; } }

  /* Marquee */
  .sh-marquee-wrapper {
    position: relative;
  }
  .sh-marquee-track {
    display: flex;
    gap: 24px;
    width: max-content;
    animation: sh-scroll 28s linear infinite;
    padding: 12px 0;
  }
  .sh-marquee-track:hover {
    animation-play-state: paused;
  }
  @keyframes sh-scroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .sh-class-card {
    background: #131313;
    border: 1px solid rgba(131,135,90,0.4);
    border-radius: 20px;
    padding: 48px 56px;
    min-width: 300px;
    flex-shrink: 0;
    position: relative;
    transition: border-color 0.3s ease, transform 0.3s ease;
    cursor: default;
  }
  .sh-class-card:hover {
    border-color: #83875a;
    transform: translateY(-4px);
  }
  .sh-card-category {
    color: #83875a;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    margin-bottom: 16px;
  }
  .sh-card-title {
    color: #fffefd;
    font-family: condensed, sans-serif;
    font-size: clamp(28px, 3vw, 40px);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: -0.5px;
    line-height: 90%;
    margin-bottom: 20px;
  }
  .sh-card-arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid rgba(131,135,90,0.5);
    color: #83875a;
    font-size: 16px;
    transition: background 0.3s ease, color 0.3s ease;
  }
  .sh-class-card:hover .sh-card-arrow {
    background: #83875a;
    color: #fff;
  }

  /* Fade edges */
  .sh-marquee-wrapper::before,
  .sh-marquee-wrapper::after {
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    width: 80px;
    z-index: 2;
    pointer-events: none;
  }
  .sh-marquee-wrapper::before {
    left: 0;
    background: linear-gradient(to right, #0d0d0d, transparent);
  }
  .sh-marquee-wrapper::after {
    right: 0;
    background: linear-gradient(to left, #0d0d0d, transparent);
  }
</style>
`;

const classesHTML = `
<div class="sh-classes-section">
  ${classesStyles}
  <div class="sh-classes-header">
    <div>
      <p class="sh-classes-label">[ Step into the fun zone ]</p>
      <h2 class="sh-classes-title">Our Classes</h2>
    </div>
    <p class="sh-classes-desc">Browse and discover the perfect class for your wellness journey.</p>
  </div>

  <div class="sh-marquee-wrapper">
    <div class="sh-marquee-track">

      <!-- SET 1 -->
      <div class="sh-class-card">
        <p class="sh-card-category">Reformer</p>
        <h3 class="sh-card-title">Reform &amp;<br>Sculpt</h3>
        <span class="sh-card-arrow">→</span>
      </div>
      <div class="sh-class-card">
        <p class="sh-card-category">Mat</p>
        <h3 class="sh-card-title">Mat<br>Pilates</h3>
        <span class="sh-card-arrow">→</span>
      </div>
      <div class="sh-class-card">
        <p class="sh-card-category">Chair</p>
        <h3 class="sh-card-title">Chair<br>Pilates</h3>
        <span class="sh-card-arrow">→</span>
      </div>
      <div class="sh-class-card">
        <p class="sh-card-category">Strength</p>
        <h3 class="sh-card-title">Barre &amp;<br>Tone</h3>
        <span class="sh-card-arrow">→</span>
      </div>
      <div class="sh-class-card">
        <p class="sh-card-category">Recovery</p>
        <h3 class="sh-card-title">Stretch &amp;<br>Restore</h3>
        <span class="sh-card-arrow">→</span>
      </div>
      <div class="sh-class-card">
        <p class="sh-card-category">Mindfulness</p>
        <h3 class="sh-card-title">Breathwork<br>Session</h3>
        <span class="sh-card-arrow">→</span>
      </div>

      <!-- SET 2 (duplicate for seamless loop) -->
      <div class="sh-class-card">
        <p class="sh-card-category">Reformer</p>
        <h3 class="sh-card-title">Reform &amp;<br>Sculpt</h3>
        <span class="sh-card-arrow">→</span>
      </div>
      <div class="sh-class-card">
        <p class="sh-card-category">Mat</p>
        <h3 class="sh-card-title">Mat<br>Pilates</h3>
        <span class="sh-card-arrow">→</span>
      </div>
      <div class="sh-class-card">
        <p class="sh-card-category">Chair</p>
        <h3 class="sh-card-title">Chair<br>Pilates</h3>
        <span class="sh-card-arrow">→</span>
      </div>
      <div class="sh-class-card">
        <p class="sh-card-category">Strength</p>
        <h3 class="sh-card-title">Barre &amp;<br>Tone</h3>
        <span class="sh-card-arrow">→</span>
      </div>
      <div class="sh-class-card">
        <p class="sh-card-category">Recovery</p>
        <h3 class="sh-card-title">Stretch &amp;<br>Restore</h3>
        <span class="sh-card-arrow">→</span>
      </div>
      <div class="sh-class-card">
        <p class="sh-card-category">Mindfulness</p>
        <h3 class="sh-card-title">Breathwork<br>Session</h3>
        <span class="sh-card-arrow">→</span>
      </div>

    </div>
  </div>
</div>
`;

// Replace the entire ourClasses section
html = html.replace(
  /<div class="ourClasses_container__HKZmN">[\s\S]*?<\/div>\s*(?=<div class="classpack_)/,
  classesHTML + '\n'
);

// ─── WRITE OUTPUT ─────────────────────────────────────────────────────────────
fs.writeFileSync('./public/content.html', html);
console.log('✅ All transformations applied successfully!');
