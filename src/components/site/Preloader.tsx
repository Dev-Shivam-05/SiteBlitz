/** First-visit preloader (spec v4 row 3): a 0 → 100 count and a volt bar, then the sheet lifts. It is pure CSS
 *  (globals.css, "preloader"), so it lifts itself at 1.2 s even if JavaScript never runs, and the page underneath is
 *  already painted and loading the whole time: it hides nothing that is not ready.
 *
 *  The inline script runs while the HTML is parsed, before first paint: on any page after the first of a browser
 *  session it marks <html data-seen>, which hides the sheet with CSS. On the first page it marks it at 1.25 s, so a
 *  client-side navigation (which re-mounts this element) never replays it. The first page also carries data-first
 *  until 3 s, which delays CSS page-hero entrances until the sheet has lifted (removed after they have finished, so
 *  the delay change can never make a running entrance jump). */
const SEEN_SCRIPT = `try{var d=document.documentElement,s=window.sessionStorage;if(s.getItem("sb_seen")){d.setAttribute("data-seen","")}else{s.setItem("sb_seen","1");d.setAttribute("data-first","");setTimeout(function(){d.setAttribute("data-seen","")},1250);setTimeout(function(){d.removeAttribute("data-first")},3000)}}catch(e){}`;

export function Preloader() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: SEEN_SCRIPT }} />
      <div className="preloader" aria-hidden>
        <div className="mx-auto flex h-full max-w-[1440px] flex-col justify-between px-4 pb-8 pt-7 md:px-8 md:pb-12">
          <p className="display text-[1.15rem]">
            Site<span className="text-volt">Blitz</span>
          </p>
          <div>
            <p className="display preloader-count text-[22vw] leading-[0.8] md:text-[13vw]" />
            <div className="mt-6 h-[3px] w-full bg-line">
              <div className="preloader-bar h-full w-full bg-volt" />
            </div>
            <p className="kicker mt-4 flex justify-between text-muted">
              <span>Websites people remember</span>
              <span className="hidden sm:inline">Gujarat · India</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
