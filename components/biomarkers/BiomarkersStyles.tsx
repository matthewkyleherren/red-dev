/**
 * Embedded CSS styles from the Webflow biomarkers page.
 * These augment the base Webflow stylesheet with page-specific styles.
 */
export default function BiomarkersStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
/* ── Config panel colors ── */
.config_color-orange{background:#FC5F2B}.config_color-cyan{background:#00bcd4}.config_color-purple{background:#9c27b0}.config_color-green{background:#2e9e5a}.config_color-red{background:#e53935}.config_color-lavender{background:#7e57c2}.config_color-pink{background:#e84e7a}.config_color-teal{background:#009688}.config_color-amber{background:#f4a100}.config_color-gray{background:#d4d4d4}.config_color-multi{background:linear-gradient(135deg,#FC5F2B 0%,#f4a100 50%,#2e9e5a 100%)}

/* ── Biomarker dots ── */
.config_biomarker-dots{display:inline-flex;align-items:center;flex-shrink:0;vertical-align:middle}
.config_biomarker-dot{width:0.6rem;height:0.6rem;border-radius:50%;flex-shrink:0;display:block;border:1.5px solid #fff}
.config_biomarker-dots.is-stacked .config_biomarker-dot+.config_biomarker-dot{margin-left:-.1875rem}

/* ── Accordion variables ── */
:root {
  --accordion-border-color: #e8e8e8;
  --accordion-border-color-active: #FC5F2B;
  --accordion-bg-color: #ffffff;
  --accordion-title-color: #1a1a1a;
  --accordion-text-color: #666666;
  --accordion-icon-bg: #f5f5f5;
  --accordion-icon-color: #999999;
  --accordion-gap: 0.75rem;
  --accordion-padding-x: 1.5rem;
  --accordion-padding-y: 1.75rem;
  --accordion-border-radius: 1rem;
  --accordion-icon-radius: 0.5rem;
  --accordion-title-size: 1.25rem;
  --accordion-text-size: 1rem;
  --accordion-duration: 0.4s;
  --accordion-duration-fast: 0.5s;
  --accordion-easing: cubic-bezier(0.4, 0, 0.2, 1);
}

.accordion__item {
  transition: border-color var(--accordion-duration-fast) var(--accordion-easing);
}

.accordion__icon {
  transition: background-color var(--accordion-duration-fast) var(--accordion-easing);
}

.accordion__icon--active {
  background-color: #f4f4f5;
}

.accordion__header {
  transition: padding-bottom var(--accordion-duration-fast) var(--accordion-easing);
}

.accordion__icon::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1rem !important;
  height: 0.125rem !important;
  background-color: var(--accordion-icon-color);
  transform: translate(-50%, -50%);
  transition: background-color var(--accordion-duration-fast) var(--accordion-easing);
}

.accordion__icon::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0.125rem !important;
  height: 1rem !important;
  background-color: var(--accordion-icon-color);
  transform: translate(-50%, -50%);
  transition:
    transform var(--accordion-duration-fast) var(--accordion-easing),
    opacity var(--accordion-duration-fast) var(--accordion-easing);
}

.accordion__icon--active::after {
  transform: translate(-50%, -50%) rotate(90deg);
  opacity: 0;
}

.accordion__panel {
  transition: max-height var(--accordion-duration) var(--accordion-easing);
}

.accordion__content {
  transition: opacity var(--accordion-duration-fast) var(--accordion-easing);
}

.accordion__content--hidden {
  opacity: 0;
}

.accordion__content--visible {
  opacity: 1;
}

@media(max-width:64rem){
  .accordion__icon{width:2rem!important;height:2rem!important}
  .accordion__icon::before{width:1rem!important;height:0.05rem!important}
  .accordion__icon::after{width:0.05rem!important;height:1rem!important}
}

/* ── BIO CSS — biomarker listing styles ── */
.bio_root,.bio_root *,.bio_root *::before,.bio_root *::after{box-sizing:border-box}

.bio_nav-item{transition:color .22s ease;box-shadow:none!important}
.bio_nav-item.is-active{border:1px solid #FC5F2B!important;box-shadow:none!important;font-weight:400!important}

.bio_nav{max-height:18.5rem;overflow-y:auto;overflow-x:hidden;scrollbar-width:thin;scrollbar-color:transparent transparent;scrollbar-gutter:stable;-webkit-mask-image:linear-gradient(to bottom,#000 0%,#000 85%,transparent 100%);mask-image:linear-gradient(to bottom,#000 0%,#000 85%,transparent 100%)}
.bio_nav.is-scrolled{-webkit-mask-image:linear-gradient(to bottom,transparent 0%,#000 8%,#000 85%,transparent 100%);mask-image:linear-gradient(to bottom,transparent 0%,#000 8%,#000 85%,transparent 100%)}
.bio_nav::-webkit-scrollbar{width:0;background:transparent}
.bio_nav:hover{scrollbar-width:thin;scrollbar-color:#e4e4e7 transparent}
.bio_nav:hover::-webkit-scrollbar{width:5px}
.bio_nav:hover::-webkit-scrollbar-track{background:transparent}
.bio_nav:hover::-webkit-scrollbar-thumb{background:#e4e4e7;border-radius:3px}

.section_wwt-biomarkers .container-large{z-index:99}

.bio_legend-list.has-active .bio_legend-item:not(.is-active){opacity:.5}
.bio_legend-item:hover .bio_legend-dot{transform:scale(1.3)}

.bio_content.is-panel-filter .bio_category{margin-bottom:0;padding-bottom:0}
.bio_content.is-panel-filter .bio_category.is-hidden{display:none}

.bio_search.has-query .bio_search-clear{display:flex}
.bio_search-count{overflow:hidden;max-height:0;opacity:0;transform:translateY(-.375rem);transition:max-height .25s ease,opacity .2s ease,transform .2s ease}
.bio_search-count.is-show{max-height:2rem;opacity:1;transform:translateY(0)}

.bio_item.is-hidden{display:none!important}
.bio_item:not(.is-hidden){transition:opacity .28s ease .05s,transform .28s ease .05s}
.bio_item.is-open{overflow:hidden}
.bio_item.is-stagger{opacity:0;transform:translateY(.5rem)}

.bio_item-dot{width:0.65rem!important;height:0.65rem!important;min-width:0.65rem;min-height:0.65rem;border-radius:50%;display:inline-block;flex-shrink:0;border:1.5px solid #fff}
.bio_item-dots{display:inline-flex;align-items:center;flex-shrink:0;vertical-align:middle;min-height:0.5rem}
.bio_item-dots.is-stacked .bio_item-dot+.bio_item-dot{margin-left:-.1875rem}
.bio_item .config_biomarker-dots.is-stacked .bio_item-dot+.bio_item-dot{margin-left:-.1875rem}

.bio_item:hover .bio_item-toggle{background:#ebebeb}
.bio_item-toggle .bio_item-toggle-chevron{display:block;transition:transform .3s ease}
.bio_item.is-open .bio_item-toggle .bio_item-toggle-chevron{transform:rotate(180deg)}

.bio_item-accordion{overflow:hidden;transition:max-height 0.4s cubic-bezier(.4,0,.2,1),padding 0.3s cubic-bezier(.4,0,.2,1)}

.bio_item-accordion-inner{display:flex;flex-direction:column;gap:0.5rem;transition:opacity 0.5s cubic-bezier(.4,0,.2,1)}
.bio_item-accordion-inner.acc-hidden{opacity:0}
.bio_item-accordion-inner.acc-visible{opacity:1}

.bio_highlight{background:#FFECD6;color:inherit;padding:0 .125rem;border-radius:2px}

.bio_empty{display:none;text-align:center;padding:3rem 1rem}
.bio_empty.is-show{display:block}

@media(max-width:64rem){
  .bio_layout{flex-direction:column;gap:0}
  .bio_sidebar{z-index:100;width:calc(100% + 5rem);margin-left:-2.5rem;margin-right:-2.5rem;padding:2rem 0 .625rem 2.5rem;background:#fff!important;border-bottom:1px solid #f0f0f0;margin-bottom:.75rem}
  .bio_legend{padding-top:.625rem;border-top:none;margin-bottom:.75rem}
  .bio_nav{flex-direction:row;overflow-x:auto;overflow-y:visible;gap:.375rem;margin-bottom:0;max-height:none;scrollbar-width:none;scroll-behavior:smooth;padding:.25rem 0;-webkit-mask-image:linear-gradient(to right,#000 0%,#000 80%,transparent 100%);mask-image:linear-gradient(to right,#000 0%,#000 80%,transparent 100%)}
  .bio_nav.is-scrolled{-webkit-mask-image:linear-gradient(to right,transparent 0%,#000 8%,#000 80%,transparent 100%);mask-image:linear-gradient(to right,transparent 0%,#000 8%,#000 80%,transparent 100%)}
  .bio_nav::after{content:'';flex-shrink:0;width:2.5rem}
  .bio_nav::-webkit-scrollbar{display:none}
  .bio_nav:hover{scrollbar-width:none}
  .bio_nav:hover::-webkit-scrollbar{width:0}
  .bio_nav-item{padding:.375rem .875rem;font-size:0.875rem}
}
@media(max-width:767px){
  .bio_sidebar{width:calc(100% + 2.5rem);margin-left:-1.25rem;margin-right:-1.25rem;padding-left:1.25rem}
  .bio_nav::after{width:1.25rem}
}
@media(max-width:30rem){.bio_heading{font-size:1.375rem}}

/* ── Config root ── */
.config_root,.config_root *,.config_root *::before,.config_root *::after{box-sizing:border-box}
.config_section-header:not(:first-child){margin-top:3.5rem}
.config_baseline-img img{max-width:100%;max-height:100%;object-fit:contain}
.config_card-image img{width:100%;height:100%;object-fit:contain}
.config_card-price{margin-left:auto}
.config_summary-thumb img{max-width:100%;max-height:100%;object-fit:contain}

/* ── Config stickybar ── */
.config_stickybar{position:sticky;top:0;z-index:200}
.config_stickybar.is-expanded .config_stickybar-title{font-size:1.25rem}

/* ── Config responsive ── */
@media(max-width:64rem){
  .config_layout{flex-direction:column;width:100%;max-width:100%}
  .config_baseline{overflow:hidden}
  .config_main{width:100%;max-width:100%;overflow:visible}
  .config_sidebar{display:none!important}
  .config_grid{display:flex!important;grid-template-columns:none!important;flex-wrap:nowrap!important;overflow-x:auto!important;overflow-y:hidden!important;scroll-snap-type:x mandatory;scroll-behavior:smooth;-webkit-overflow-scrolling:touch;gap:.75rem;padding-bottom:.5rem;scrollbar-width:none;-ms-overflow-style:none;margin-right:-2.5rem;padding-right:2.5rem}
  .config_grid::-webkit-scrollbar{display:none}
  .config_grid>.config_card{scroll-snap-align:start;flex-shrink:0!important}
  .config_stickybar-chevron{display:block}
  .config_stickybar-cta{display:none}
  .config_stickybar-drawer{display:block;width:100%}
  .config_stickybar-inner{flex-direction:column;gap:0;align-items:stretch}
  .config_stickybar-top-row{display:flex;align-items:center;gap:.5rem;width:100%}
  .config_stickybar-info{width:100%;overflow:hidden;min-width:0}
  .config_stickybar-drawer-inner{width:100%}
  .config_stickybar-row{width:100%;padding:1.15rem 1.5rem 1.15rem .75rem}
  .config_stickybar-total{width:100%}
  .config_modal{max-width:100vw!important}
}
@media(max-width:767px){.config_grid{margin-right:-1.25rem;padding-right:1.25rem}}
@media(max-width:48rem){.config_heading{font-size:1.875rem}.config_modal-body{padding:0 1.5rem .75rem}.config_modal-footer{padding:1rem 1.5rem 1.75rem}}
`,
      }}
    />
  );
}
