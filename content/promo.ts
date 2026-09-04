/**
 * Top promo bar + "I'm Interested" registration modal (TRF APAC 2026).
 * Single source of truth — edit copy/links here. Set `enabled: false` to hide.
 */
export const promo = {
  enabled: true,
  storageKey: 'avz-promo-trf-apac-2026', // dismissal is remembered per visitor under this key
  tag: 'TRF’26 APAC',
  message: 'We’re excited to be a Silver Sponsor at the Temenos Regional Forum APAC 2026',
  cta: 'I’m Interested',

  modal: {
    heading: 'We’re a Silver Sponsor at Temenos Regional Forum APAC 2026',
    body:
      'Our COO, Gopinath Chandran, will be one of the speakers at the Temenos Regional Forum APAC 2026 in Hanoi. If a SaaS route for your core is on the table this year, those 20 minutes are the best place to ignite the thinking.',
    // Optional event / registration link (leave '' to hide the link).
    eventLabel: 'Temenos Regional Forum APAC 2026 · Hanoi',
    eventUrl: '', // [ADD the official event / registration URL]

    speaker: {
      name: 'Gopinath Chandran',
      role: 'Chief Operating Officer',
      photo: '/promo/speaker.webp', // supplied headshot (see /public/promo/README)
      caption: 'Join us to hear our COO speak on timely SaaS transformation.',
    },
  },
} as const;
