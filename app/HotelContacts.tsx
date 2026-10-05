type Hotel = { name: string; area: string; phone?: string; tel?: string };

/** Add a number as `phone: "08012345678", tel: "+2348012345678"` to show a tap-to-call link. */
const HOTELS: Hotel[] = [
  { name: "Watercress Hotels & Events", area: "Allen, Ikeja", phone: "09060003710", tel: "+2349060003710" },
  { name: "Cozy Residenze Apart'hotel Ikeja", area: "Ikeja", phone: "07049228884", tel: "+2347049228884" },
  { name: "Best Western Plus Ambience Hotel Ikeja", area: "Allen Avenue, Ikeja", phone: "09160006350", tel: "+2349160006350" },
  { name: "Apartment Royale Hotel & Suite", area: "Allen, Ikeja", phone: "08100088800", tel: "+2348100088800" },
  { name: "Joshesther Olive Hotels", area: "Opebi, Ikeja", phone: "09060004674", tel: "+2349060004674" },
];

const HAS_PHONES = HOTELS.some((hotel) => hotel.phone && hotel.tel);

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export default function HotelContacts() {
  return (
    <div className="w-full rounded-2xl border border-[#E3EAF3] bg-[#F8FBFF] px-6 py-8 shadow-sm md:px-10 md:py-10">
      <p className="text-center font-serif text-xl font-medium text-foreground md:text-2xl">
        Nearby Hotels
      </p>
      <p className="mt-1 text-center text-sm font-light text-text-muted md:text-base">
        For accommodation enquiries
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-[#E3EAF3] bg-white/70">
        {HOTELS.length === 0 ? (
          <p className="px-5 py-6 text-center text-base font-light italic text-text-muted md:px-6 md:text-lg">
            Hotel details coming soon.
          </p>
        ) : (
          <div className="grid grid-cols-[1fr_auto] gap-x-6 border-b border-[#E3EAF3] bg-[#F8FBFF] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-foreground md:px-6 md:text-sm">
            <span>Hotel name</span>
            {HAS_PHONES ? <span>Number</span> : null}
          </div>
        )}
        <ul className="divide-y divide-[#E3EAF3]">
          {HOTELS.map((hotel) => (
            <li
              key={hotel.name}
              className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 px-5 py-4 md:px-6 md:py-4"
            >
              <span className="min-w-0">
                <span className="block text-base font-medium leading-snug text-foreground md:text-lg">
                  {hotel.name}
                </span>
                <span className="mt-0.5 inline-flex items-center gap-1.5 text-sm font-light text-text-muted md:text-base">
                  <MapPinIcon className="h-3.5 w-3.5 shrink-0" />
                  {hotel.area}
                </span>
              </span>
              {hotel.phone && hotel.tel ? (
                <a
                  href={`tel:${hotel.tel}`}
                  className="inline-flex items-center gap-2 whitespace-nowrap text-base font-light text-text-muted transition-colors hover:text-foreground md:text-lg"
                >
                  <PhoneIcon className="h-4 w-4 shrink-0" />
                  {hotel.phone}
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
