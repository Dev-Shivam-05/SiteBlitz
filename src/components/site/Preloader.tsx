/** First-visit entrance line. Until 2026-11-11 this was a full-screen preloader (a 0 -> 100 count and a volt bar on a
 *  void sheet that lifted at 1.2 s). The performance audit measured it hiding already-painted content for up to
 *  0.9 s after first paint, and its animated counter forced a style and layout pass on every frame
 *  (docs/debate/2026-11-11-perf-seo-harsh-audit, fix Q3). What is left is the brand motif: one volt line sweeps
 *  across the top edge once and fades (globals.css, "entrance line"). It covers nothing and takes no input.
 *
 *  The inline script runs while the HTML is parsed: on any page after the first of a browser session it marks
 *  <html data-seen>, which hides the line with CSS. On the first page it marks it after the sweep, so a client-side
 *  navigation (which re-mounts this element) never replays it. */
const SEEN_SCRIPT = `try{var d=document.documentElement,s=window.sessionStorage;if(s.getItem("sb_seen")){d.setAttribute("data-seen","")}else{s.setItem("sb_seen","1");setTimeout(function(){d.setAttribute("data-seen","")},1200)}}catch(e){}`;

export function Preloader() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: SEEN_SCRIPT }} />
      <div className="preloader" aria-hidden />
    </>
  );
}
