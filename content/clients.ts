export type Client = {
  name: string;
  logo: string; // /logos/<slug>.svg|png
  /** Per-logo sizing so tall/square marks aren't dwarfed by wide wordmarks. */
  imgClass?: string;
};

/**
 * Banks & financial institutions Avenza has worked with (client-supplied logos).
 * Assets live in /public/logos. EastWest is a PNG the client provides
 * (/public/logos/eastwest.png); until it's present the card shows the name.
 */
const WIDE = 'max-h-12 w-auto max-w-[85%]'; // wide wordmark logos
const TALL = 'max-h-[80px] w-auto max-w-[85%]'; // tall / square logos
const TALL2 = 'max-h-[100px] w-auto max-w-[85%]'; // tall / square logos (e.g., Rabobank)
const FULL = 'max-h-[80px] w-auto max-w-full'; // full-width logos (e.g., BDO Unibank)

export const clients: Client[] = [
  { name: 'EastWest', logo: '/logos/eastwest.png', imgClass: TALL2 },
  { name: 'BDO Unibank', logo: '/logos/bdo.svg', imgClass: WIDE },
  { name: 'Rabobank', logo: '/logos/rabobank.svg', imgClass: TALL },
  { name: 'Al Baraka', logo: '/logos/al-baraka.svg', imgClass: WIDE },
  { name: 'HDB Financial Services', logo: '/logos/hdb.jpg', imgClass: FULL },
  { name: 'Cognizant', logo: '/logos/cognizant.svg', imgClass: WIDE },
];
